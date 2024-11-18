import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage.jsx';
import FIRRegistration from './components/RegisterFIR/RegisterFIR.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import { useSelector } from 'react-redux';
import OfficerLoginPage from './pages/OfficerLoginPage/OfficerLoginPage';
import FIRList from './pages/FetchFIRs';
import FAQs from './components/FAQS/FAQS';
import IPCDetails from './components/IPCs/IPCDetails';

function App() {
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token && token !== '');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/officer" element={<OfficerLoginPage />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/fir"
          element={isAuth ? <FIRRegistration /> : <Navigate to="/" />}
        />
        <Route
          path="/fetchFIRs"
          element={isAuth ? <FIRList /> : <Navigate to="/" />}
        />
        <Route
          path="/faqs"
          element={isAuth ? <FAQs /> : <Navigate to="/" />}
        />
        <Route
          path="/ipc-details"
          element={isAuth ? <IPCDetails /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
