// frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OriginDash from './pages/OriginDash'; 
import RecipientDash from './pages/RecipientDash';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash/origin" element={<OriginDash />} />
        <Route path="/dash/recipient" element={<RecipientDash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;