import { FORGOT_PASSWORD, LOGIN_SUCCESS, LOGOUT } from "../action/user";
import { initialState, userReducer } from "./user";

describe('userReducer', () => {
    it('должен возвращать начальное состояние', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle FORGOT_PASSWORD", () => {
        const action = {
            type: FORGOT_PASSWORD,
        };
        const expectedState = {
            ...initialState,
            isForgotPassword: true,
        };

        const newState = userReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    it("should handle LOGIN_SUCCESS", () => {
        const action = {
            type: LOGIN_SUCCESS,
        };
        const expectedState = {
            ...initialState,
            isLoggedIn: true,
        };

        const newState = userReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    it("should handle LOGOUT", () => {
        const action = {
            type: LOGOUT,
        };
        const expectedState = {
            ...initialState,
            isLoggedIn: false,
        };

        const newState = userReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    
});