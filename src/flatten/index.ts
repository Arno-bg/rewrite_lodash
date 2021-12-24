import { isArguments } from "../is";
type TPredicate = (value: any) => boolean;

const spreadableSymbol = Symbol.isConcatSpreadable;
/*
    内置的Symbol.isConcatSpreadable符号
    用于配置某对象作为Array.prototype.concat()方法的参数时是否展开其数组元素。
*/

function isFlattenble(value) {
    return Array.isArray(value) || isArguments(value) || (value && value[spreadableSymbol])
};

function baseFlatten (array: any[], depth: number, predicate?: TPredicate, isStrict?: boolean, result?: any[]) {
    predicate || (predicate = isFlattenble);
    result || (result = []);

    if (array === null) {
        return result;
    }

    for (const value of array) {
        if (depth > 0 && predicate(array)) {
            if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
                result.push(value);
            }   
        } else if (!isStrict){
            result[result.length] = value;
        }
    }

    return result;
};

function flatten(array: any[], depth: number, predicate?: TPredicate) {
    const _len = array === null ? 0 : array.length;

    return _len ? baseFlatten(array, depth, predicate) : [];
};

export {
    flatten,
    baseFlatten,
    isFlattenble
}