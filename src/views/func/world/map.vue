<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'

import CountryCard from './country.vue'
import * as xlsx from '@/commons/utils/xlsx'
import {
    buildCountryRegionMap,
    buildRegionIndex,
    createPlaceholderCountry,
    type CountryData,
    type MapMarker,
} from './map-utils'

defineOptions({ name: 'world-map' })

const SVG_VIEWBOX = { width: 2000, height: 857 }
const MIN_SCALE = 0.35
const MAX_SCALE = 50
const ZOOM_STEP = 0.15

const viewportRef = ref<HTMLElement | null>(null)
const svgHostRef = ref<HTMLElement | null>(null)
const viewportSize = ref({ width: 0, height: 0 })

const svgHtml = ref('')
const countries = ref<CountryData[]>([])
const markers = shallowRef<MapMarker[]>([])
const countryByRegion = shallowRef(new Map<string, CountryData>())
const regionByCountry = shallowRef(new Map<string, string>())
const allCountryByRegion = shallowRef(new Map<string, CountryData>())
const regionLabels = shallowRef(new Map<string, string>())

const showSearchPanel = ref(false)
const showFlagLabels = ref(false)
const magnifierEnabled = ref(false)
const magnifierVisible = ref(false)
const renderedLabelCount = ref(0)

const LABEL_BATCH_SIZE = 24
const MAGNIFIER_SIZE = 180
const MAGNIFIER_ZOOM_FACTOR = 2.8
const MARKER_DOT_R_MAG = 5.5
const MARKER_HIT_R_MAG = 11
const RIGHT_CLICK_PICK_MIN_RADIUS = 22

/** 地图缩放阶梯：倍率越大，圆点/描边越细，避免高倍 zoom 时盖住小区域 */
const MARKER_SIZE_TIERS = [
    {
        maxScale: 1.25,
        dotR: 1.8, hitR: 5, labelSize: 9, flagW: 14, flagH: 10,
        markerStroke: 0.8, markerStrokeActive: 1.2, markerStrokeEmphasis: 1.6,
        pathStrokeHover: 1.4, pathStrokeSelected: 2.2, pathStrokeFocused: 3,
        focusRingStroke: 1.2, focusCoreStroke: 1,
    },
    {
        maxScale: 2,
        dotR: 1.45, hitR: 4.5, labelSize: 8.5, flagW: 13, flagH: 9,
        markerStroke: 0.65, markerStrokeActive: 1, markerStrokeEmphasis: 1.3,
        pathStrokeHover: 1.15, pathStrokeSelected: 1.8, pathStrokeFocused: 2.4,
        focusRingStroke: 1, focusCoreStroke: 0.85,
    },
    {
        maxScale: 3.5,
        dotR: 1.15, hitR: 4, labelSize: 8, flagW: 12, flagH: 8.5,
        markerStroke: 0.5, markerStrokeActive: 0.85, markerStrokeEmphasis: 1.1,
        pathStrokeHover: 0.95, pathStrokeSelected: 1.5, pathStrokeFocused: 2,
        focusRingStroke: 0.85, focusCoreStroke: 0.7,
    },
    {
        maxScale: 5,
        dotR: 0.9, hitR: 3.5, labelSize: 7.5, flagW: 11, flagH: 8,
        markerStroke: 0.4, markerStrokeActive: 0.7, markerStrokeEmphasis: 0.95,
        pathStrokeHover: 0.75, pathStrokeSelected: 1.2, pathStrokeFocused: 1.6,
        focusRingStroke: 0.7, focusCoreStroke: 0.6,
    },
    {
        maxScale: 7,
        dotR: 0.7, hitR: 3, labelSize: 7, flagW: 10, flagH: 7.5,
        markerStroke: 0.32, markerStrokeActive: 0.55, markerStrokeEmphasis: 0.75,
        pathStrokeHover: 0.6, pathStrokeSelected: 0.95, pathStrokeFocused: 1.3,
        focusRingStroke: 0.55, focusCoreStroke: 0.5,
    },
    {
        maxScale: Infinity,
        dotR: 0.55, hitR: 2.5, labelSize: 6.5, flagW: 9, flagH: 7,
        markerStroke: 0.25, markerStrokeActive: 0.45, markerStrokeEmphasis: 0.6,
        pathStrokeHover: 0.5, pathStrokeSelected: 0.75, pathStrokeFocused: 1,
        focusRingStroke: 0.45, focusCoreStroke: 0.4,
    },
]

const getMarkerSizeTier = (currentScale: number) =>
    MARKER_SIZE_TIERS.find(tier => currentScale <= tier.maxScale)
    ?? MARKER_SIZE_TIERS[MARKER_SIZE_TIERS.length - 1]
let labelRenderTimer: ReturnType<typeof setTimeout> | null = null
const searchQuery = ref('')
const svgSearchQuery = ref('')
const svgSearchError = ref('')
const selectedContinent = ref('')
const selectedPartition = ref('')
const sortField = ref<keyof CountryData>('no')
const sortOrder = ref<'asc' | 'desc'>('asc')
const focusedCountryCode = ref<string | null>(null)
const focusedRegionKey = ref<string | null>(null)
const skipFocusCard = ref(false)
const enableStageTransition = ref(false)

const FOCUS_SEARCH_SCALE = 10

const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const hoveredRegion = ref<string | null>(null)
const hoveredMarkerKey = ref<string | null>(null)
const selectedRegionKey = ref<string | null>(null)
const tooltipPos = ref({ x: 0, y: 0 })
const magnifierPos = ref({ x: 0, y: 0 })

const RIGHT_CLICK_FLASH_MS = 3000
const pickFlash = ref<{ x: number; y: number; label: string } | null>(null)
let pickFlashTimer: ReturnType<typeof setTimeout> | null = null

const isSpaceDown = ref(false)
const isPanning = ref(false)
const panStart = ref({ x: 0, y: 0, tx: 0, ty: 0 })

const scalePercent = computed(() => `${Math.round(scale.value * 100)}%`)

const markerSizeTier = computed(() => getMarkerSizeTier(scale.value))
const hoveredCountry = computed(() => {
    if (showFlagLabels.value || magnifierEnabled.value || selectedRegionKey.value) return null
    if (skipFocusCard.value && focusedRegionKey.value) return null
    const regionKey = focusedRegionKey.value || hoveredRegion.value
    if (!regionKey) return null
    return allCountryByRegion.value.get(regionKey) || null
})

const selectedCountry = computed(() => {
    if (!selectedRegionKey.value) return null
    return allCountryByRegion.value.get(selectedRegionKey.value) || null
})

const focusedMarker = computed(() => {
    if (!focusedRegionKey.value) return null
    return markers.value.find(marker => marker.regionKey === focusedRegionKey.value) || null
})

const focusedRegionLabel = computed(() => {
    if (!focusedRegionKey.value) return ''
    return regionLabels.value.get(focusedRegionKey.value) || focusedRegionKey.value
})

const labelMarkers = computed(() => markers.value.filter(marker => marker.hasData))

const visibleLabelMarkers = computed(() =>
    labelMarkers.value.slice(0, renderedLabelCount.value),
)

const visibleLabelKeySet = computed(() =>
    new Set(visibleLabelMarkers.value.map(marker => marker.regionKey)),
)

