import './App.css';
import { AppHeader } from './components/header/AppHeader';
import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchIngredients } from './services/action/thunk/ingredientsActions';
import styles from './components/main/burger-ingredients/BurgerIngredients.module.scss';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Registration } from './components/main/pages/Registration';
import { PasswordRecovery } from './components/main/pages/PasswordRecovery';
import { Profile } from './components/main/pages/Profile';
import { MainPage } from './components/main/pages/MainPage';
import { ResetPassword } from './components/main/pages/ResetPassword';
import { useNavigate } from 'react-router-dom'; 
import { IngredientsDetails } from './components/modal/detail/IngredientsDetails';
import {Modal} from './components/modal/Modal';  
import { Entry } from './components/main/pages/Entry';
import { ProtectedRouteElement } from './components/protected/ProtectedRouteElement';
import { InitialAuth } from './services/action/thunk/UserAction';
import { useAppDispatch, useAppSelector } from './services/hooks';
import { Feed } from './components/main/pages/Feed';
import { FeedBurger } from './components/main/pages/FeedBurger';
import { useParams } from 'react-router-dom';
import { FeedModalRoute } from './components/modal/detail/FeedModalRoute';
import { ORDER_SOCKET_URL } from './apiConfig';
import { setOrders } from './services/action/ws';

function App() {
  
  const dispatch = useAppDispatch();
  const { loading, error} = useAppSelector((state) => state.burgerIngredients); 
  const isForgotPassword = useAppSelector((state) => state.users.isForgotPassword);
  const location = useLocation(); 
  const background = location.state && location.state.background; 
  const navigate= useNavigate();

 
  useEffect(() => {
    dispatch(InitialAuth());
    dispatch(fetchIngredients());
    
    const socket = new WebSocket(`${ORDER_SOCKET_URL}/all`);

    socket.onopen = () => {
        console.log('WebSocket подключен');
    };

    socket.onerror = (error) => {
        console.error('WebSocket ошибка:', error);
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.success && Array.isArray(data.orders)) {
           
            dispatch(setOrders(data.orders));
        }
    };

    return () => {
        socket.close();
    };
}, [dispatch]);


  
  return (
    <>
      <AppHeader />
      <main className={styles.mainBurger}>
        <Routes location={background || location}>
          <Route path="/" element={
            loading ? <div>Загрузка...</div> :
            error ? <div>Ошибка: {error}</div> :
            <DndProvider backend={HTML5Backend}>
              <MainPage  />
            </DndProvider>
          } />
          <Route path="/login" element={<ProtectedRouteElement isProtected={false}><Entry /></ProtectedRouteElement>} />
          <Route path="/register" element={<ProtectedRouteElement isProtected={false}><Registration /></ProtectedRouteElement>} />
          <Route path="/forgot-password" element={<ProtectedRouteElement isProtected={false}><PasswordRecovery /></ProtectedRouteElement>} />
          <Route path="/ingredients/:_id" element={<IngredientsDetails />} />
          <Route path="/reset-password" element={<ProtectedRouteElement isProtected={false}>{isForgotPassword ? <ResetPassword /> : <Navigate to="/forgot-password" replace />} </ProtectedRouteElement>} />
          <Route path="/profile" element={<ProtectedRouteElement isProtected={true}><Profile children="profile" /></ProtectedRouteElement>} />
          <Route path="/feed" element={<ProtectedRouteElement isProtected={false}><Feed/> </ProtectedRouteElement>}></Route>
          <Route path="/profile/orders" element={<ProtectedRouteElement isProtected={true}><Profile children="history"/> </ProtectedRouteElement>}></Route>
          <Route path="/feed/:number" element={<ProtectedRouteElement isProtected={false}><FeedBurger/> </ProtectedRouteElement>}></Route>
          
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>

        {background && (
          <Routes>
            <Route path="/ingredients/:_id" element={
              <Modal modalTitle={"Детали ингредиента"} onClose={() => navigate(-1)}>
                <IngredientsDetails  />
              </Modal>
            } />

            <Route path="/feed/:number" element={
             <FeedModalRoute/>
            }/>

            <Route path="/profile/orders/:number" element={
             <FeedModalRoute/>
            }/>




          </Routes>
        )}

          

       
      </main>
    </>
  );
}

export default App;