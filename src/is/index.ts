const toStr = Object.prototype.toString;

export enum TypeToStr {
    Arguments = "[object Arguments]",
    Object = "[object Object]",
    Symbol = "[object Symbol]"
}

export function isArguments (arg): boolean {
    return toStr.call(arg) === TypeToStr.Arguments;
};

export function isObject (arg): boolean {
    return toStr.call(arg) === TypeToStr.Arguments;
};

export const isSymbol = (arg: any = ""): boolean => {
    return toStr.call(arg) === TypeToStr.Symbol;
};