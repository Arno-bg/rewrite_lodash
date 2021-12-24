export enum ETimeType {
    Second,
    Millisecond
};

// 返回当前时间的毫秒
const now = (type = ETimeType.Millisecond): number => {
    let now = Date.now();

    if (type === ETimeType.Second) now = Math.floor(now / 1000);

    return now;
};


export {
    now
};