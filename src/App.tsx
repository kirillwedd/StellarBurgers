import './App.css';
import { AppHeader } from './components/header/AppHeader';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { loginRequest } from './services/action/user';
import {Modal} from './components/modal/Modal';  
import { Entry } from './components/main/pages/Entry';
import { ProtectedRouteElement } from './components/protected/ProtectedRouteElement';
import { RootState } from './services/store';
import { InitialAuth } from './services/action/thunk/UserAction';
import { useAppDispatch, useAppSelector } from './services/hooks';

function App() {
  
  const dispatch = useAppDispatch();
  const { loading, error} = useAppSelector((state) => state.burgerIngredients); 
  const isForgotPassword = useAppSelector((state) => state.users.isForgotPassword);
  const location = useLocation(); 
  const background = location.state && location.state.background; 
  const navigate= useNavigate();

 
  useEffect(() => {
    dispatch(InitialAuth)
    dispatch(fetchIngredients());
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
          <Route path="/profile/*" element={<ProtectedRouteElement isProtected={true}><Profile /></ProtectedRouteElement>} />
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>

        {background && (
          <Routes>
            <Route path="/ingredients/:_id" element={
              <Modal modalTitle={"Детали ингредиента"} onClose={() => navigate(-1)}>
                <IngredientsDetails  />
              </Modal>
            } />
          </Routes>
        )}

       
      </main>
    </>
  );
}

export default App;