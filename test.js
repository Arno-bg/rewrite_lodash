import { isArray, isBoolean, isDate, isDeepData, isError, isMap, isNumber, isObject, isRegExp, isSet, isString, isSymbol } from "./src/is"

function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
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
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

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

function clone(target, map = new WeakMap()) {

    if (isFunction(target)) return cloneFunction(target);
    if (!isObject(target)) {
        return target;
    }

    let cloneTarget;
    cloneTarget = isDeepData(target) ? getInit(target, type) : cloneOtherType(target, true);

    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    if (isSet(target)) {
        target.forEach(value => {
            cloneTarget.add(clone(value,map));
        });
        return cloneTarget;
    }

    if (isMap(target)) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value,map));
        });
        return cloneTarget;
    }

    const keys = isArray(target) ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
}


const obj = {
    a: 1,
    b: {
        c: 2
    },
    d: [1, 2, 3]
};
obj.obj = obj;

const obj2 = clone(obj);
obj2.b.c = 5
// obj2.d.push(3)
console.log(obj, obj2)