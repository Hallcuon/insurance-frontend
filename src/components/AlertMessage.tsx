interface AlertProps {
    message: string
    type: 'success' | 'danger'
    onClose: () => void
  }
  
  export default function AlertMessage({ message, type, onClose }: AlertProps) {
    return (
      <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
        {message}
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
    )
  }
  