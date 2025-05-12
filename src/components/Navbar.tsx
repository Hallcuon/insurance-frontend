import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Отримує поточний маршрут
  const isLoggedIn = !!localStorage.getItem('access'); // Перевірка авторизації

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  // Сторінки, на яких не потрібно показувати Navbar
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    !hideNavbar && ( // Приховуємо Navbar на сторінках логіну та реєстрації
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
        <div className="container-fluid">
          {/* Ліва частина */}
          {isLoggedIn && (
            <Link className="navbar-brand" to="/dashboard">Мої поліси</Link>
          )}

          {/* Права частина */}
          {isLoggedIn && (
            <div className="ms-auto">
              <button className="btn btn-outline-danger" onClick={handleLogout}>Вийти</button>
            </div>
          )}
        </div>
      </nav>
    )
  );
}