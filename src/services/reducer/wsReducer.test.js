import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "./types/wsActions";
import { initialState, wsReducer } from "./wsReducer";

describe('wsReducer', () => {
    it('должен возвращать начальное состояние', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        const action = { type: WS_CONNECTION_SUCCESS };
        const expectedState = {
          ...initialState,
          wsConnected: true,
          error: undefined,
        };
        
        const newState = wsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });

      it('should handle WS_CONNECTION_ERROR', () => {
        const error = new Event('error');
        const action = { type: WS_CONNECTION_ERROR, payload: error };
        const expectedState = {
          ...initialState,
          wsConnected: false,
          error: error,
        };
    
        const newState = wsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });

      it('should handle WS_CONNECTION_CLOSED', () => {
        const action = { type: WS_CONNECTION_CLOSED };
        const expectedState = {
          ...initialState,
          wsConnected: false,
          error: undefined,
        };
    
        const newState = wsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });

      it('should handle WS_GET_MESSAGE', () => {
        const mockPayload = {
          orders: [{ id: '123', name: 'test order' }],
          total: 10,
          totalToday: 5,
        };
        const action = { type: WS_GET_MESSAGE, payload: mockPayload };
        const expectedState = {
          ...initialState,
          orders: mockPayload.orders,
          total: mockPayload.total,
          totalToday: mockPayload.totalToday,
          error: undefined,
        };
    
        const newState = wsReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });
});