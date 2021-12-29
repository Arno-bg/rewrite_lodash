const toStr = Object.prototype.toString;

export enum TypeToStr {
    Map = "[object Map]",
    Set = "[object Set]",
    Date = "[object Date]",
    Error = "[object Error]",
    Array = "[object Array]",
    Symbol = "[object Symbol]",
    Object = "[object Object]",
    Number = "[object Number]",
    RegExp = "[object RegExp]",
    String = "[object String]",
    Boolean = "[object Boolean]",
    Function = "[object Function]",
    Arguments = "[object Arguments]"
}

export function isFunction (arg): boolean {
    return toStr.call(arg) === TypeToStr.Function;
};

export function isRegExp (arg): boolean {
    return toStr.call(arg) === TypeToStr.RegExp;
};

export function isNumber (arg): boolean {
    return toStr.call(arg) === TypeToStr.Number;
};

export function isError (arg): boolean {
    return toStr.call(arg) === TypeToStr.Error;
};

export function isDate (arg): boolean {
    return toStr.call(arg) === TypeToStr.Date;
};

export function isBoolean (arg): boolean {
    return toStr.call(arg) === TypeToStr.Boolean;
};

export function isSet (arg): boolean {
    return toStr.call(arg) === TypeToStr.Set;
};

export function isArguments (arg): boolean {
    return toStr.call(arg) === TypeToStr.Arguments;
};

export function isObject (arg): boolean {
    return toStr.call(arg) === TypeToStr.Object;
};

export const isSymbol = (arg: any = ""): boolean => {
    return toStr.call(arg) === TypeToStr.Symbol;
};

export function isArray(obj: any): boolean {
    return toStr.call(obj) === TypeToStr.Array;
}

export function isString(obj: any): boolean {
    return toStr.call(obj) === TypeToStr.String;
};

export function isMap(obj: any): boolean {
    return toStr.call(obj) === TypeToStr.Map;
};

export function isDeepData (arg: any): boolean {
    isObject(arg) ||
    isSet(arg) ||
    isArray(arg) ||
    isMap(arg) ||
    isArguments(arg);
};