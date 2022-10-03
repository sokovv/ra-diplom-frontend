import { Link } from "react-router-dom";

export default function Danger() {
    return (
        <div class="n-danger">
        <p>"Запрос Прерван! DANGER"</p>
        <Link to="/">Вернуться в главное меню!</Link>
    </div>
    );
  }
  