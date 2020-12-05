export function parseNumberString(numberString) {
    if (!numberString && numberString != 0) return null;

    numberString = numberString.toString().replace(/,/g, '');
    var result =  Number(numberString);
    return result;
}
