Cypress.on('uncaught:exception', (err, runnable) => {
    // Игнорируем разрешенные ошибки
    if (err.message.includes('Нет действительного токена')) {
        return false; // Игнорирует ошибку
    }
});