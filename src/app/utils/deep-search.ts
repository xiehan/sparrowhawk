/**
 * Yes, Lodash can do this, but I don't want to bring in another dependency for temporary code
 *
 * @param {any} obj
 * @param {string} key
 * @returns {any}
 */
export default function deepSearch(obj: any, key: string): any {
    let childObj = obj;
    for (let i = 0, path = key.split('/'), len = path.length; i < len; i++) {
        childObj = childObj[path[i]];
    }
    return childObj;
}