const getMarkerLayerOrder = (regionKey: string) => {
    if (hoveredRegion.value === regionKey) return 3
    if (selectedRegionKey.value === regionKey) return 2
    if (focusedRegionKey.value === regionKey) return 1
    return 0
}

const sortedMarkers = computed(() =>
    [...markers.value].sort((a, b) => {
        const orderDiff = getMarkerLayerOrder(a.regionKey) - getMarkerLayerOrder(b.regionKey)
        if (orderDiff !== 0) return orderDiff
        return (a.country.no || 9999) - (b.country.no || 9999)
    }),
)

const magnifierVisibleMarkers = computed(() => {
    if (!magnifierVisible.value) return []

    const lensRadius = MAGNIFIER_SIZE / 2
    const stageX = (magnifierPos.value.x - translateX.value) / scale.value
    const stageY = (magnifierPos.value.y - translateY.value) / scale.value
    const svgRadius = (lensRadius / magnifierScale.value) * 1.35

    return sortedMarkers.value.filter(marker => {
        const dx = marker.x - stageX
        const dy = marker.y - stageY
        return dx * dx + dy * dy <= svgRadius * svgRadius
    })
})

const markerLabel = (marker: MapMarker) =>
    marker.hasData ? marker.country.code : marker.regionKey

const isMarkerInteractive = () => !showFlagLabels.value || magnifierEnabled.value

const stageStyle = computed(() => {
    const tier = markerSizeTier.value
    return {
        transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
        '--marker-stroke': tier.markerStroke,
        '--marker-stroke-active': tier.markerStrokeActive,
        '--marker-stroke-emphasis': tier.markerStrokeEmphasis,
        '--path-stroke-hover': tier.pathStrokeHover,
        '--path-stroke-selected': tier.pathStrokeSelected,
        '--path-stroke-focused': tier.pathStrokeFocused,
        '--focus-ring-stroke': tier.focusRingStroke,
        '--focus-core-stroke': tier.focusCoreStroke,
    }
})

const tooltipStyle = computed(() => ({
    left: `${tooltipPos.value.x}px`,
    top: `${tooltipPos.value.y}px`,
}))

const viewportCursor = computed(() => {
    if (isPanning.value) return 'grabbing'
    if (isSpaceDown.value) return 'grab'
    if (hoveredMarkerKey.value) return 'pointer'
    if (magnifierEnabled.value) return 'crosshair'
    return 'default'
})

const magnifierScale = computed(() => scale.value * MAGNIFIER_ZOOM_FACTOR)

const magnifierLensStyle = computed(() => ({
    width: `${MAGNIFIER_SIZE}px`,
    height: `${MAGNIFIER_SIZE}px`,
    left: `${magnifierPos.value.x - MAGNIFIER_SIZE / 2}px`,
    top: `${magnifierPos.value.y - MAGNIFIER_SIZE / 2}px`,
}))

const magnifierStageStyle = computed(() => {
    const lensRadius = MAGNIFIER_SIZE / 2
    const stageX = (magnifierPos.value.x - translateX.value) / scale.value
    const stageY = (magnifierPos.value.y - translateY.value) / scale.value
    const magScale = magnifierScale.value
    const tier = markerSizeTier.value

    return {
        width: `${viewportSize.value.width}px`,
        height: `${viewportSize.value.height}px`,
        transform: `translate(${lensRadius - stageX * magScale}px, ${lensRadius - stageY * magScale}px) scale(${magScale})`,
        '--marker-stroke': tier.markerStroke,
        '--marker-stroke-active': tier.markerStrokeActive,
        '--marker-stroke-emphasis': tier.markerStrokeEmphasis,
    }
})

const availableContinents = computed(() =>
    Array.from(new Set(countries.value.map(c => c.continent))),
)

const availablePartitions = computed(() => {
    let list = countries.value
    if (selectedContinent.value) {
        list = list.filter(c => c.continent === selectedContinent.value)
    }
    return Array.from(new Set(list.map(c => c.partition)))
})

const svgRegionKeys = computed(() =>
    Array.from(regionLabels.value.keys()).sort((a, b) => a.localeCompare(b, 'en')),
)

const filteredCountries = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()

    const result = countries.value.filter(country => {
        const matchSearch = !query ||
            country.name.toLowerCase().includes(query) ||
            country.enName.toLowerCase().includes(query) ||
            country.fullName.toLowerCase().includes(query) ||
            country.code.toLowerCase().includes(query)
        const matchContinent = !selectedContinent.value || country.continent === selectedContinent.value
        const matchPartition = !selectedPartition.value || country.partition === selectedPartition.value
        return matchSearch && matchContinent && matchPartition
    })

    return result.sort((a, b) => {
        let valA = a[sortField.value]
        let valB = b[sortField.value]
        if (valA == null) valA = ''
        if (valB == null) valB = ''

        const comparison = typeof valA === 'number' && typeof valB === 'number'
            ? valA - valB
            : String(valA).localeCompare(String(valB), 'zh-CN')

        return sortOrder.value === 'asc' ? comparison : -comparison
    })
})

const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const toggleSearchPanel = () => {
    showSearchPanel.value = !showSearchPanel.value
}

const clearLabelRender = () => {
    if (labelRenderTimer != null) {
        clearTimeout(labelRenderTimer)
        labelRenderTimer = null
    }
    renderedLabelCount.value = 0
}

const startLabelRender = () => {
    clearLabelRender()
    const total = labelMarkers.value.length
    if (!total) return

    const renderBatch = () => {
        renderedLabelCount.value = Math.min(
            renderedLabelCount.value + LABEL_BATCH_SIZE,
            total,
        )
        if (renderedLabelCount.value < total) {
            labelRenderTimer = setTimeout(renderBatch, 16)
        }
    }

    renderBatch()
}

const toggleFlagLabels = () => {
    showFlagLabels.value = !showFlagLabels.value

    if (showFlagLabels.value) {
        clearHideHover()
        hoveredRegion.value = null
        startLabelRender()
        return
    }

    clearLabelRender()
}

const toggleMagnifier = () => {
    magnifierEnabled.value = !magnifierEnabled.value
    if (!magnifierEnabled.value) {
        magnifierVisible.value = false
        return
    }
    updateViewportSize()
}

let regionPathMap = new Map<string, SVGPathElement[]>()
let hideHoverTimer: ReturnType<typeof setTimeout> | null = null

const clearHideHover = () => {
    if (hideHoverTimer) {
        clearTimeout(hideHoverTimer)
        hideHoverTimer = null
    }
}

const showRegion = (regionKey: string) => {
    // 日志，不可删除
    console.log(regionKey)
    if (showFlagLabels.value) return
    clearHideHover()
    setHoveredRegion(regionKey)
}

const scheduleHideRegion = () => {
    clearHideHover()
    hideHoverTimer = setTimeout(() => {
        if (focusedRegionKey.value || selectedRegionKey.value) {
            hoveredRegion.value = null
            applyRegionStyles()
            return
        }
        setHoveredRegion(null)
    }, 120)
}

const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))

interface MeetTransform {
    width: number
    height: number
    meetScale: number
    offsetX: number
    offsetY: number
}

