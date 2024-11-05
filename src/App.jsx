import './App.css'
import { AppHeader } from './components/header/AppHeader';
import { BurgerConstructor } from './components/main/burger-ingredients/burger-constructor/BurgerConstructor';
import { BurgerIngredients } from './components/main/burger-ingredients/BurgerIngredients';
import { useState, useEffect } from 'react';


const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buns=ingredients.filter(ingredient=> ingredient.type==="bun")
  const meat=ingredients.filter(ingredient=> ingredient.type==="main")
  const sauce=ingredients.filter(ingredient=> ingredient.type==="sauce")

  const [modalContent, setModalContent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Ошибка сети: ' + response.statusText);
        }
        const data = await response.json();
        setIngredients(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);




  return (
    <>
      <AppHeader/>
 
        <main className="main-burger">
        {loading 
        ? <div>Загрузка...</div> 
        : error 
          ? <div>Ошибка: {error}</div> 
          : (
            <>
              <BurgerIngredients bunArr={buns} meatArr={meat} sauceArr={sauce} onOpenModal={handleOpenModal}/>
              <BurgerConstructor ingredientsConstructor={ingredients} onOpenModel={handleOpenModal}/>
       
            </>
          )
      }
        </main>
    </>
  )
}

export default App
