export const API_URL: string = 'https://norma.nomoreparties.space/api';

export const ORDER_SOCKET_URL: string = 'wss://norma.nomoreparties.space/orders';

export const getCurrentTimestamp = (): number => new Date().getTime() / 1000;