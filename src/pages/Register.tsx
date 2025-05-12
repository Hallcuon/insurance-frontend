import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    is_customer: true,
  });
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('register/', formData);
      setAlert({ message: 'Успішна реєстрація!', type: 'success' });
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      setAlert({ message: 'Помилка реєстрації', type: 'danger' });
      console.error(error);
    }
  };

  return (
    <main className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Реєстрація</h2>
        {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>}
        <div className="form-group">
          <label>Логін</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            name="is_customer"
            checked={formData.is_customer}
            onChange={handleChange}
          />
          <label>Я клієнт</label>
        </div>
        <button type="submit" className="btn">Зареєструватися</button>
        <div className="login-link">
          <span>Вже маєте акаунт? </span>
          <Link to="/login">Логін</Link>
        </div>
      </form>
    </main>
  );
}