import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Collection from './pages/Collection'
import About from './pages/about'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/cart'
import Login from './pages/login.jsx'
import PlaceOrder from './pages/placeorder.jsx'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return ( 
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'  >
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Collection' element={<Collection/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Product/:productid' element={<Product/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Placeorder' element={<PlaceOrder/>} />
        <Route path='/Orders' element={<Orders/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App