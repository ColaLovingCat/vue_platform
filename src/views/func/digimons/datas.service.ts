import * as xlsx from '@/commons/utils/xlsx'

export const LEVEL_ORDER = [
    '幼年期Ⅰ',
    '幼年期I',
    '幼年期1',
    '幼年期Ⅱ',
    '幼年期II',
    '幼年期2',
    '成长期',
    '成熟期',
    '完全体',
    '究极体',
    '装甲体',
    '混合体',
]

export const LEVEL_EN: Record<string, string> = {
    '幼年期Ⅰ': 'Baby I Digimon',
    '幼年期I': 'Baby I Digimon',
    '幼年期1': 'Baby I Digimon',
    '幼年期Ⅱ': 'Baby II Digimon',
    '幼年期II': 'Baby II Digimon',
    '幼年期2': 'Baby II Digimon',
    '成长期': 'Child Digimon',
    '成熟期': 'Adult Digimon',
    '完全体': 'Perfect Digimon',
    '究极体': 'Ultimate Digimon',
    '装甲体': 'Armor Digimon',
    '混合体': 'Hybrid Digimon',
}

export const getLevelEn = (level: string) => LEVEL_EN[level] || `${level || ''} Digimon`.trim()

const uniqueSorted = (list: any[], key: string, order: string[] = []) => {
    const values = [...new Set(list.map((item: any) => item[key]).filter((v: any) => v != null && v !== ''))]
    return values.sort((a: string, b: string) => {
        const ia = order.indexOf(a)
        const ib = order.indexOf(b)
        if (ia !== -1 || ib !== -1) {
            return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
        }
        return String(a).localeCompare(String(b), 'zh')
    })
}

export const getDB = async () => {
    const res: any = await xlsx.readExcel('/docs/datas/digimon.xlsx')
    const items = [...(res.items || res.Sheet1 || [])].sort((a: any, b: any) => Number(a.no) - Number(b.no))

    return {
        items,
        levels: uniqueSorted(items, 'level', LEVEL_ORDER),
        types: uniqueSorted(items, 'type'),
        props: uniqueSorted(items, 'prop'),
    }
}
