export type Movie = {
    id: string,
    title: string,
    image: string,
    synopsis: string,
    rating: string,
    type: string,
    released: string,
    runtime: string,
    largeimage: string,
    unogsdate: string,
    imdbid: string,
    download: string
}

export function formatTime(str: string) {
    const [hoursStr, minStr] = str.split(/[hm]/)
    return `${hoursStr}h ${minStr}min`
}