const getMeetTransform = (): MeetTransform | null => {
    const viewport = viewportRef.value
    if (!viewport) return null

    const width = viewport.clientWidth
    const height = viewport.clientHeight
    const meetScale = Math.min(
        width / SVG_VIEWBOX.width,
        height / SVG_VIEWBOX.height,
    )

    return {
        width,
        height,
        meetScale,
        offsetX: (width - SVG_VIEWBOX.width * meetScale) / 2,
        offsetY: (height - SVG_VIEWBOX.height * meetScale) / 2,
    }
}

const svgPointToContainer = (svgX: number, svgY: number, meet: MeetTransform) => ({
    x: meet.offsetX + svgX * meet.meetScale,
    y: meet.offsetY + svgY * meet.meetScale,
})

const focusBoundsInViewport = (bounds: ReturnType<typeof computeRegionBounds>) => {
    const meet = getMeetTransform()
    if (!meet) return

    const center = svgPointToContainer(bounds.cx, bounds.cy, meet)
    const targetScale = clampScale(FOCUS_SEARCH_SCALE)

    scale.value = targetScale
    translateX.value = meet.width / 2 - center.x * targetScale
    translateY.value = meet.height / 2 - center.y * targetScale
}

const updateViewportSize = () => {
    const viewport = viewportRef.value
    if (!viewport) return
    viewportSize.value = {
        width: viewport.clientWidth,
        height: viewport.clientHeight,
    }
}

const fitToViewport = () => {
    const viewport = viewportRef.value
    if (!viewport) return

    updateViewportSize()
    scale.value = 1
    translateX.value = 0
    translateY.value = 0
}

const zoomBy = (factor: number) => {
    const viewport = viewportRef.value
    if (!viewport) return

    const rect = viewport.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    applyZoomAt(centerX, centerY, factor)
}

const applyZoomAt = (localX: number, localY: number, nextScale: number) => {
    const prevScale = scale.value
    const clamped = clampScale(nextScale)
    const ratio = clamped / prevScale

    translateX.value = localX - (localX - translateX.value) * ratio
    translateY.value = localY - (localY - translateY.value) * ratio
    scale.value = clamped
}

const resetView = () => {
    focusedCountryCode.value = null
    clearFocusedRegion()
    fitToViewport()
}

const computeRegionBounds = (regionKey: string) => {
    const paths = regionPathMap.get(regionKey) || []
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    paths.forEach(path => {
        const box = path.getBBox()
        minX = Math.min(minX, box.x)
        minY = Math.min(minY, box.y)
        maxX = Math.max(maxX, box.x + box.width)
        maxY = Math.max(maxY, box.y + box.height)
    })

    return {
        minX,
        minY,
        maxX,
        maxY,
        width: Math.max(maxX - minX, 1),
        height: Math.max(maxY - minY, 1),
        cx: (minX + maxX) / 2,
        cy: (minY + maxY) / 2,
    }
}

const getRegionFocusBounds = (regionKey: string) => {
    const bounds = computeRegionBounds(regionKey)
    if (Number.isFinite(bounds.minX)) return bounds

    const marker = markers.value.find(item => item.regionKey === regionKey)
    if (!marker) return null

    const pad = 8
    return {
        minX: marker.x - pad,
        minY: marker.y - pad,
        maxX: marker.x + pad,
        maxY: marker.y + pad,
        width: pad * 2,
        height: pad * 2,
        cx: marker.x,
        cy: marker.y,
    }
}

const applyRegionStyles = () => {
    if (showFlagLabels.value) return

    const hoverKey = hoveredRegion.value
    const focusKey = focusedRegionKey.value
    const selectedKey = selectedRegionKey.value

    regionPathMap.forEach((paths, key) => {
        const isFocused = focusKey === key
        const isSelected = selectedKey === key
        const isHovered = hoverKey === key && !isFocused && !isSelected
        const shouldDim = !!(focusKey || hoverKey || selectedKey) && !isFocused && !isHovered && !isSelected

        paths.forEach(path => {
            path.classList.toggle('is-focused', isFocused)
            path.classList.toggle('is-selected', isSelected)
            path.classList.toggle('is-active', isHovered)
            path.classList.toggle('is-dimmed', shouldDim)
        })
    })
}

const closeSelectedCountry = () => {
    selectedRegionKey.value = null
    if (!focusedRegionKey.value) {
        hoveredRegion.value = null
    }
    applyRegionStyles()
}

const openSelectedCountry = (regionKey: string) => {
    selectedRegionKey.value = regionKey
    hoveredRegion.value = regionKey
    clearHideHover()
    applyRegionStyles()
}

const clearFocusedRegion = () => {
    focusedRegionKey.value = null
    focusedCountryCode.value = null
    skipFocusCard.value = false
    hoveredRegion.value = null
    applyRegionStyles()
}

const setFocusedRegion = (regionKey: string) => {
    focusedRegionKey.value = regionKey
    hoveredRegion.value = regionKey
    applyRegionStyles()
}

const focusOnRegion = (regionKey: string, options?: { showCard?: boolean }) => {
    const viewport = viewportRef.value
    if (!viewport) return

    const bounds = getRegionFocusBounds(regionKey)
    if (!bounds) return

    skipFocusCard.value = options?.showCard === false

    enableStageTransition.value = true
    focusBoundsInViewport(bounds)

    window.setTimeout(() => {
        enableStageTransition.value = false
    }, 380)

    clearHideHover()
    setFocusedRegion(regionKey)

    if (!skipFocusCard.value) {
        const rect = viewport.getBoundingClientRect()
        tooltipPos.value = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2 - 72,
        }
    }
}

const focusOnCountry = (country: CountryData) => {
    const regionKey = regionByCountry.value.get(country.code)
    if (!regionKey) return

    focusedCountryCode.value = country.code
    focusOnRegion(regionKey)
}

const resolveSvgRegionKey = (query: string) => {
    const raw = query.trim()
    if (!raw) return null

    if (regionLabels.value.has(raw)) return raw

    const lower = raw.toLowerCase()
    const matches = svgRegionKeys.value.filter(key => key.toLowerCase() === lower)
    return matches.length === 1 ? matches[0] : null
}

const focusOnSvgKey = () => {
    const regionKey = resolveSvgRegionKey(svgSearchQuery.value)
    if (!regionKey) {
        svgSearchError.value = '未找到该 SVG 区域'
        return
    }

    svgSearchError.value = ''
    svgSearchQuery.value = regionKey
    focusedCountryCode.value = countryByRegion.value.get(regionKey)?.code ?? null
    closeSelectedCountry()
    focusOnRegion(regionKey, { showCard: false })
}

const onWheel = (event: WheelEvent) => {
    const viewport = viewportRef.value
    if (!viewport) return

    const rect = viewport.getBoundingClientRect()
    const localX = event.clientX - rect.left
    const localY = event.clientY - rect.top
    const factor = event.deltaY > 0 ? 1 - ZOOM_STEP : 1 + ZOOM_STEP

    applyZoomAt(localX, localY, scale.value * factor)
}

const onMouseDown = (event: MouseEvent) => {
    if (!isSpaceDown.value || event.button !== 0) return

    isPanning.value = true
    panStart.value = {
        x: event.clientX,
        y: event.clientY,
        tx: translateX.value,
        ty: translateY.value,
    }
}

