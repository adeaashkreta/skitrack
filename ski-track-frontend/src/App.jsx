import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ApresSki from './pages/ApresSki';
import EventPage from './pages/EventPage';
import FamilyFun from './pages/FamilyFun';
import Resorts from './pages/Resorts';
import Login from "./pages/Login";
import Logout from './pages/logout';
import Register from "./pages/register";








function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ApresSki" element={<ApresSki />} />
          < Route path="/EventPage" element={<EventPage />} />
          <Route path="/FamilyFun" element={<FamilyFun />} />
          <Route path="/Resorts" element={<Resorts />} />
           <Route path="/login" element={<Login />} />
           <Route path="/logout" element={<Logout />} />
           <Route path="/register" element={<Register />} />
       
       
       
      </Routes>
    </Router>
  );
}

export default App;
