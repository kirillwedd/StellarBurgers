interface RequestOptions {
    method?: string;
    headers?: HeadersInit;
    body?: string | FormData | URLSearchParams | null;
}

async function checkResponse(res: Response): Promise<any> {
    if (!res.ok) {
        throw new Error('Ошибка сети: ' + res.statusText);
    }
    return res.json();
}

export async function request(url: string, options?: RequestOptions): Promise<any> {
    const res = await fetch(url, options);
    return checkResponse(res);
}