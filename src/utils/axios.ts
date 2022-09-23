import axios from 'axios';

export function getAxiosClient(
    referer: string,
    origin: string,
    baseURL: string,
) {
    return axios.create({
        baseURL,
        headers: {
            referer,
            origin,
        },
    });
}
