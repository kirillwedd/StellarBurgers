import styles from './Entry.module.scss';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUserAction } from '../../../services/action/thunk/UserAction';
import { useAppDispatch } from '../../../services/hooks';

export function Entry() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch =useAppDispatch();
    const userData = { email, password };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        dispatch(loginUserAction(userData, navigate));
    };

    return (
        <section className="container">
            <article className={styles.containerEdit}>
                <label className={`${styles.labelEntry} text_type_main-medium`}>Вход</label>
                <form onSubmit={handleSubmit}>
                    <EmailInput extraClass="mt-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput extraClass="mt-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className={`mt-6`}>
                        <Button htmlType='submit'>Войти</Button>
                    </div>
                </form>
            </article>

            <article className={`${styles.additionalActions} text_type_main-default mt-20`}>
                <div className={styles.registration}>
                    <span>Вы - новый пользователь? </span>
                    <Link to={'/register'}>Зарегистрироваться</Link>
                </div>
                <div className={`${styles.forgotPassword} mt-4`}>
                    <span>Забыли пароль? </span>
                    <Link to={"/forgot-password"}>Восстановить пароль</Link>
                </div>
            </article>
        </section>
    );
}