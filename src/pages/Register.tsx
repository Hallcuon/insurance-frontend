import { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage' 


export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    is_customer: true
  })
  const [alert, setAlert] = useState<{ message: string, type: 'success' | 'danger' } | null>(null)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await API.post('register/', formData)
      setAlert({ message: 'Успішна реєстрація!', type: 'success' })
      setTimeout(() => navigate('/login'), 1000)
    } catch (error) {
      setAlert({ message: 'Помилка реєстрації', type: 'danger' })
      console.error(error)
    }
  }


  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Реєстрація</h2>
      {alert && <AlertMessage {...alert} onClose={() => setAlert(null)} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Логін</label>
          <input type="text" name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Пароль</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" name="is_customer" className="form-check-input" checked={formData.is_customer} onChange={handleChange} />
          <label className="form-check-label">Я клієнт</label>
        </div>
        <button type="submit" className="btn btn-success w-100">Зареєструватися</button>
      </form>
    </div>
  )
}