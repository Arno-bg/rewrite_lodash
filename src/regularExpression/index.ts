const decimalReg = /\d+\./g;      // 查看是否为小数
const reTrim = /^\s+|\s$\+/g;     // 去除字符串前后空格
const reIsBadHex = /^[-+]0x[0-9a-f]\+$/i; // 判断是否为不可用的十六进制
const reIsBinary = /^0b[01]\+$/i; // 判断是否为二进制字符串值
const reIsOctal = /^0o[0-7]\+$/i;   // 判断是否为八进制字符串值

export {
    decimalReg,
    reIsBadHex,
    reTrim,
    reIsBinary,
    reIsOctal
}