import * as xlsx from '@/commons/utils/xlsx'
import * as extend from '@/commons/utils/extends'

export const getDB = async () => {
    let res: any = await xlsx.readExcel('/docs/datas/pokes.xlsx')
    const { pokes, shapes, gens, natures, types } = res

    const pokesMap: any = pokes.map((item: any) => ({
        ...item,
        shapes: [item]
    }))

    shapes.map((item: any) => {
        let temp = pokesMap.find((a: any) => a.no == item.no)
        if (temp) {
            temp.shapes.push(item)
        }
    })
    
    const groupedGens: any = extend.ExArray.group(gens, (a: any) => a.area)

    return {
        pokes: pokesMap,
        shapes,
        gens: groupedGens,
        natures,
        types
    }
}