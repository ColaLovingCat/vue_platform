import * as xlsx from '@/commons/utils/xlsx'
import * as extend from '@/commons/utils/extends'

export const getDB = async () => {
    let res: any = await xlsx.readExcel('/docs/datas/pokes.xlsx')
    const { pokes, shapes, gens, areas } = res

    const pokesMap: any = pokes.map((item: any) => ({
        ...item,
        shapes: [{ ...item, shapeCode: 'default' }]
    }))

    shapes.map((item: any) => {
        let temp = pokesMap.find((a: any) => a.no == item.no)
        if (temp) {
            temp.shapes.push(item)
        }
    })

    const groupedGens: any = extend.ExArray.group(gens, (a: any) => a.area).map((a: any) => {
        const area = areas.find((b: any) => a.name == b.name)
        console.log('Testing', a,area)
        if (area) return { ...a, areaCode: area.areaCode } 
        else return a
    })

    return {
        ...res,
        pokes: pokesMap,
        gens: groupedGens,
    }
}