const updateMagnifierPos = (event: MouseEvent) => {
    const viewport = viewportRef.value
    if (!viewport || !magnifierEnabled.value) {
        magnifierVisible.value = false
        return
    }

    const rect = viewport.getBoundingClientRect()
    magnifierPos.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    }
    magnifierVisible.value = true
}

const onMouseMove = (event: MouseEvent) => {
    if (isPanning.value) {
        translateX.value = panStart.value.tx + (event.clientX - panStart.value.x)
        translateY.value = panStart.value.ty + (event.clientY - panStart.value.y)
        return
    }

    if (magnifierEnabled.value) {
        updateMagnifierPos(event)
    }

    if (focusedRegionKey.value || magnifierEnabled.value) return

    tooltipPos.value = {
        x: event.clientX + 16,
        y: event.clientY + 16,
    }
}

const onViewportLeave = () => {
    stopPan()
    magnifierVisible.value = false
    hoveredMarkerKey.value = null
}

const stopPan = () => {
    isPanning.value = false
}

const setHoveredRegion = (regionKey: string | null) => {
    hoveredRegion.value = regionKey
    applyRegionStyles()
}

const bindRegionEvents = (regionKey: string, paths: SVGPathElement[]) => {
    const activate = () => showRegion(regionKey)
    const deactivate = () => scheduleHideRegion()

    paths.forEach(path => {
        path.addEventListener('mouseenter', activate)
        path.addEventListener('mouseleave', deactivate)
    })
}

const computeCentroid = (paths: SVGPathElement[]) => {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    paths.forEach(path => {
        const box = path.getBBox()
        minX = Math.min(minX, box.x)
        minY = Math.min(minY, box.y)
        maxX = Math.max(maxX, box.x + box.width)
        maxY = Math.max(maxY, box.y + box.height)
    })

    return {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
    }
}

const setupSvgLayers = () => {
    const host = svgHostRef.value
    if (!host) return

    const svg = host.querySelector('svg')
    if (!svg) return

    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')

    regionPathMap = new Map()
    const paths = svg.querySelectorAll('path')

    paths.forEach(path => {
        const regionKey = path.id || path.getAttribute('class')
        if (!regionKey) return

        path.classList.add('map-path')
        path.dataset.regionKey = regionKey

        if (!regionPathMap.has(regionKey)) regionPathMap.set(regionKey, [])
        regionPathMap.get(regionKey)!.push(path as SVGPathElement)
    })

    const nextMarkers: MapMarker[] = []

    regionPathMap.forEach((regionPaths, regionKey) => {
        bindRegionEvents(regionKey, regionPaths)

        const matched = countryByRegion.value.get(regionKey)
        const label = regionLabels.value.get(regionKey) || regionKey
        const country = matched || createPlaceholderCountry(regionKey, label)
        const { x, y } = computeCentroid(regionPaths)

        nextMarkers.push({
            regionKey,
            country,
            x,
            y,
            hasData: !!matched,
        })
    })

    markers.value = nextMarkers.sort((a, b) => {
        if (a.hasData !== b.hasData) return a.hasData ? -1 : 1
        return (a.country.no || 9999) - (b.country.no || 9999)
    })

    allCountryByRegion.value = new Map(nextMarkers.map(marker => [marker.regionKey, marker.country]))
}

const onMarkerEnter = (marker: MapMarker, event: MouseEvent) => {
    if (!isMarkerInteractive()) return
    hoveredMarkerKey.value = marker.regionKey
    showRegion(marker.regionKey)
    if (!magnifierEnabled.value) {
        tooltipPos.value = { x: event.clientX + 16, y: event.clientY + 16 }
    }
}

const onMarkerLeave = () => {
    if (!isMarkerInteractive()) return
    hoveredMarkerKey.value = null
    scheduleHideRegion()
}

const onMarkerClick = (marker: MapMarker, event: MouseEvent) => {
    event.stopPropagation()
    toggleSelectedMarker(marker.regionKey)
}

const toggleSelectedMarker = (regionKey: string) => {
    if (selectedRegionKey.value === regionKey) {
        closeSelectedCountry()
        return
    }
    openSelectedCountry(regionKey)
}

const pointerToSvgCoords = (event: MouseEvent) => {
    const viewport = viewportRef.value
    if (!viewport) return null

    const rect = viewport.getBoundingClientRect()
    const localX = event.clientX - rect.left
    const localY = event.clientY - rect.top

    let svg: SVGSVGElement | null = null

    if (magnifierEnabled.value && magnifierVisible.value) {
        const lensRadius = MAGNIFIER_SIZE / 2
        const dx = localX - magnifierPos.value.x
        const dy = localY - magnifierPos.value.y
        if (dx * dx + dy * dy <= lensRadius * lensRadius) {
            svg = viewport.querySelector('.magnifier-svg-host svg')
        }
    }

    if (!svg) {
        svg = svgHostRef.value?.querySelector('svg') ?? null
    }

    if (!svg) return null

    const point = svg.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY

    const ctm = svg.getScreenCTM()
    if (!ctm) return null

    const { x: svgX, y: svgY } = point.matrixTransform(ctm.inverse())
    return { svgX, svgY }
}

const findMarkerAtPointer = (event: MouseEvent) => {
    const coords = pointerToSvgCoords(event)
    if (!coords) return null

    const pickRadius = Math.max(markerSizeTier.value.hitR * 3, RIGHT_CLICK_PICK_MIN_RADIUS)
    let nearest: MapMarker | null = null
    let nearestDist = Infinity

    markers.value.forEach(marker => {
        const dist = Math.hypot(marker.x - coords.svgX, marker.y - coords.svgY)
        if (dist < nearestDist) {
            nearest = marker
            nearestDist = dist
        }
    })

    if (!nearest || nearestDist > pickRadius) return null
    return nearest
}

const showPickFlashAt = (event: MouseEvent, marker: MapMarker) => {
    const viewport = viewportRef.value
    if (!viewport) return

    const rect = viewport.getBoundingClientRect()
    if (pickFlashTimer) {
        clearTimeout(pickFlashTimer)
        pickFlashTimer = null
    }

    pickFlash.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        label: markerLabel(marker),
    }

    pickFlashTimer = setTimeout(() => {
        pickFlash.value = null
        pickFlashTimer = null
    }, RIGHT_CLICK_FLASH_MS)
}

const onViewportContextMenu = (event: MouseEvent) => {
    event.preventDefault()
    event.stopImmediatePropagation()

    if (showFlagLabels.value && !magnifierEnabled.value) return

    const marker = findMarkerAtPointer(event)
    if (!marker) return

    toggleSelectedMarker(marker.regionKey)
    showPickFlashAt(event, marker)
}

let viewportContextMenuHandler: ((event: MouseEvent) => void) | null = null
let viewportContextMenuTarget: HTMLElement | null = null

const onKeyDown = (event: KeyboardEvent) => {
    if (event.code !== 'Space' || event.repeat) return
    isSpaceDown.value = true
    event.preventDefault()
}

const onKeyUp = (event: KeyboardEvent) => {
    if (event.code !== 'Space') return
    isSpaceDown.value = false
    isPanning.value = false
}

