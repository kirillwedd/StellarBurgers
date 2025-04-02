

describe('Конструктор бургера', () => {
    const testUrl = 'http://localhost:5173';
    const burgerItemSelector = "[data-testid=burger-item]"; 
    const dropContainerSelector = "[data-testid=drop-container]";
    const constructorContainerSelector = '[data-testid=constructor-container]';
    const modalSelector = '[data-testid=modal]';
    const modalTitleSelector = '[data-testid=modal-title]';
    const closeButtonSelector = '[data-testid=close-button]';
    const modalOverlaySelector = '[data-testid=modal-overlay]';

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
        cy.visit(testUrl);
    });


    it('должен перетаскивать ингредиенты в конструктор', () => {
        cy.get(burgerItemSelector).contains("Краторная булка N-200i").trigger('dragstart');
        cy.get(dropContainerSelector).trigger('drop');

        // Проверяем, что ингредиент появился в конструкторе
        cy.get(constructorContainerSelector).contains('Краторная булка N-200i').should('exist');
    });

    it('должен открывать модалку при клике на ингредиент', () => {
        cy.get(burgerItemSelector).contains("Краторная булка N-200i").click();
        cy.get(modalSelector).should('be.visible');
        cy.get(modalTitleSelector).contains('Краторная булка N-200i').should('exist');
    });

    it('должен закрывать модалку при клике на кнопку закрытия', () => {
        cy.get(burgerItemSelector).contains("Краторная булка N-200i").click();
        cy.get(modalSelector).should('be.visible');
        cy.get(closeButtonSelector).click();
        cy.get(modalSelector).should('not.exist');
    });

    it('должен закрывать модалку при клике на оверлей', () => {
        cy.get(burgerItemSelector).contains("Краторная булка N-200i").click();
        cy.get(modalOverlaySelector).should('be.visible');

        cy.get(modalOverlaySelector).then(($overlay) => {
            const overlayWidth = $overlay.width();
            const overlayHeight = $overlay.height();
            const offsetX = overlayWidth * 0.1; // 10% от ширины
            const offsetY = overlayHeight * 0; // 0% от высоты

            cy.wrap($overlay).click(offsetX, offsetY);
        });

        cy.get(modalOverlaySelector).should('not.exist');
    });

  

  
});