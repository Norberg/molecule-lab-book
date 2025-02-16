import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Atoms from './pages/Atoms';
import Current from './pages/Current';
import Molecules from './pages/Molecules';
import Reactions from './pages/Reactions';
import Statistics from './pages/Statistics';
import Help from './pages/Help';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="content p-4">
          <Routes>
            <Route path="/" element={<h2>Menu</h2>} />
            <Route path="/current" element={<Current />} />
            <Route path="/atoms" element={<Atoms />} />
            <Route path="/molecules" element={<Molecules />} />
            <Route path="/reactions" element={<Reactions />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
