export function ValueToPoint(value:object, index:number, total:number) {
    const x = 0
    //是将每一组数据都传进来进行处理
    const y = -value*0.8
    const angle=((Math.PI*2)/total)*index
    const cos=Math.cos(angle)
    const sin=Math.sin(angle)
    const tx = x * cos - y * sin + 100
    const ty = x * sin + y * cos + 100
    return{
        x:tx,
        y:ty
    }
//    返回一个坐标
}