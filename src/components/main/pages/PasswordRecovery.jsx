import styles from './PasswordRecovery.module.scss';
import '../../../../node_modules/@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../apiConfig';
import { request } from '../../../utils/apiUtils';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../services/action/user';

export function PasswordRecovery() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); 
    const dispatch=useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await request(`${API_URL}/password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.success) {
                dispatch(forgotPassword())
                navigate('/reset-password');
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error("Ошибка при сбросе пароля:", error);
        }
    };

    return (
        <section className="container">
            <label className={`${styles.labelPasswordRecovery} text_type_main-medium`}>Восстановление пароля</label>

            <article className={`${styles.containerPasswordRecovery} mt-6`} >
                <EmailInput placeholder={'Укажите e-mail'} value={email} onChange={(e) => setEmail(e.target.value)} required />
                <div className={`mt-6`}>
                    {email && <Button htmlType='submit' onClick={handleSubmit}>Восстановить</Button>}
                </div>
            </article>

            <article className={`${styles.additionalActions} text_type_main-default mt-20`}>
                <div className={styles.edit}>
                    <span>Вспомнили пароль? </span>
                    <Link to={"/login"}>Войти</Link>
                </div>
            </article>
        </section>
    );
}