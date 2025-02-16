import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAtom, FaFlask, FaCog, FaChartBar, FaQuestionCircle, FaBars, FaPuzzlePiece } from 'react-icons/fa';
import '../App.css';

const menuItems = [
  { name : 'Current Level', icon: <FaPuzzlePiece />, path: '/current' },
  { name: 'Atoms', icon: <FaAtom />, path: '/atoms' },
  { name: 'Molecules', icon: <FaFlask />, path: '/molecules' },
  { name: 'Reactions', icon: <FaCog />, path: '/reactions' },
  { name: 'Statistik', icon: <FaChartBar />, path: '/statistics' },
  { name: 'Hjälp', icon: <FaQuestionCircle />, path: '/help' }
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
        <FaBars />
      </button>
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <Link to={item.path} className="menu-link">
              <span className="menu-icon" title={!isExpanded ? item.name : undefined}>
                {item.icon}
              </span>
              {isExpanded && <span className="menu-text">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;