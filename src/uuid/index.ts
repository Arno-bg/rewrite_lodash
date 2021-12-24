import { decimalReg, reIsBadHex } from "../regularExpression"

export enum EUUID {
    ByDate,
    ByChar,
    ByDifficulty
};

function uuidByDate (length: number): string {
    return `${(Math.random() + "").replace(decimalReg, "")}${new Date().getTime()}`.substr(0, length)
};

function uuidByChar (length: number): string {
    let str = "";
    for (let uu_index = 0; uu_index < length; uu_index++) {
        let n1 = 96 + Math.floor(Math.random() * 24);
        let n2 = 96 + Math.floor(Math.random() * 24);
        let n3 = Math.floor(Math.random() * 9);
        if (n1 > n2) {
            str += String.fromCharCode(n1)
        } else {
            str += n3
        }
    }
    return str;
};

function uuidByDifficulty(length: number): string {
    let str = "";
    for (let uu_index = 0; uu_index < length; uu_index++) {
        let n1 = 96 + Math.floor(Math.random() * 24);
        let n2 = 96 + Math.floor(Math.random() * 24);
        let n3 = Math.floor(Math.random() * 100);
        let n4 = Math.floor(Math.random() * 9);
        if (n3 > 32 && n3 < 48) {
            str += String.fromCharCode(n3);
        } else if (n1 > n2) {
            str += String.fromCharCode(n1);
        } else {
            str += n4;
        }
    }
    return str.replace(/\s/, "_");
};
function uuid(type: EUUID = EUUID.ByDate, length: number = 30): string {
    switch (type) {
        case EUUID.ByDate:
            return uuidByDate(length);
        case EUUID.ByDate:
            return uuidByChar(length);
        case EUUID.ByDifficulty:
            return uuidByDifficulty(length);
    }
};

export {
    uuid,
    uuidByDate,
    uuidByChar,
    uuidByDifficulty
}