import './App.css';
import { AppHeader } from './components/header/AppHeader';
import { BurgerConstructor } from './components/main/burger-ingredients/burger-constructor/BurgerConstructor';
import { BurgerIngredients } from './components/main/burger-ingredients/BurgerIngredients';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setIngredients, setLoading } from './services/action/burgerIngredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchIngredients } from './services/action/thunk/ingredientsActions';
import styles from './components/main/burger-ingredients/BurgerIngredients.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Registration } from './components/main/pages/Registration';
import { PasswordRecovery } from './components/main/pages/PasswordRecovery';
import { Profile } from './components/main/pages/Profile';
import { MainPage } from './components/main/pages/MainPage';
import { ResetPassword } from './components/main/pages/ResetPassword';
import { useNavigate } from 'react-router-dom'; 
import { Entry } from './components/main/pages/entry';
import { ProtectedRouteElement } from './components/protected/protectedRouteElement';
import { IngredientsDetails } from './components/modal/detail/IngredientsDetails';

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.burgerIngredients);
  const isForgotPassword = useSelector((state) => state.users.isForgotPassword)
 

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('isAuthorized', 'false');
}, []);

  return (
    <>
      <AppHeader />
      <main className={styles.mainBurger}>
        <Routes>
          <Route path="/" element={
            loading ? (
              <div>Загрузка...</div>
            ) : error ? (
              <div>Ошибка: {error}</div>
            ) : (
              <DndProvider backend={HTML5Backend}>
                <MainPage/>
              </DndProvider>
            )
          } />
          <Route path="/login" element={<ProtectedRouteElement isProtected={false} children={<Entry />}/>} />
          <Route path="/register" element={<ProtectedRouteElement isProtected={false} children={<Registration/>}/>} />
          <Route path="/forgot-password" element={<ProtectedRouteElement isProtected={false} children={<PasswordRecovery/>}/>} />
          <Route path="/ingredients/:_id" element={<IngredientsDetails/>}/>
          <Route path="/reset-password" element={<ProtectedRouteElement isProtected={false}>
           {isForgotPassword ? <ResetPassword /> : <Navigate to="/forgot-password" replace />}
            </ProtectedRouteElement>} />
          <Route path="/profile/*" element={<ProtectedRouteElement isProtected={true} children={<Profile/>}/>} />
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;