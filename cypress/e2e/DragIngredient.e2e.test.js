

describe('Конструктор бургера', () => {
  beforeEach(() => {
        cy.intercept("GET", "/api/auth/user", { fixture: "user.json" });

        cy.intercept("POST", "/api/orders", { fixture: "order.json" }).as("postOrder");

        const user = {
            user: {
                name: 'Кирюха',
                email: 'kirillwed23@mail.ru',
                password: 'kir2lavr10',
            },
            accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGVjMmUzZTM2N2RlMDAxZGFmNjVmMSIsImlhdCI6MTc0MzUxNjczMywiZXhwIjoxNzQzNTE3OTMzfQ.9Hk8Ui_lCMuvg9OgiJJK7PWgd6Jq_TDLB9Pp_gokxTQ',
            refreshToken: '3850bd89076fd8c688905f8fb3c25e01934adb553d050e47f8587b5349687ac58d27e77bc3dd38e7',
        };
 
        localStorage.setItem('users', JSON.stringify(user));

        

      
        // Открываем приложение перед началом тестов
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:5173');
    });


    it('должен перетаскивать ингредиенты в конструктор', () => {
        
        cy.get("[data-testid=burger-item]").contains("Краторная булка N-200i").trigger('dragstart');// Замените на селектор вашего ингредиента
        cy.get("[data-testid=drop-container]").trigger('drop'); // Замените на селектор контейнера конструктора
  
        // Проверяем, что ингредиент появился в конструкторе
        cy.get('[data-testid=constructor-container]').contains('Краторная булка N-200i').should('exist'); // Замените на фактическое название
    });


    it('должен открывать модалку при клике на ингредиент', () => {
        // Находим ингредиент по его названию и кликаем на него
        cy.get("[data-testid=burger-item]").contains("Краторная булка N-200i").click();

        // Проверяем, что модальное окно открывается
        cy.get('[data-testid=modal]').should('be.visible'); // Проверьте селектор модального окна, замените на нужный

        // Дальше можем проверить наличие деталей ингредиента
        cy.get('[data-testid=modal-title]').contains('Краторная булка N-200i').should('exist'); // Проверка на заголовок в модалке
        
    });

    it('должен закрывать модалку при клике на кнопку закрытия', () => {
        // Открываем модалку
        cy.get("[data-testid=burger-item]").contains("Краторная булка N-200i").click();
        cy.get('[data-testid=modal]').should('be.visible');

        // Закрываем модалку
        cy.get('[data-testid=close-button]').click(); // Проверяем селектор кнопки закрытия модалки

        // Проверяем, что модальное окно закрылось
        cy.get('[data-testid=modal]').should('not.exist');
    });

    it('должен закрывать модалку при клике на оверлей', () => {
        cy.get("[data-testid=burger-item]").contains("Краторная булка N-200i").click();
        
        // Проверяем, что модалка открыта
        cy.get('[data-testid=modal-overlay]').should('be.visible');
    
        // Кликаем на оверлей
        cy.get('[data-testid=modal-overlay]').then(($overlay) => {
            const overlayWidth = $overlay.width(); // Получаем ширину оверлея
            const overlayHeight = $overlay.height(); // Получаем высоту оверлея
    
            // Рассчитываем смещение в пикселях (например, 10% ширины вправо)
            const offsetX = overlayWidth * 0.1; // 10% от ширины
            const offsetY = overlayHeight * 0; // 0% от высоты
    
            // Кликаем на оверлей с рассчитанным смещением
            cy.wrap($overlay).click(offsetX, offsetY); // Кликаем с offsetX и offsetY
        });
    
        // Проверяем, что модалка закрыта
        cy.get('[data-testid=modal-overlay]').should('not.exist');

       
    });

  

  
});