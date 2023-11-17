import config from '@/utils/api/config';

interface Response {
    secret: string;
    expiration: number;
    created: number;
}

export default async function req(params: {
    email: string;
    password: string;
}): Promise<Response> {
    const res = await fetch(config.baseAPI + '/auth/login', {
        method: 'post',
        body: JSON.stringify(params),
        ...config.config,
    });

    if (!res.ok) {
        if (res.status >= 400 && res.status <= 499) {
            throw await res.json();
        }
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}
