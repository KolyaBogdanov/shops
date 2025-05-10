import { useState, useEffect } from 'react'

export default function AddShopModal({ 
  isOpen, 
  onClose, 
  categories, 
  onAddShop,
  onUpdateShop,
  onAddCategory,
  editingShop
}) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  useEffect(() => {
    if (editingShop) {
      setName(editingShop.name)
      setCategory(editingShop.category)
    } else {
      setName('')
      setCategory('')
    }
  }, [editingShop])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !category) return
    if (editingShop) {
      onUpdateShop({ ...editingShop, name, category })
    } else {
      onAddShop({ name, category })
    }
    onClose()
  }
  if (!isOpen) return null
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>{editingShop ? '✏️ Редактировать' : '➕ Добавить'} магазин</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название магазина</label>
            <input
              type="text"
              placeholder="Например: Zara"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Категория</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="text-btn" onClick={onAddCategory}>
              + Создать новую категорию
            </button>
            <div>
              <button type="button" className="outline-btn" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="primary-btn">
                {editingShop ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}