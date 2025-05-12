import { useState, useEffect } from 'react';
import API from '../services/api';
import AlertMessage from '../components/AlertMessage';
import './Dashboard.css';
import { Link } from 'react-router-dom';

interface Policy {
  id: number;
  vehicle_number: string;
  insurance_type: string;
  start_date: string;
  end_date: string;
  price: string;
  status: string;
}

export default function Dashboard() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await API.get('policies/');
        setPolicies(response.data);
      } catch (err) {
        console.error('Помилка при завантаженні полісів', err);
      }
    };
    fetchPolicies();
  }, []);

  const handlePolicyAdded = () => {
    setShowForm(false);
    setAlert({ message: 'Поліс успішно створено!', type: 'success' });
    API.get('policies/').then((response) => setPolicies(response.data));
  };

  const handleDeletePolicy = async (id: number) => {
    try {
      await API.delete(`policies/${id}/`);
      setPolicies(policies.filter((policy) => policy.id !== id));
      setAlert({ message: 'Поліс успішно видалено!', type: 'success' });
    } catch (err) {
      setAlert({ message: 'Помилка при видаленні поліса', type: 'danger' });
      console.error('Помилка при видаленні поліса', err);
    }
  };

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <div className="dashboard-container">
          {alert && <AlertMessage {...alert} onClose={() => setAlert(null)} />}
          
          {/* Кнопка переходу на головну сторінку */}
          <Link to="/" className="home-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>На головну</span>
          </Link>

          <section className="policies-section">
            <div className="policies-header">
              <h2>Ваші страхові поліси</h2>
              <button className="btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Скасувати' : 'Додати новий поліс'}
              </button>
            </div>
            
            {showForm ? (
              <AddPolicy onPolicyAdded={handlePolicyAdded} />
            ) : (
              <div className="policies-grid">
                {policies.length > 0 ? (
                  policies.map((policy) => (
                    <div key={policy.id} className="policy-card">
                      <div className="policy-card-body">
                        <h5>{policy.vehicle_number}</h5>
                        <p><strong>Тип:</strong> {policy.insurance_type}</p>
                        <p><strong>Ціна:</strong> {policy.price} грн</p>
                        <p><strong>Статус:</strong> {policy.status}</p>
                        <p><strong>Дати:</strong> {policy.start_date} - {policy.end_date}</p>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeletePolicy(policy.id)}
                        >
                          Видалити
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-policies">У вас ще немає полісів.</p>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 Автострахування. Всі права захищені.</p>
      </footer>
    </div>
  );
}

function AddPolicy({ onPolicyAdded }: { onPolicyAdded: () => void }) {
  const [formData, setFormData] = useState({
    vehicle_number: '',
    insurance_type: 'basic',
    start_date: '',
    end_date: '',
    price: '',
    status: 'active',
  });

  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('policies/', formData);
      setAlert({ message: 'Поліс успішно створено!', type: 'success' });
      setFormData({
        vehicle_number: '',
        insurance_type: 'basic',
        start_date: '',
        end_date: '',
        price: '',
        status: 'active',
      });
      onPolicyAdded();
    } catch (err) {
      setAlert({ message: 'Помилка при створенні поліса', type: 'danger' });
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-policy-form">
      {alert && <AlertMessage {...alert} onClose={() => setAlert(null)} />}
      <h5>Новий поліс</h5>
      <div className="form-group">
        <input
          name="vehicle_number"
          placeholder="Номер авто"
          value={formData.vehicle_number}
          onChange={handleChange}
          required
        />
        <select
          name="insurance_type"
          value={formData.insurance_type}
          onChange={handleChange}
        >
          <option value="basic">Basic</option>
          <option value="full">Full</option>
        </select>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Ціна"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Активний</option>
          <option value="expired">Протермінований</option>
        </select>
      </div>
      <button type="submit" className="btn">Додати поліс</button>
    </form>
  );
}