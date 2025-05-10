import { useState } from 'react'

export default function AddCategoryModal({ isOpen, onClose, onAddCategory }) {
  const [name, setName] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAddCategory(name)
    setName('')
    onClose()
  }
  if (!isOpen) return null
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>➕ Новая категория</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название категории</label>
            <input
              type="text"
              placeholder="Например: Электроника"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="outline-btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="primary-btn">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}