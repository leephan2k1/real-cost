export function rotateColors(arrayColors: Array<string>, currentIdx: number) {
    return arrayColors[currentIdx % arrayColors.length];
}
