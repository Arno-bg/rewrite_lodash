import { isArray, isObject, isString } from "../is";
import warning from "../warning";

type ClassNamesArg = string | string[] | { [key: string]: any } | undefined | null | boolean;

const cs = (...args: ClassNamesArg[]): string => {
    const length = args.length;
    let classNames: string[] = [];

    for (let i = 0; i < length; i++) {
        const x = args[i];

        if (!x) {
            continue;
        }

        if (isString(x)) {
            classNames.push(x);
        } else if (isArray(x)) {
            classNames = classNames.concat(x);
        } else if (isObject(x)) {
            // eslint-disable-next-line
            Object.keys(x).forEach(k => {
                if (x[k]) {
                    classNames.push(k);
                }
            })
        } else {
            warning(true, "arguments must be one of string/array/object");
        }
    }
    return [...new Set(classNames)].join(' ');
};

export default cs;