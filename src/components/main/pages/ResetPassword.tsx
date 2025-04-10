import styles from './PasswordRecovery.module.scss';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../apiConfig';
import { request } from '../../../utils/apiUtils';

export function ResetPassword() {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await request(`${API_URL}/password-reset/reset`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ password, token: code })
            });
    
            if (response.success) {
                console.log('Пароль успешно изменен:', response.message);
                navigate('/login');
            } else {
                console.error('Ошибка:', response.message);
            }
        } catch (error) {
            
            if (error instanceof Error) {
               
                console.error('Ошибка при отправке запроса:', error.message);
            } else {
               
                console.error('Неизвестная ошибка:', error);
            }
        }
    };
    return (
        <section className="container">
            <label className={`${styles.labelPasswordRecovery} text_type_main-medium`}>Восстановление пароля</label>
            
            <article className={`${styles.containerNewPassword} mt-6`}>
                <form onSubmit={handleSubmit}>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Введите новый пароль' />
                    <Input type='text' value={code} placeholder={'Введите код из письма'} onChange={(e) => setCode(e.target.value)} extraClass='mt-6' />
                    <div className={`mt-6`}>
                        <Button htmlType='submit'>Сохранить</Button>
                    </div>
                </form>
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