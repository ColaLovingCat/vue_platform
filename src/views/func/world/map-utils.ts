export interface CountryData {
    no: number
    name: string
    fullName: string
    enName: string
    flag: string
    city: string
    enCity: string
    continent: string
    partition: string
    code: string
    type?: string
}

export interface MapMarker {
    regionKey: string
    country: CountryData
    x: number
    y: number
    hasData: boolean
}

export interface SvgCodeMapping {
    svg: string
    code: string
}

export const createPlaceholderCountry = (regionKey: string, displayName: string): CountryData => ({
    no: 0,
    name: displayName,
    fullName: displayName,
    enName: displayName,
    flag: `${regionKey}.png`,
    city: '-',
    enCity: '-',
    continent: '-',
    partition: '-',
    code: regionKey,
})

// SVG region key -> Excel code（221 个 SVG 区域全量列表，code 留空表示待补）
const SVG_CODE_MAP: SvgCodeMapping[] = [
    { svg: 'AE', code: 'ARE' },
    { svg: 'AF', code: 'AFG' },
    { svg: 'AI', code: 'AI' },
    { svg: 'AL', code: 'ALB' },
    { svg: 'AM', code: 'ARM' },
    { svg: 'American Samoa', code: 'AS' },
    { svg: 'Angola', code: 'AGO' },
    { svg: 'Antigua and Barbuda', code: 'ATG' },
    { svg: 'Argentina', code: 'ARG' },
    { svg: 'AT', code: 'AUT' },
    { svg: 'Australia', code: 'AUS' },
    { svg: 'AW', code: 'AW' },
    { svg: 'Azerbaijan', code: 'AZE' },
    { svg: 'BA', code: 'BIH' },
    { svg: 'Bahamas', code: 'BHS' },
    { svg: 'BB', code: 'BRB' },
    { svg: 'BD', code: 'BGD' },
    { svg: 'BE', code: 'BEL' },
    { svg: 'BF', code: 'BFA' },
    { svg: 'BG', code: 'BGR' },
    { svg: 'BH', code: 'BHR' },
    { svg: 'BI', code: 'BDI' },
    { svg: 'BJ', code: 'BEN' },
    { svg: 'BL', code: 'BL' },
    { svg: 'BM', code: 'BM' },
    { svg: 'BN', code: 'BRN' },
    { svg: 'BO', code: 'BOL' },
    { svg: 'BQBO', code: 'BQBO' },
    { svg: 'BQSA', code: 'BQSA' },
    { svg: 'BQSE', code: 'BQSE' },
    { svg: 'BR', code: 'BRA' },
    { svg: 'BT', code: 'BTN' },
    { svg: 'BW', code: 'BWA' },
    { svg: 'BY', code: 'BLR' },
    { svg: 'BZ', code: 'BLZ' },
    { svg: 'Canada', code: 'CAN' },
    { svg: 'Canary Islands (Spain)', code: 'CAL' },
    { svg: 'Cape Verde', code: 'CPV' },
    { svg: 'Cayman Islands', code: 'CAI' },
    { svg: 'CD', code: 'COD' },
    { svg: 'CF', code: 'CAF' },
    { svg: 'CG', code: 'COG' },
    { svg: 'CH', code: 'CHE' },
    { svg: 'Chile', code: 'CHL' },
    { svg: 'China', code: 'CHN' },
    { svg: 'CI', code: 'CIV' },
    { svg: 'CM', code: 'CMR' },
    { svg: 'CO', code: 'COL' },
    { svg: 'Comoros', code: 'COM' },
    { svg: 'CR', code: 'CRI' },
    { svg: 'CU', code: 'CUB' },
    { svg: 'CW', code: 'CW' },
    { svg: 'Cyprus', code: 'CYP' },
    { svg: 'CZ', code: 'CZE' },
    { svg: 'DE', code: 'DEU' },
    { svg: 'Denmark', code: 'DNK' },
    { svg: 'DJ', code: 'DJI' },
    { svg: 'DM', code: 'DM' },
    { svg: 'DO', code: 'DOM' },
    { svg: 'DZ', code: 'DZA' },
    { svg: 'EC', code: 'ECU' },
    { svg: 'EE', code: 'EST' },
    { svg: 'EG', code: 'EGY' },
    { svg: 'EH', code: 'EH' },
    { svg: 'ER', code: 'ERI' },
    { svg: 'ES', code: 'ESP' },
    { svg: 'ET', code: 'ETH' },
    { svg: 'Faeroe Islands', code: 'FRO' },
    { svg: 'Falkland Islands', code: 'FI' },
    { svg: 'Federated States of Micronesia', code: 'FSM' },
    { svg: 'FI', code: 'FIN' },
    { svg: 'Fiji', code: 'FJI' },
    { svg: 'France', code: 'FRA' },
    { svg: 'French Polynesia', code: 'FB' },
    { svg: 'GA', code: 'GAB' },
    { svg: 'GD', code: 'GRD' },
    { svg: 'GE', code: 'GEO' },
    { svg: 'GF', code: 'GF' },
    { svg: 'GH', code: 'GHA' },
    { svg: 'GL', code: 'GRL' },
    { svg: 'GM', code: 'GMB' },
    { svg: 'GN', code: 'GIN' },
    { svg: 'GQ', code: 'GNQ' },
    { svg: 'Greece', code: 'GRC' },
    { svg: 'GT', code: 'GTM' },
    { svg: 'GU', code: 'GUM' },
    { svg: 'Guadeloupe', code: 'GUA' },
    { svg: 'GW', code: 'GNB' },
    { svg: 'GY', code: 'GUY' },
    { svg: 'HN', code: 'HND' },
    { svg: 'HR', code: 'HRV' },
    { svg: 'HT', code: 'HTI' },
    { svg: 'HU', code: 'HUN' },
    { svg: 'IE', code: 'IRL' },
    { svg: 'IL', code: 'ISR' },
    { svg: 'IN', code: 'IND' },
    { svg: 'Indonesia', code: 'IDN' },
    { svg: 'IQ', code: 'IRQ' },
    { svg: 'IR', code: 'IRN' },
    { svg: 'IS', code: 'ISL' },
    { svg: 'Italy', code: 'ITA' },
    { svg: 'Japan', code: 'JPN' },
    { svg: 'JM', code: 'JAM' },
    { svg: 'JO', code: 'JOR' },
    { svg: 'KE', code: 'KEN' },
    { svg: 'KG', code: 'KGZ' },
    { svg: 'KH', code: 'KHM' },
    { svg: 'KP', code: 'PRK' },
    { svg: 'KR', code: 'KOR' },
    { svg: 'KW', code: 'KWT' },
    { svg: 'KZ', code: 'KAZ' },
    { svg: 'LA', code: 'LAO' },
    { svg: 'LB', code: 'LBN' },
    { svg: 'LC', code: 'LCA' },
    { svg: 'LK', code: 'LKA' },
    { svg: 'LR', code: 'LBR' },
    { svg: 'LS', code: 'LSO' },
    { svg: 'LT', code: 'LTU' },
    { svg: 'LU', code: 'LUX' },
    { svg: 'LV', code: 'LVA' },
    { svg: 'LY', code: 'LBY' },
    { svg: 'MA', code: 'MAR' },
    { svg: 'Malaysia', code: 'MYS' },
    { svg: 'Malta', code: 'MLT' },
    { svg: 'Mauritius', code: 'MUS' },
    { svg: 'MD', code: 'MDA' },
    { svg: 'ME', code: 'MNE' },
    { svg: 'MF', code: 'MF' },
    { svg: 'MG', code: 'MDG' },
    { svg: 'MH', code: 'MHL' },
    { svg: 'MK', code: 'MKD' },
    { svg: 'ML', code: 'MLI' },
    { svg: 'MM', code: 'MMR' },
    { svg: 'MN', code: 'MNG' },
    { svg: 'MQ', code: 'MQ' },
    { svg: 'MR', code: 'MRT' },
    { svg: 'MS', code: 'MS' },
    { svg: 'MV', code: 'MDV' },
    { svg: 'MW', code: 'MWI' },
    { svg: 'MX', code: 'MEX' },
    { svg: 'MZ', code: 'MOZ' },
    { svg: 'NA', code: 'NAM' },
    { svg: 'NE', code: 'NER' },
    { svg: 'New Caledonia', code: 'NEC' },
    { svg: 'New Zealand', code: 'NZL' },
    { svg: 'NG', code: 'NGA' },
    { svg: 'NI', code: 'NIC' },
    { svg: 'NL', code: 'NLD' },
    { svg: 'Northern Mariana Islands', code: 'NOM' },
    { svg: 'Norway', code: 'NOR' },
    { svg: 'NP', code: 'NPL' },
    { svg: 'NR', code: 'NRU' },
    { svg: 'Oman', code: 'OMN' },
    { svg: 'PA', code: 'PAN' },
    { svg: 'Papua New Guinea', code: 'PNG' },
    { svg: 'PE', code: 'PER' },
    { svg: 'Philippines', code: 'PHL' },
    { svg: 'PK', code: 'PAK' },
    { svg: 'PL', code: 'POL' },
    { svg: 'PS', code: 'PSE' },
    { svg: 'PT', code: 'PRT' },
    { svg: 'Puerto Rico', code: 'PR' },
    { svg: 'PW', code: 'PLW' },
    { svg: 'PY', code: 'PRY' },
    { svg: 'QA', code: 'QAT' },
    { svg: 'RE', code: 'RE' },
    { svg: 'RO', code: 'ROU' },
    { svg: 'RS', code: 'SRB' },
    { svg: 'Russian Federation', code: 'RUS' },
    { svg: 'RW', code: 'RWA' },
    { svg: 'SA', code: 'SAU' },
    { svg: 'Saint Kitts and Nevis', code: 'KNA' },
    { svg: 'Samoa', code: 'WSM' },
    { svg: 'São Tomé and Principe', code: 'STP' },
    { svg: 'SD', code: 'SDN' },
    { svg: 'SE', code: 'SWE' },
    { svg: 'Seychelles', code: 'SYC' },
    { svg: 'SI', code: 'SVN' },
    { svg: 'SK', code: 'SVK' },
    { svg: 'SL', code: 'SLE' },
    { svg: 'SN', code: 'SEN' },
    { svg: 'SO', code: 'SOM' },
    { svg: 'Solomon Islands', code: 'SLB' },
    { svg: 'SR', code: 'SUR' },
    { svg: 'SS', code: 'SSD' },
    { svg: 'SV', code: 'SLV' },
    { svg: 'SX', code: 'SX' },
    { svg: 'SY', code: 'SYR' },
    { svg: 'SZ', code: 'SWZ' },
    { svg: 'TD', code: 'TCD' },
    { svg: 'TG', code: 'TGO' },
    { svg: 'TH', code: 'THA' },
    { svg: 'TJ', code: 'TJK' },
    { svg: 'TL', code: 'TLS' },
    { svg: 'TM', code: 'TKM' },
    { svg: 'TN', code: 'TUN' },
    { svg: 'Tonga', code: 'TON' },
    { svg: 'Trinidad and Tobago', code: 'TTO' },
    { svg: 'Turkey', code: 'TUR' },
    { svg: 'Turks and Caicos Islands', code: 'TAC' },
    { svg: 'TV', code: 'TUV' },
    { svg: 'TW', code: '' },
    { svg: 'TZ', code: 'TZA' },
    { svg: 'UA', code: 'UKR' },
    { svg: 'UG', code: 'UGA' },
    { svg: 'United Kingdom', code: 'GBR' },
    { svg: 'United States', code: 'USA' },
    { svg: 'United States Virgin Islands', code: 'USV' },
    { svg: 'UY', code: 'URY' },
    { svg: 'UZ', code: 'UZB' },
    { svg: 'Vanuatu', code: 'VUT' },
    { svg: 'VC', code: 'VCT' },
    { svg: 'VE', code: 'VEN' },
    { svg: 'VG', code: 'VG' },
    { svg: 'VN', code: 'VNM' },
    { svg: 'XK', code: 'XK' },
    { svg: 'YE', code: 'YEM' },
    { svg: 'YT', code: 'MYT' },
    { svg: 'ZA', code: 'ZAF' },
    { svg: 'ZM', code: 'ZMB' },
    { svg: 'ZW', code: 'ZWE' },

]

export const buildRegionIndex = (svgText: string) => {
    const paths = [...svgText.matchAll(/<path[^>]*>/g)].map(match => match[0])
    const regionByKey = new Map<string, string>()

    paths.forEach(pathTag => {
        const id = pathTag.match(/id="([^"]+)"/)?.[1]
        const name = pathTag.match(/name="([^"]+)"/)?.[1]
        const cls = pathTag.match(/class="([^"]+)"/)?.[1]
        const key = id || cls
        if (!key) return

        const displayName = name || cls || id || key
        if (!regionByKey.has(key)) regionByKey.set(key, displayName)
    })

    return { regionByKey }
}

export const buildCountryRegionMap = (
    countries: CountryData[],
    regionByKey: Map<string, string>,
) => {
    const countryByCode = new Map(countries.map(country => [country.code, country]))
    const countryByRegion = new Map<string, CountryData>()
    const regionByCountry = new Map<string, string>()

    SVG_CODE_MAP.forEach(({ svg, code }) => {
        if (!code || !regionByKey.has(svg)) return
        const country = countryByCode.get(code)
        if (!country) return
        countryByRegion.set(svg, country)
        regionByCountry.set(code, svg)
    })

    return { countryByRegion, regionByCountry }
}
