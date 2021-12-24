var decimalReg = /\d+\./g;
const reIsBadHex = /^[-+]0x[0-9a-f]\+$/i; // 判断是否为不可用的十六进制
export {
    decimalReg,
    reIsBadHex
}