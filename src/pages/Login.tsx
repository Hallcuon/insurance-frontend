import { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState<{ message: string, type: 'success' | 'danger' } | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await API.post('token/', { username, password })
      localStorage.setItem('access', response.data.access)
      localStorage.setItem('refresh', response.data.refresh)
      setAlert({ message: 'Успішний вхід!', type: 'success' })
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (error) {
      setAlert({ message: 'Невірний логін або пароль', type: 'danger' })
      console.error(error)
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Вхід</h2>
      {alert && <AlertMessage {...alert} onClose={() => setAlert(null)} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Логін</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Увійти</button>
      </form>
    </div>
  )
}
