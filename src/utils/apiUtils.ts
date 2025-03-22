interface RequestOptions {
    method?: string;
    headers?: HeadersInit;
    body?: string | FormData | URLSearchParams | null;
}

async function checkResponse(response: Response): Promise<any> {
    if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.statusText);
    }
    return response.json();
}

export async function request(url: string, options?: RequestOptions): Promise<any> {
    const res = await fetch(url, options);
    return await checkResponse(res);
}