onMounted(async () => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    const [excelData, svgResponse] = await Promise.all([
        xlsx.readExcel('/docs/datas/world.xlsx'),
        fetch('/docs/flags/world.svg'),
    ])

    countries.value = (excelData.country || []) as CountryData[]
    svgHtml.value = await svgResponse.text()

    const { regionByKey } = buildRegionIndex(svgHtml.value)
    regionLabels.value = regionByKey
    const maps = buildCountryRegionMap(countries.value, regionByKey)
    countryByRegion.value = maps.countryByRegion
    regionByCountry.value = maps.regionByCountry

    await nextTick()
    setupSvgLayers()
    fitToViewport()
    window.addEventListener('resize', fitToViewport)

    viewportContextMenuHandler = onViewportContextMenu
    viewportContextMenuTarget = viewportRef.value
    viewportContextMenuTarget?.addEventListener('contextmenu', viewportContextMenuHandler, true)
})

onUnmounted(() => {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
    window.removeEventListener('resize', fitToViewport)
    if (viewportContextMenuTarget && viewportContextMenuHandler) {
        viewportContextMenuTarget.removeEventListener('contextmenu', viewportContextMenuHandler, true)
    }
    if (pickFlashTimer) {
        clearTimeout(pickFlashTimer)
        pickFlashTimer = null
    }
    clearLabelRender()
})

watch(showFlagLabels, (enabled) => {
    if (enabled) return
    clearLabelRender()
    applyRegionStyles()
})
</script>

