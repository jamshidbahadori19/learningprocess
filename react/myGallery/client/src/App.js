

import { Route, Routes } from 'react-router-dom';
import SignupForm from './components/Authentication/SignupForm';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/Authentication/LoginForm';
import Home from './components/Home/Home';
import Wish_list from './components/Wish_list/Wish_list';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<SignupForm/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/wishlist" element={<Wish_list/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
