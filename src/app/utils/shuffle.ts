/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * @source http://stackoverflow.com/a/12646864
 *
 * @param {Array<any>} array
 * @returns {Array<any>}
 */
export default function shuffle(array: Array<any>): Array<any> {
    const newArray = array.concat([]);
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}