<template>
    <div class="sections">
        <div
            ref="viewportRef"
            class="map-viewport"
            :style="{ cursor: viewportCursor }"
            title="右键按坐标选中最近圆点"
            @contextmenu.prevent
            @wheel.prevent="onWheel"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="stopPan"
            @mouseleave="onViewportLeave"
        >
            <div class="map-stage" :class="{ 'with-transition': enableStageTransition }" :style="stageStyle">
                <div ref="svgHostRef" class="svg-host" :class="{ 'labels-mode': showFlagLabels }" v-html="svgHtml" />

                <svg
                    class="marker-layer"
                    :viewBox="`0 0 ${SVG_VIEWBOX.width} ${SVG_VIEWBOX.height}`"
                    aria-hidden="true"
                >
                    <g v-if="focusedMarker" class="focus-ring-group">
                        <circle
                            class="focus-ring focus-ring-1"
                            :cx="focusedMarker.x"
                            :cy="focusedMarker.y"
                            r="6"
                        />
                        <circle
                            class="focus-ring focus-ring-2"
                            :cx="focusedMarker.x"
                            :cy="focusedMarker.y"
                            r="6"
                        />
                        <circle
                            class="focus-ring-core"
                            :cx="focusedMarker.x"
                            :cy="focusedMarker.y"
                            r="3.5"
                        />
                    </g>
                    <g v-for="marker in sortedMarkers" :key="marker.regionKey" class="marker-group">
                        <circle
                            class="map-marker-hit"
                            :class="{
                                'is-active': !showFlagLabels && (hoveredRegion === marker.regionKey || focusedRegionKey === marker.regionKey),
                                'is-selected': selectedRegionKey === marker.regionKey,
                            }"
                            :cx="marker.x"
                            :cy="marker.y"
                            :r="markerSizeTier.hitR"
                            @mouseenter="onMarkerEnter(marker, $event)"
                            @mouseleave="onMarkerLeave"
                            @click="onMarkerClick(marker, $event)"
                        />
                        <circle
                            class="map-marker"
                            :class="{
                                'is-active': !showFlagLabels && (hoveredRegion === marker.regionKey || focusedRegionKey === marker.regionKey),
                                'is-focused': focusedRegionKey === marker.regionKey,
                                'is-selected': selectedRegionKey === marker.regionKey,
                                'is-placeholder': !marker.hasData,
                            }"
                            :cx="marker.x"
                            :cy="marker.y"
                            :r="markerSizeTier.dotR"
                        />
                        <g
                            v-if="showFlagLabels && marker.hasData && visibleLabelKeySet.has(marker.regionKey)"
                            class="marker-label"
                            :transform="`translate(${marker.x + markerSizeTier.dotR + 1}, ${marker.y - markerSizeTier.dotR - 2})`"
                        >
                            <image
                                class="marker-flag"
                                :href="`/docs/flags/${marker.country.flag}`"
                                x="0"
                                :y="-markerSizeTier.flagH / 2"
                                :width="markerSizeTier.flagW"
                                :height="markerSizeTier.flagH"
                                preserveAspectRatio="xMidYMid slice"
                            />
                            <text
                                class="marker-name"
                                :x="markerSizeTier.flagW + 3"
                                y="3"
                                :style="{ fontSize: `${markerSizeTier.labelSize}px` }"
                            >{{ marker.country.name }}</text>
                        </g>
                    </g>
                </svg>
            </div>

            <Transition name="pick-flash-fade">
                <div
                    v-if="pickFlash"
                    class="pick-flash-marker"
                    :style="{ left: `${pickFlash.x}px`, top: `${pickFlash.y}px` }"
                >
                    <span class="pick-flash-ring" aria-hidden="true" />
                    <span class="pick-flash-pin" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                            <circle cx="12" cy="10" r="2.5" fill="currentColor" stroke="none" />
                        </svg>
                    </span>
                    <span class="pick-flash-label">{{ pickFlash.label }}</span>
                </div>
            </Transition>

            <div
                v-if="magnifierEnabled && magnifierVisible"
                class="magnifier-lens"
                :style="magnifierLensStyle"
            >
                <div class="magnifier-viewport">
                    <div class="magnifier-stage" :style="magnifierStageStyle">
                        <div class="svg-host magnifier-svg-host" v-html="svgHtml" />
                        <svg
                            class="marker-layer magnifier-marker-layer"
                            :viewBox="`0 0 ${SVG_VIEWBOX.width} ${SVG_VIEWBOX.height}`"
                            aria-hidden="true"
                        >
                            <g
                                v-for="marker in magnifierVisibleMarkers"
                                :key="`mag-${marker.regionKey}`"
                                class="marker-group magnifier-marker-group"
                            >
                                <circle
                                    class="map-marker magnifier-marker-dot"
                                    :class="{
                                        'is-active': hoveredRegion === marker.regionKey || focusedRegionKey === marker.regionKey,
                                        'is-focused': focusedRegionKey === marker.regionKey,
                                        'is-selected': selectedRegionKey === marker.regionKey,
                                        'is-placeholder': !marker.hasData,
                                    }"
                                    :cx="marker.x"
                                    :cy="marker.y"
                                    :r="MARKER_DOT_R_MAG"
                                />
                                <text
                                    class="magnifier-marker-label"
                                    :x="marker.x"
                                    :y="marker.y + MARKER_DOT_R_MAG + 5"
                                    text-anchor="middle"
                                >
                                    {{ markerLabel(marker) }}
                                </text>
                                <circle
                                    class="map-marker-hit magnifier-marker-hit"
                                    :class="{
                                        'is-active': hoveredRegion === marker.regionKey || focusedRegionKey === marker.regionKey,
                                        'is-selected': selectedRegionKey === marker.regionKey,
                                    }"
                                    :cx="marker.x"
                                    :cy="marker.y"
                                    :r="MARKER_HIT_R_MAG"
                                    @mouseenter="onMarkerEnter(marker, $event)"
                                    @mouseleave="onMarkerLeave"
                                    @click="onMarkerClick(marker, $event)"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            <div v-if="focusedRegionKey" class="region-focus-hud">
                <div class="focus-crosshair" aria-hidden="true">
                    <span class="focus-crosshair-v" />
                    <span class="focus-crosshair-h" />
                </div>
                <div class="region-focus-badge">
                    <span class="badge-key">{{ focusedRegionKey }}</span>
                    <span class="badge-name">{{ focusedRegionLabel }}</span>
                    <button type="button" class="badge-close" title="清除定位" @click="clearFocusedRegion">×</button>
                </div>
            </div>

            <Transition name="card-fade">
                <div
                    v-if="hoveredCountry"
                    class="country-tooltip"
                    :class="{ 'is-centered': focusedRegionKey }"
                    :style="tooltipStyle"
                    @mouseenter="clearHideHover"
                    @mouseleave="scheduleHideRegion"
                >
                    <CountryCard :country="hoveredCountry" />
                </div>
            </Transition>

            <Transition name="card-fade">
                <div
                    v-if="selectedCountry"
                    class="country-panel"
                    title="点击关闭"
                    @click="closeSelectedCountry"
                >
                    <button
                        type="button"
                        class="country-panel-close"
                        title="关闭"
                        @click.stop="closeSelectedCountry"
                    >
                        ×
                    </button>
                    <CountryCard :country="selectedCountry" />
                </div>
            </Transition>

            <div class="map-toolbar">
                <div class="zoom-controls">
                    <button type="button" class="zoom-btn" title="缩小" @click="zoomBy(1 - ZOOM_STEP)">−</button>
                    <button type="button" class="zoom-label" title="重置视图" @click="resetView">{{ scalePercent }}</button>
                    <button type="button" class="zoom-btn" title="放大" @click="zoomBy(1 + ZOOM_STEP)">+</button>
                </div>

                <button
                    type="button"
                    class="label-toggle"
                    :class="{ active: showFlagLabels }"
                    title="显示国旗与名称"
                    @click="toggleFlagLabels"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="14" rx="2" />
                        <path d="M3 9h18" />
                        <path d="M8 4v14" />
                    </svg>
                </button>

                <button
                    type="button"
                    class="magnifier-toggle"
                    :class="{ active: magnifierEnabled }"
                    title="放大镜（激活后可在镜内点击放大的圆点）"
                    @click="toggleMagnifier"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </button>

                <div class="svg-search" :class="{ 'has-error': svgSearchError }" :title="svgSearchError || '输入 SVG 区域号定位'">
                    <input
                        v-model="svgSearchQuery"
                        type="text"
                        list="svg-region-options"
                        placeholder="SVG 号"
                        @keyup.enter="focusOnSvgKey"
                        @input="svgSearchError = ''"
                    />
                    <datalist id="svg-region-options">
                        <option v-for="key in svgRegionKeys" :key="key" :value="key" />
                    </datalist>
                    <button type="button" class="svg-search-btn" title="定位到 SVG 区域" @click="focusOnSvgKey">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                        </svg>
                    </button>
                </div>

                <div class="search-wrap">
                    <button
                        type="button"
                        class="search-toggle"
                        :class="{ active: showSearchPanel }"
                        title="搜索国家"
                        @click="toggleSearchPanel"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>

                    <Transition name="panel-slide">
                        <div v-if="showSearchPanel" class="search-panel">
                            <div class="search-panel-inner">
                                <div class="filter-bar">
                                    <div class="search-box">
                                        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                        <input
                                            v-model="searchQuery"
                                            type="text"
                                            placeholder="搜索国家中/英文名、全称或简称..."
                                        />
                                    </div>

                                    <div class="filter-group">
                                        <div class="select-wrapper">
                                            <select v-model="selectedContinent">
                                                <option value="">全部大洲</option>
                                                <option v-for="continent in availableContinents" :key="continent" :value="continent">
                                                    {{ continent }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="select-wrapper">
                                            <select v-model="selectedPartition">
                                                <option value="">全部区域</option>
                                                <option v-for="partition in availablePartitions" :key="partition" :value="partition">
                                                    {{ partition }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="select-wrapper">
                                            <select v-model="sortField">
                                                <option value="no">默认序号</option>
                                                <option value="name">中文名</option>
                                                <option value="enName">英文名</option>
                                                <option value="code">国家代号</option>
                                            </select>
                                        </div>

                                        <button
                                            type="button"
                                            class="sort-toggle-btn"
                                            :title="sortOrder === 'asc' ? '当前正序' : '当前倒序'"
                                            @click="toggleSortOrder"
                                        >
                                            <svg v-if="sortOrder === 'asc'" class="icon" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M12 19V5M5 12l7-7 7 7" />
                                            </svg>
                                            <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M12 5v14M5 12l7 7 7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="results-info">
                                    共找到 <span>{{ filteredCountries.length }}</span> 个国家
                                </div>

                                <div class="list-country">
                                    <div v-if="filteredCountries.length === 0" class="empty-state">
                                        没有匹配的国家数据...
                                    </div>
                                    <div
                                        v-for="country in filteredCountries"
                                        :key="country.code"
                                        class="country-item"
                                        :class="{
                                            active: focusedCountryCode === country.code,
                                            disabled: !regionByCountry.get(country.code),
                                        }"
                                        @click="focusOnCountry(country)"
                                    >
                                        <CountryCard :country="country" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$accent: #3b82f6;
$accent-dark: #1d4ed8;
$panel-bg: #ffffff;
$border: #e5e7eb;

.sections {
    position: relative;
    width: 100%;
    height: calc(100vh - 70px);
    overflow: hidden;
    background: #dbeafe;
    box-sizing: border-box;
}

.map-toolbar {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 20;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    pointer-events: none;

    > * {
        pointer-events: auto;
    }
}

.zoom-controls {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px;
    background: $panel-bg;
    border: 1px solid $border;
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);

    .zoom-btn,
    .zoom-label {
        border: none;
        background: #f3f4f6;
        color: #1f2937;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .zoom-btn {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        font-size: 22px;
        line-height: 1;
        font-weight: 500;

        &:hover {
            background: #e5e7eb;
        }
    }

    .zoom-label {
        min-width: 72px;
        height: 36px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 700;

        &:hover {
            background: rgba($accent, 0.12);
            color: $accent-dark;
        }
    }
}

.search-wrap {
    position: relative;
}

.search-toggle {
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $border;
    border-radius: 14px;
    background: $panel-bg;
    color: #6b7280;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    transition: all 0.2s ease;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover,
    &.active {
        color: $accent-dark;
        border-color: rgba($accent, 0.35);
        background: rgba($accent, 0.08);
    }
}

.label-toggle {
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $border;
    border-radius: 14px;
    background: $panel-bg;
    color: #6b7280;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    transition: all 0.2s ease;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover,
    &.active {
        color: #ea580c;
        border-color: rgba(249, 115, 22, 0.35);
        background: rgba(249, 115, 22, 0.08);
    }
}

.magnifier-toggle {
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $border;
    border-radius: 14px;
    background: $panel-bg;
    color: #6b7280;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    transition: all 0.2s ease;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover,
    &.active {
        color: $accent-dark;
        border-color: rgba($accent, 0.35);
        background: rgba($accent, 0.08);
    }
}

