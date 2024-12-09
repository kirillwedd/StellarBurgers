import './App.css'
import { AppHeader } from './components/header/AppHeader';
import { BurgerConstructor } from './components/main/burger-ingredients/burger-constructor/BurgerConstructor';
import { BurgerIngredients } from './components/main/burger-ingredients/BurgerIngredients';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setIngredients, setLoading } from './services/action/burgerIngredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { API_URL } from './apiConfig';
import { request } from './utils/apiUtils';
import styles from './components/main/burger-ingredients/BurgerIngredients.module.scss'
import { fetchIngredients } from './services/action/thunk/ingredientsActions';

function App() {
  const dispatch = useDispatch();
  const { ingredients , loading, error } = useSelector((state) => state.burgerIngredients);

  const buns=ingredients.filter(ingredient=> ingredient.type==="bun")
  const meat=ingredients.filter(ingredient=> ingredient.type==="main")
  const sauce=ingredients.filter(ingredient=> ingredient.type==="sauce")

  const handleOpenModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  useEffect(() => {
   dispatch(fetchIngredients())
  }, [dispatch]);

  return (
    <>
      <AppHeader/>
 
        <main className={styles.mainBurger}>
        {loading 
        ? <div>Загрузка...</div> 
        : error 
          ? <div>Ошибка: {error}</div> 
          : (
            <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients bunArr={buns} meatArr={meat} sauceArr={sauce} onOpenModal={handleOpenModal}/>
              <BurgerConstructor />
            </DndProvider>
            </>
          )
      }
        </main>
    </>
  )
}

export default App
