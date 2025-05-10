export default function ShopTable({ 
  shops, 
  onDelete, 
  onEdit,
  sortConfig,
  requestSort 
}) {
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return ' ↔'
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'
  }
  return (
    <div className="table-container">
      <table className="shop-table">
        <thead>
          <tr>
            <th onClick={() => requestSort('name')}>
              Название {getSortIndicator('name')}
            </th>
            <th onClick={() => requestSort('category')}>
              Категория {getSortIndicator('category')}
            </th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {shops.map(shop => (
            <tr key={shop.id}>
              <td>{shop.name}</td>
              <td>
                <span className="category-badge">{shop.category}</span>
              </td>
              <td className="actions">
                <button 
                  className="edit-btn"
                  onClick={() => onEdit(shop)}
                  title="Редактировать"
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(shop.id)}
                  title="Удалить"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {shops.length === 0 && (
        <div className="empty-state">
          Магазинов пока нет. Добавьте первый!
        </div>
      )}
    </div>
  )
}