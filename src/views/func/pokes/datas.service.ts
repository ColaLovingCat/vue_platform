import * as xlsx from '@/commons/utils/xlsx'
import * as extend from '@/commons/utils/extends'

export const getDB = async () => {
    let res: any = await xlsx.readExcel('/docs/datas/pokes.xlsx')
    const { pokes, shapes, gens, natures, types } = res
    shapes.map((item: any) => {
        let temp = pokes.find((a: any) => a.no == item.no)
        if (temp) {
            if (temp.shapes) {
                temp.shapes.push(item)
            } else {
                temp.shapes = [item]
            }
        }
    })
    const groupedGens: any = extend.ExArray.group(gens, (a: any) => a.area)

    return {
        pokes,
        shapes,
        gens: groupedGens,
        natures,
        types
    }
}