import axios from 'axios';
import qs from 'fast-querystring';

export default function useAxiosClient(baseURL: string) {
    return axios.create({
        baseURL,
        headers: {
            'content-type': 'application/json',
        },
        paramsSerializer: (params) => qs.stringify(params),
    });
}
