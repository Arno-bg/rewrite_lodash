import { isObject } from "../is";
import { toNumber } from "../toNumber";
import { now } from "../now";

export type TCallBack = (...rest) => any;
export interface IOptions {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean
};

var nativeMax = Math.max,
    nativeMin = Math.min;

function debounce(callback: TCallBack, wait: number, options?) {
    if (typeof callback !== "function") {
        throw new Error("The callback must be a function!");
    }

    var maxing: boolean,
        maxWait: number,
        lastCallTime: number,
        lastInvokeTime: number,
        lastArg: IArguments,
        lastThis: any,
        timeId: number,
        result: any,
        trailing: boolean,
        leading: boolean
        ;

    wait = toNumber(wait) || 0;

    if (isObject(options)) {
        maxing = "maxWait" in options;
        maxWait = maxing ? toNumber(options.maxWait) : maxWait;
        leading = !!options.leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
    }

    function remainingWait(time: number): number {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;

        return maxing
            ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
    };

    function shouldInvoke(time: number): boolean {
        var timeSinceCallTime = time - lastCallTime,
            timeSinceInvokeTime = time - lastInvokeTime;

        return lastCallTime === undefined || timeSinceCallTime >= wait || timeSinceCallTime < 0 || (maxing && timeSinceInvokeTime >= maxWait)
    };

    function leadingEdge(time: number): any {
        lastInvokeTime = time;
        timeId = setTimeout(timeExpired, wait);
        return leading ? invokeFunc(time) : result;
    };

    function timeExpired() {
        var time = now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }

        timeId = setTimeout(timeExpired, remainingWait(time));
    };

    function trailingEdge(time) {
        timeId = undefined;
        if (trailing && lastArg) {
            return invokeFunc(time);
        }

        lastArg = lastThis = undefined;
        return result;
    };

    function invokeFunc(time) {
        var args = lastArg,
            _this = lastThis;

        lastArg = lastThis = undefined;
        lastInvokeTime = time;

        result = callback.apply(_this, args);
        return result;
    };

    function cancel() {
        if (timeId !== undefined) {
            clearTimeout(timeId);
        }
        lastInvokeTime = 0;
        lastArg = lastCallTime = lastThis = timeId = undefined;
    }

    function flush() {
        return timeId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArg = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timeId === undefined) {
                return leadingEdge(lastCallTime);
            }

            if (maxing) {
                timeId = setTimeout(timeExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }

        if (timeId === undefined) {
            timeId = setTimeout(timeExpired, wait);
        }
        return result;
    };

    debounced.flush = flush;
    debounced.cancel = cancel;
    return debounced;
};

export {
    debounce
}