export function copyObj<T>(obj: T): T {
    let res: T = {} as T;
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            res[key] = copyObj(obj[key])
        }
        res[key] = obj[key]
    }
    return res
}
export function pxToNumber(px:string):number{
    return parseInt(px.slice(0,-2))
}