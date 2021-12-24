import { reIsBadHex, reIsBinary, reIsOctal, reTrim } from "../regularExpression";
import { isObject, isSymbol } from "../is";

const toNumber = (value): number => {
    if (typeof value === "number") {
        return value;
    }

    if (isSymbol(value)) {
        return NaN;
    }

    if (isObject(value)) {
        let other = typeof value.valueOf === "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : value;
    }

    if (typeof value !== "string") {
        return value === 0 ? value : +value;
    }

    value = value.replace(reTrim, "");
    const isBinary = reIsBinary.test(value);

    return (isBinary || reIsOctal.test(value))  
    ? parseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NaN : +value);
};

export {
    toNumber
};