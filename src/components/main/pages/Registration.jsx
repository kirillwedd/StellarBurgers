import styles from './Registration.module.scss';
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../../services/action/thunk/UserAction';

export function Registration() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
   

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { name, email, password };

        try {
            await dispatch(registerUserAction(userData, navigate)); 
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
        }
    };

    return (
        <section className="container">
            <article className={styles.containerRegistration}>
                <label className={`${styles.labelRegistration} text_type_main-medium`}>Регистрация</label>
                
                <Input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder='Имя' 
                    extraClass="mt-6" 
                />
                <EmailInput 
                    extraClass="mt-6" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <PasswordInput 
                    extraClass="mt-6" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <div className={`mt-6`}>
                    <Button htmlType='submit' onClick={handleSubmit}>Зарегистрироваться</Button>
                </div>
            </article>

            <article className={`${styles.additionalActions} text_type_main-default mt-20`}>
                <div className={styles.edit}>
                    <span>Уже зарегистрированы? </span>
                    <Link to={"/login"}>Войти</Link>
                </div>
            </article>
        </section>
    );
}