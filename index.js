import { flatten, baseFlatten, isFlattenble } from "./src/flatten";
import { isArguments } from "./src/is";
import { uuid, uuidByDate, uuidByChar, uuidByDifficulty } from "./src/uuid";
import { move } from "./src/move";
import { toNumber } from "./src/toNumber";
import { debounce } from "./src/debounce";
import { now } from "./src/now";

export {
    flatten, 
    baseFlatten, 
    isFlattenble,
    isArguments,
    uuid, 
    uuidByDate, 
    uuidByChar, 
    uuidByDifficulty,
    move,
    toNumber,
    debounce,
    now
}