import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ApresSki from './pages/ApresSki';
import EventPage from './pages/EventPage';
import FamilyFun from './pages/FamilyFun';
import Resorts from './pages/Resorts';


import "./assets/css/bootstrap.css";
import "./assets/css/style.css";





function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ApresSki" element={<ApresSki />} />
          < Route path="/EventPage" element={<EventPage />} />
          <Route path="/FamilyFun" element={<FamilyFun />} />
          <Route path="/Resorts" element={<Resorts />} />
       
       
      </Routes>
    </Router>
  );
}

export default App;
