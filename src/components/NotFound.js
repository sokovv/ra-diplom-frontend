import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2 className="text-center">Страница не найдена</h2>
      <h4 className="text-center">
        <Link to="/">Вернуться в главное меню!</Link>
      </h4>
    </div>
  );
}
