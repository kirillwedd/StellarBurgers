import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../Modal";
import { FeedBurger } from "../../main/pages/FeedBurger";

export function FeedModalRoute(){

    const { number } = useParams(); // Извлечение параметра number
    const navigate = useNavigate(); // Получаем функцию для навигации
    
    
    return (
        <Modal modalTitle={`#${number}`} onClose={() => navigate(-1)}>
            <FeedBurger hidden={true} />
        </Modal>
    );

}