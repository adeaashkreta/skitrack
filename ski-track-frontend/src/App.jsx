// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index        from './pages/Index';
import ApresSki     from './pages/ApresSki';
import EventPage    from './pages/EventPage';
import FamilyFun    from './pages/FamilyFun';
import Resorts      from './pages/Resorts';
import Login        from './pages/Login';
import Logout       from './pages/logout';
import AboutUs      from './pages/AboutUs';
import ContactUs    from './pages/ContactUs';
import Dashboard    from './pages/Dashboard';
import SkiLessons   from './pages/SkiLessons';
import Snowboarding from './pages/Snowboarding';
import Register     from './pages/register';
import Weather from "./pages/Weather";
import InsertUser   from './pages/InsertUser';
import UserTable    from './pages/UserTable';
import UpdateUser   from './pages/UpdateUser';
import DeleteUser   from './pages/DeleteUser';

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/"            element={<Index />} />
        <Route path="/ApresSki"    element={<ApresSki />} />
        <Route path="/EventPage"   element={<EventPage />} />
        <Route path="/FamilyFun"   element={<FamilyFun />} />
        <Route path="/Resorts"     element={<Resorts />} />
        <Route path="/SkiLessons"  element={<SkiLessons />} />
        <Route path="/Snowboarding" element={<Snowboarding />} />
        <Route path="/AboutUs"     element={<AboutUs />} />
        <Route path="/ContactUs"   element={<ContactUs />} />
        <Route path="/Weather" element={<Weather />} />
        {/* AUTH */}
        <Route path="/login"    element={<Login />} />
        <Route path="/logout"   element={<Logout />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD & CRUD */}
        <Route path="/Dashboard"   element={<Dashboard />} />
        <Route path="/InsertUser"  element={<InsertUser />} />
        <Route path="/UserTable"   element={<UserTable />} />

        {/* ⚠️  Routes that need an ID parameter */}
        <Route path="/UpdateUser/:id" element={<UpdateUser />} />
        <Route path="/DeleteUser/:id" element={<DeleteUser />} />
      </Routes>
    </Router>
  );
}

export default App;
