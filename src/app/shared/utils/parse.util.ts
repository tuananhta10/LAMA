export function parseArrayObject(arr: any, key:any):string{
    let ret = ''
    if( Array.isArray(arr)){
        ret = arr[0][key];
    }
    return ret;
}