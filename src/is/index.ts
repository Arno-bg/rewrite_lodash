const toStr = Object.prototype.toString;

export enum TypeToStr {
    Arguments = "[object Arguments]"
}

function isArguments (arg): boolean {
    return toStr.call(arg) === TypeToStr.Arguments;
};

export {
    isArguments
}