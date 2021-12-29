import { isArray, isBoolean, isDate, isDeepData, isError, isFunction, isMap, isNumber,isObject, isRegExp, isSet, isString, isSymbol } from "../is"

function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
};

function initResult(origin) {
    const Ctor = origin.constructor;
    return new Ctor();
};

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case isBoolean(type):
        case isNumber(type):
        case isString(type):
        case isError(type):
        case isDate(type):
            return new Ctor(targe);
        case isRegExp(type):
            return cloneReg(targe);
        case isSymbol(type):
            return cloneSymbol(targe);
        default:
            return null;
    }
};

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

function cloneDeep(origin, result = new WeakMap()) {
    if (isFunction(origin)) return cloneFunction(origin);
    if (typeof origin !== "object") return origin;

    let tempResult = isDeepData(origin) ? initResult(origin) : cloneOtherType(origin, true);

    
    if (result.get(origin)) {
        return result.get(origin);
    }
    result.set(origin, tempResult);

    if (isSet(origin)) {
        origin.forEach(value => {
            tempResult.add(cloneDeep(value,result));
        });
        return tempResult;
    }

    if (isMap(origin)) {
        origin.forEach((value, key) => {
            tempResult.set(key, cloneDeep(value,result));
        });
        return tempResult;
    }

    const keys = isArray(origin) ? undefined : Object.keys(origin);
    forEach(keys || origin, (value, key) => {
        if (keys) {
            key = value;
        }
        tempResult[key] = cloneDeep(origin[key], result);
    });

    return tempResult;
};

export {
    cloneDeep,
    cloneSymbol,
    cloneReg,
    cloneFunction
}