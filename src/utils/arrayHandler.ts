export function rotateColors(arrayColors: Array<string>, currentIdx: number) {
    return arrayColors[currentIdx % arrayColors.length];
}

export function handleSelectMultipleChannel(channels: Array<string>) {
    if (channels.length === 0 || channels.length === 2) return 'email-browser';

    if (channels.find((channel) => channel.toLocaleLowerCase() === 'email'))
        return 'email';
    else if (
        channels.find(
            (channel) => channel.toLocaleLowerCase() === 'trình duyệt',
        )
    )
        return 'browser';

    return '';
}
