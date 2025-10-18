import * as XLSX from 'xlsx'

export const readExcel = async (path: string) => {
    try {
        // 动态导入Excel文件
        const response = await fetch(new URL(path, import.meta.url).href)
        const arrayBuffer = await response.arrayBuffer()
        // 解析Excel数据
        const data = new Uint8Array(arrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        // 返回数据
        let result: any = {}
        workbook.SheetNames.map((name: string) => {
            result[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name])
        })
        return result
    } catch (error) {
        console.error('读取Excel文件失败:', error)
    }
    return {}
}