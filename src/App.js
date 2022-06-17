import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from './components/Card'
import Drawer from './components/Drawer'
import Header from './components/Header'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)

  useEffect(() => {
    axios.get('/items').then(res => setItems(res.data))
    axios.get('/Cart').then(res => setCartItems(res.data))
  }, [])

  const onAddToCart = async obj => {
    await axios.post('/Cart', obj)
    const { data } = await axios.get('/Cart')
    setCartItems(data)
  }

  const onRemoveItem = id => {
    axios.delete(`/Cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onAddToFavorite = obj => {
    axios.post('/favorites', obj)
    setFavorites(prev => [...prev, obj])
  }

  const onChangeSearchInput = e => setSearchValue(e.target.value)

  return (
    <div className='wrapper clear'>
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <div className='content p-40'>
        <div className='d-flex align-center justify-between mb-40'>
          <h1>
            {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
          </h1>
          <div className='search-block d-flex'>
            <img src='/img/search.svg' alt='Search' />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className='clear cu-p'
                src='/img/btn-remove.svg'
                alt='Clear'
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder='Поиск...'
            />
          </div>
        </div>

        <div className='d-flex flex-wrap'>
          {items
            .filter(item =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map(item => (
              <Card
                key={item.title}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={obj => onAddToFavorite(obj)}
                onPlus={obj => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
export default App
