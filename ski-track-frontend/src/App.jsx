import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ApresSki from './pages/ApresSki';
import EventPage from './pages/EventPage';
import FamilyFun from './pages/FamilyFun';
import Resorts from './pages/Resorts';
import Login from "./pages/Login";
import Logout from './pages/logout';
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import SkiLessons from "./pages/SkiLessons";
import Snowboarding from "./pages/Snowboarding";
import Register from "./pages/register";
import InsertUser from './pages/InsertUser';








function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ApresSki" element={<ApresSki />} />
          <Route path="/EventPage" element={<EventPage />} />
          <Route path="/FamilyFun" element={<FamilyFun />} />
          <Route path="/Resorts" element={<Resorts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/SkiLessons" element={<SkiLessons />} />
          <Route path="/Snowboarding" element={<Snowboarding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/InsertUser" element={<InsertUser />} />
       
       
       
      </Routes>
    </Router>
  );
}

export default App;
