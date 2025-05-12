import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post('token/', formData);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      navigate('/dashboard');
    } catch (err) {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <main className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Логін</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          name="username"
          placeholder="Ім'я користувача"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Увійти</button>
        <div className="register-link">
          <span>Немає облікового запису? </span>
          <Link to="/register">Зареєструватися</Link>
        </div>
      </form>
    </main>
  );
}