import axios from 'axios';
import qs from 'fast-querystring';

export function getAxiosClient(
    referer: string,
    origin: string,
    baseURL: string,
) {
    return axios.create({
        baseURL,
        paramsSerializer: (params) => qs.stringify(params),
        headers: {
            referer,
            origin,
        },
    });
}
