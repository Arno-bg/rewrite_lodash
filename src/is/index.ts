const toStr = Object.prototype.toString;

export enum TypeToStr {
    Arguments = "[object Arguments]",
    Object = "[object Object]",
    Symbol = "[object Symbol]",
    Array = "[object Array]",
    String = "[object String]"
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

export function isArray(obj: any): obj is any[] {
    return toStr.call(obj) === TypeToStr.Array;
}

export function isString(obj: any): obj is string {
    return toStr.call(obj) === TypeToStr.String;
};
