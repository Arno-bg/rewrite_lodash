export type TCurryResult = (...rest) => any | any;

function currying(func: TCurryResult, ...args: any[]): TCurryResult {
    if (args.length >= func.length) {
        return func(...args);
    }

    return (...rest) => {
        return currying(func, ...args, ...rest)
    }
};

export {
    currying
}