.magnifier-lens {
    position: absolute;
    z-index: 26;
    pointer-events: none;
    border-radius: 50%;
    overflow: hidden;
    background: #dbeafe;
    border: 3px solid #ffffff;
    box-shadow:
        0 0 0 2px rgba($accent, 0.55),
        0 14px 36px rgba(15, 23, 42, 0.28);
}

.magnifier-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
}

.magnifier-stage {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0;
    will-change: transform;
}

.magnifier-svg-host {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.magnifier-marker-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;

    .magnifier-marker-group {
        pointer-events: none;
    }

    .magnifier-marker-dot {
        fill: #f97316;
        stroke: #ffffff;
        stroke-width: var(--marker-stroke, 1.2);
        pointer-events: none;

        &.is-placeholder {
            fill: #fdba74;
        }

        &.is-active,
        &.is-selected {
            fill: $accent;
            stroke: #ffffff;
            stroke-width: var(--marker-stroke-emphasis, 1.6);
            filter: drop-shadow(0 0 4px rgba(37, 99, 235, 0.75));
        }

        &.is-focused {
            fill: #ea580c;
            stroke: #ffffff;
            stroke-width: var(--marker-stroke-emphasis, 1.6);
        }
    }

    .magnifier-marker-label {
        fill: #1f2937;
        font-size: 8px;
        font-weight: 800;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        pointer-events: none;
        paint-order: stroke;
        stroke: #ffffff;
        stroke-width: 2px;
        stroke-linejoin: round;
    }

    .magnifier-marker-hit {
        pointer-events: all;
        cursor: pointer;
        fill: transparent;
        stroke: transparent;
        stroke-width: var(--marker-stroke-active, 1);
        transition: stroke 0.15s ease;

        &.is-active,
        &:hover {
            stroke: rgba($accent, 0.75);
        }

        &.is-selected {
            stroke: $accent-dark;
            stroke-width: var(--marker-stroke-emphasis, 1.4);
        }
    }
}

.svg-search {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 48px;
    padding: 0 6px 0 12px;
    background: $panel-bg;
    border: 1px solid $border;
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    transition: border-color 0.2s ease;

    &.has-error {
        border-color: #ef4444;
    }

    input {
        width: 96px;
        height: 32px;
        border: none;
        background: transparent;
        color: #1f2937;
        font-size: 13px;
        outline: none;

        &::placeholder {
            color: #9ca3af;
        }
    }

    .svg-search-btn {
        width: 36px;
        height: 36px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 10px;
        background: #f3f4f6;
        color: #6b7280;
        cursor: pointer;
        transition: all 0.2s ease;

        svg {
            width: 18px;
            height: 18px;
        }

        &:hover {
            background: rgba($accent, 0.12);
            color: $accent-dark;
        }
    }
}

.search-panel {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: min(420px, calc(100vw - 32px));
    max-height: min(70vh, 720px);
    z-index: 40;
}

.search-panel-inner {
    display: flex;
    flex-direction: column;
    max-height: min(70vh, 720px);
    padding: 14px;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid $border;
    border-radius: 18px;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.16);
    backdrop-filter: blur(10px);
}

.filter-bar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;

    .search-box {
        position: relative;

        .search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            color: #9ca3af;
        }

        input {
            width: 100%;
            padding: 10px 12px 10px 36px;
            font-size: 14px;
            border: 1px solid $border;
            border-radius: 12px;
            background: #f9fafb;
            outline: none;
            box-sizing: border-box;

            &:focus {
                border-color: $accent;
                box-shadow: 0 0 0 3px rgba($accent, 0.1);
            }
        }
    }

    .filter-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;

        .select-wrapper select {
            width: 100%;
            padding: 8px 10px;
            font-size: 12px;
            border: 1px solid $border;
            border-radius: 10px;
            background: #f9fafb;
            outline: none;
            box-sizing: border-box;
        }

        .sort-toggle-btn {
            grid-column: span 2;
            height: 34px;
            border: 1px solid $border;
            border-radius: 10px;
            background: #f9fafb;
            cursor: pointer;

            .icon {
                width: 16px;
                height: 16px;
            }
        }
    }
}

.results-info {
    margin-bottom: 10px;
    font-size: 12px;
    color: #6b7280;

    span {
        font-weight: 700;
        color: #1f2937;
    }
}

.list-country {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-right: 4px;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 999px;
    }

    .empty-state {
        padding: 32px 16px;
        text-align: center;
        color: #9ca3af;
        font-size: 14px;
        border: 1px dashed $border;
        border-radius: 14px;
    }

    .country-item {
        cursor: pointer;
        border-radius: 18px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &.active {
            box-shadow: 0 0 0 2px $accent;
        }

        &.disabled {
            opacity: 0.45;
            cursor: not-allowed;
        }

        &:not(.disabled):hover {
            transform: translateY(-2px);
        }

        :deep(.card-country) {
            width: 100%;

            &:hover {
                transform: none;
            }
        }
    }
}

.panel-slide-enter-active,
.panel-slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.panel-slide-enter-from,
.panel-slide-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

.map-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background:
        radial-gradient(circle at top, rgba(59, 130, 246, 0.08), transparent 35%),
        #dbeafe;
}

.pick-flash-marker {
    position: absolute;
    z-index: 28;
    pointer-events: none;
    transform: translate(-50%, -100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    animation: pick-flash-pop 0.28s cubic-bezier(0.22, 1, 0.36, 1);

    .pick-flash-ring {
        position: absolute;
        left: 50%;
        bottom: 6px;
        width: 36px;
        height: 36px;
        margin-left: -18px;
        border: 2px solid #ea580c;
        border-radius: 50%;
        animation: pick-flash-ring 0.8s ease-out infinite;
    }

    .pick-flash-pin {
        position: relative;
        z-index: 1;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ea580c;
        filter: drop-shadow(0 4px 10px rgba(234, 88, 12, 0.45));

        svg {
            width: 100%;
            height: 100%;
        }
    }

    .pick-flash-label {
        position: relative;
        z-index: 1;
        padding: 2px 8px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.96);
        border: 1.5px solid #ea580c;
        color: #1f2937;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.03em;
        box-shadow: 0 6px 16px rgba(15, 23, 42, 0.15);
        white-space: nowrap;
    }
}

.pick-flash-fade-enter-active,
.pick-flash-fade-leave-active {
    transition: opacity 0.35s ease, transform 0.35s ease;
}

.pick-flash-fade-enter-from,
.pick-flash-fade-leave-to {
    opacity: 0;
    transform: translate(-50%, -100%) scale(0.85);
}

@keyframes pick-flash-pop {
    from {
        opacity: 0;
        transform: translate(-50%, -100%) scale(0.7);
    }

    to {
        opacity: 1;
        transform: translate(-50%, -100%) scale(1);
    }
}

@keyframes pick-flash-ring {
    0% {
        transform: scale(0.6);
        opacity: 0.9;
    }

    100% {
        transform: scale(1.6);
        opacity: 0;
    }
}

.map-stage {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    will-change: transform;

    &.with-transition {
        transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    }
}

