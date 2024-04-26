import './App.css';

import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Category from './Pages/Category';
import EContextProvider from './Context/Econtext';

function App() {
  return (
    <div>
      <EContextProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/SmartPhone' element={<Category category="SmartPhone"/>}/>
        <Route path='/Laptop' element={<Category category="Laptop"/>}/>
        <Route path="product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      </EContextProvider>
    </div>
  );
}

export default App;
