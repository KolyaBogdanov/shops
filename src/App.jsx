import { useState, useEffect } from 'react'
import ShopTable from './components/ShopTable'
import AddShopModal from './components/AddShopModal'
import AddCategoryModal from './components/AddCategoryModal'
import './App.css'

function App() {
  // Состояние для магазов
  const [shops, setShops] = useState(() => {
    const saved = localStorage.getItem('shops')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Пятёрочка", category: "Супермаркет" },
      { id: 2, name: "Adidas", category: "Одежда" }
    ]
  })
  // Состояние для категорий
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories')
    return saved ? JSON.parse(saved) : ["Супермаркет", "Одежда"]
  })
  // Состояние для сортировки
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending'
  })
  // Состояние модальных окон
  const [isShopModalOpen, setShopModalOpen] = useState(false)
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false)
  const [editingShop, setEditingShop] = useState(null)
  // Сортировка магазов
  const sortedShops = [...shops].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })
  // Изменение сортировки
  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }
  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('shops', JSON.stringify(shops))
  }, [shops])
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])
  // Добавление магазина
  const addShop = (shop) => {
    setShops([...shops, { ...shop, id: Date.now() }])
  }
  // Обновление магазина
  const updateShop = (updatedShop) => {
    setShops(shops.map(shop => 
      shop.id === updatedShop.id ? updatedShop : shop
    ))
    setEditingShop(null)
  }
  // Добавление категории
  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category])
    }
  }
  // Удаление магазина
  const deleteShop = (id) => {
    setShops(shops.filter(shop => shop.id !== id))
  }
  return (
    <div className="app">
      <h1>🛍️ Каталог магазинов</h1>
      <div className="controls">
        <button 
          className="primary-btn"
          onClick={() => {
            setEditingShop(null)
            setShopModalOpen(true)
          }}
        >
          + Добавить магазин
        </button>
        <button 
          className="secondary-btn"
          onClick={() => setCategoryModalOpen(true)}
        >
          + Новая категория
        </button>
      </div>
      <ShopTable 
        shops={sortedShops} 
        onDelete={deleteShop}
        onEdit={setEditingShop}
        sortConfig={sortConfig}
        requestSort={requestSort}
      />
      <AddShopModal
        isOpen={isShopModalOpen || !!editingShop}
        onClose={() => {
          setShopModalOpen(false)
          setEditingShop(null)
        }}
        categories={categories}
        onAddShop={addShop}
        onUpdateShop={updateShop}
        onAddCategory={() => {
          setShopModalOpen(false)
          setCategoryModalOpen(true)
        }}
        editingShop={editingShop}
      />
      
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onAddCategory={addCategory}
      />
    </div>
  )
}
export default App