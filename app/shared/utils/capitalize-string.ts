/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str
 * @returns {string}
 */
export default function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}
