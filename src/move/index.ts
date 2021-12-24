export enum EDirection {
    Up,
    Down,
    End,
    Start
}; 

function move(array: any[], index: number, direction: EDirection = EDirection.Up) {
    if (direction === EDirection.Up) {
        array.splice(index - 1, 2, array[index], array[index - 1]);
    } else if (direction === EDirection.Down) {
        array.splice(index, 2, array[index + 1], array[index]);
    } else if (direction === EDirection.End) {
        const result = array.splice(index, 1);
        array.push(...result);
    } else if (direction === EDirection.Start) {
        const result = array.splice(index, 1);
        array.unshift(...result);
    };

    return array;
};

export {
    move
}