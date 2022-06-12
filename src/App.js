import { useState } from 'react'
import Card from './components/Card'
import Drawer from './components/Drawer'
import Header from './components/Header'

const arr = [
  { title: 'Name 1', price: 1, imageUrl: '/img/sneakers/1.jpg' },
  { title: 'Name 2', price: 2, imageUrl: '/img/sneakers/2.jpg' },
  { title: 'Name 3', price: 3, imageUrl: '/img/sneakers/3.jpg' },
  { title: 'Name 4', price: 4, imageUrl: '/img/sneakers/4.jpg' }
]

function App() {
  const [cartOpened, setCartOpened] = useState(true)

  return (
    <div className='wrapper clear'>
      {cartOpened ? <Drawer /> : null}

      <Header />

      <div className='content p-40'>
        <div className='d-flex align-center justify-between mb-40'>
          <h1>Все кроссовки</h1>
          <div className='search-block d-flex'>
            <img src='/img/search.svg' alt='Search' />
            <input placeholder='Поиск...' />
          </div>
        </div>

        <div className='d-flex'>
          {arr.map((obj, i) => (
            <Card
              key={i}
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default App