.svg-host,
.marker-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.marker-layer {
    pointer-events: none;

    .marker-group {
        pointer-events: none;
    }

    .map-marker-hit {
        pointer-events: all;
        fill: transparent;
        cursor: pointer;
    }

    .map-marker {
        fill: #f97316;
        stroke: #ffffff;
        stroke-width: var(--marker-stroke, 0.8);
        pointer-events: none;
        transition: fill 0.15s ease, stroke-width 0.15s ease;

        &.is-placeholder {
            fill: #fdba74;
            opacity: 0.85;
        }

        &.is-active {
            fill: $accent;
            stroke: #ffffff;
            stroke-width: var(--marker-stroke-active, 1.2);
        }

        &.is-focused {
            fill: #ea580c;
            stroke: #ffffff;
            stroke-width: var(--marker-stroke-emphasis, 1.6);
            filter: drop-shadow(0 0 8px rgba(234, 88, 12, 0.85));
            animation: marker-focus-blink 1s ease-in-out infinite;
        }

        &.is-selected {
            fill: $accent;
            stroke: #ffffff;
            stroke-width: var(--marker-stroke-emphasis, 1.6);
            filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.85));
        }
    }

    .focus-ring-group {
        pointer-events: none;

        .focus-ring {
            fill: none;
            stroke: #ea580c;
            stroke-width: var(--focus-ring-stroke, 1.2);
            opacity: 0.85;
            transform-box: fill-box;
            transform-origin: center;
            animation: focus-ring-pulse 1.8s ease-out infinite;
        }

        .focus-ring-2 {
            animation-delay: 0.6s;
        }

        .focus-ring-core {
            fill: #ea580c;
            stroke: #ffffff;
            stroke-width: var(--focus-core-stroke, 1);
            animation: focus-core-blink 1s ease-in-out infinite;
        }
    }

    .marker-label {
        pointer-events: none;

        .marker-flag {
            pointer-events: none;
        }

        .marker-name {
            fill: #1f2937;
            font-size: 9px;
            font-weight: 700;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            paint-order: stroke;
            stroke: #ffffff;
            stroke-width: 2px;
            stroke-linejoin: round;

            &.is-placeholder {
                fill: #9ca3af;
                font-weight: 600;
            }
        }
    }
}

:deep(.svg-host svg),
:deep(.magnifier-svg-host svg) {
    display: block;
    width: 100%;
    height: 100%;
}

:deep(.svg-host.labels-mode .map-path) {
    pointer-events: none;
    cursor: default;
}

:deep(.map-path) {
    transition: fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease, opacity 0.2s ease;
    cursor: pointer;
}

:deep(.map-path.is-active) {
    fill: #93c5fd !important;
    stroke: $accent-dark !important;
    stroke-width: var(--path-stroke-hover, 1.4) !important;
    filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.45));
}

:deep(.map-path.is-selected) {
    fill: #93c5fd !important;
    stroke: $accent-dark !important;
    stroke-width: var(--path-stroke-selected, 2.2) !important;
    opacity: 1 !important;
    filter: drop-shadow(0 0 12px rgba(37, 99, 235, 0.65));
}

:deep(.map-path.is-focused) {
    fill: #fde047 !important;
    stroke: #ea580c !important;
    stroke-width: var(--path-stroke-focused, 3) !important;
    opacity: 1 !important;
    animation: region-focus-pulse 1.1s ease-in-out infinite;
    filter: drop-shadow(0 0 16px rgba(234, 88, 12, 0.95));
}

:deep(.map-path.is-dimmed) {
    fill: #cbd5e1 !important;
    opacity: 0.28;
}

.region-focus-hud {
    position: absolute;
    inset: 0;
    z-index: 12;
    pointer-events: none;
}

.focus-crosshair {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 72px;
    height: 72px;
    transform: translate(-50%, -50%);

    .focus-crosshair-v,
    .focus-crosshair-h {
        position: absolute;
        background: rgba(234, 88, 12, 0.75);
        border-radius: 999px;
        animation: crosshair-pulse 1.1s ease-in-out infinite;
    }

    .focus-crosshair-v {
        left: 50%;
        top: 0;
        width: 2px;
        height: 100%;
        transform: translateX(-50%);
    }

    .focus-crosshair-h {
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        transform: translateY(-50%);
    }
}

.region-focus-badge {
    position: absolute;
    left: 50%;
    bottom: 28px;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.96);
    border: 2px solid #ea580c;
    border-radius: 999px;
    box-shadow: 0 12px 32px rgba(234, 88, 12, 0.28);
    pointer-events: auto;
    animation: badge-pop 0.35s cubic-bezier(0.22, 1, 0.36, 1);

    .badge-key {
        min-width: 36px;
        padding: 4px 8px;
        border-radius: 8px;
        background: #ea580c;
        color: #ffffff;
        font-size: 13px;
        font-weight: 800;
        text-align: center;
        letter-spacing: 0.04em;
    }

    .badge-name {
        max-width: min(360px, calc(100vw - 160px));
        color: #1f2937;
        font-size: 14px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .badge-close {
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 999px;
        background: #f3f4f6;
        color: #6b7280;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background: #fee2e2;
            color: #dc2626;
        }
    }
}

@keyframes region-focus-pulse {
    0%, 100% {
        stroke-width: var(--path-stroke-focused, 3);
        filter: drop-shadow(0 0 16px rgba(234, 88, 12, 0.95));
    }

    50% {
        stroke-width: calc(var(--path-stroke-focused, 3) * 1.45);
        filter: drop-shadow(0 0 24px rgba(234, 88, 12, 1));
    }
}

@keyframes focus-ring-pulse {
    0% {
        transform: scale(1);
        opacity: 0.9;
    }

    100% {
        transform: scale(7);
        opacity: 0;
    }
}

@keyframes focus-core-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
}

@keyframes marker-focus-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
}

@keyframes crosshair-pulse {
    0%, 100% { opacity: 0.9; }
    50% { opacity: 0.35; }
}

@keyframes badge-pop {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(12px) scale(0.92);
    }

    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
    }
}

.country-tooltip {
    position: fixed;
    z-index: 30;
    pointer-events: auto;

    &.is-centered {
        transform: translateX(-50%);
    }

    :deep(.card-country) {
        width: 320px;
        transform: none !important;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);

        &:hover {
            transform: none !important;
        }
    }
}

.country-panel {
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 30;
    cursor: pointer;

    .country-panel-close {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 2;
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.92);
        color: #6b7280;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
        transition: all 0.2s ease;

        &:hover {
            background: #fee2e2;
            color: #dc2626;
        }
    }

    :deep(.card-country) {
        width: 320px;
        transform: none !important;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
        pointer-events: none;

        &:hover {
            transform: none !important;
        }
    }
}

.card-fade-enter-active,
.card-fade-leave-active {
    transition: opacity 0.18s ease, transform 0.18s ease;
}

.card-fade-enter-from,
.card-fade-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

@media (max-width: 768px) {
    .map-toolbar {
        top: 12px;
        right: 12px;
        flex-wrap: wrap;
        justify-content: flex-end;
        max-width: calc(100% - 24px);
    }

    .svg-search input {
        width: 72px;
    }

    .country-tooltip :deep(.card-country) {
        width: min(320px, calc(100vw - 32px));
    }

    .country-panel {
        right: 12px;
        bottom: 12px;
        left: 12px;

        :deep(.card-country) {
            width: 100%;
        }
    }
}
</style>
