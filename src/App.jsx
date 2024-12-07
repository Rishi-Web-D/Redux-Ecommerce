import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopAppBar from './layout/TopAppBar'
import Footer from './layout/Footer'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Cart from './pages/Cart/Cart'
import AllProducts from './pages/Products/AllProducts'
import CategorisedProducts from './pages/Products/CategorisedProducts'
import ProductDetails from './pages/Details/ProductDetails'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <BrowserRouter>

      <TopAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/user-login" element={<Login />} /> */}
        <Route path="/shop/:category" element={<CategorisedProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<AllProducts />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  )
}

export default App
