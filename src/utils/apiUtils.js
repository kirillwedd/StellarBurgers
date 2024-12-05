function checkResponse(res) {
    if (!res.ok) {
        throw new Error('Ошибка сети: ' + res.statusText);
    }
    return res.json();
}

export async function request(url, options) {
    
    const res = await fetch(url, options);
    return checkResponse(res);
  }