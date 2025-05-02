import { useState } from 'react'
import API from '../services/api'
import AlertMessage from  '../components/AlertMessage' 


interface Props {
  onPolicyAdded: () => void
}

export default function AddPolicy({ onPolicyAdded }: Props) {
  const [formData, setFormData] = useState({
    vehicle_number: '',
    insurance_type: 'basic',
    start_date: '',
    end_date: '',
    price: '',
    status: 'active',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await API.post('policies/', formData)
      alert('Поліс створено!')
      setFormData({
        vehicle_number: '',
        insurance_type: 'basic',
        start_date: '',
        end_date: '',
        price: '',
        status: 'active',
      })
      onPolicyAdded()
    } catch (err) {
      alert('Помилка при створенні поліса')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5 className="mb-3">Новий поліс</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <input name="vehicle_number" placeholder="Номер авто" className="form-control" value={formData.vehicle_number} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <select name="insurance_type" className="form-select" value={formData.insurance_type} onChange={handleChange}>
            <option value="basic">Basic</option>
            <option value="full">Full</option>
          </select>
        </div>
        <div className="col-md-6">
          <input type="date" name="start_date" className="form-control" value={formData.start_date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="date" name="end_date" className="form-control" value={formData.end_date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input name="price" placeholder="Ціна" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
            <option value="active">Активний</option>
            <option value="expired">Протермінований</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Додати поліс</button>
    </form>
  )
}
