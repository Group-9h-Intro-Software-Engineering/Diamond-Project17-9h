import React from 'react';
import './NavBar.less';
import config from './NavBarConfig.json';
import Logo from '../../assets/casmm_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons'; // Added QuestionCircleOutlined icon
import { removeUserSession } from '../../Utils/AuthRequests';
import { useGlobalState } from '../../Utils/userState';

export default function NavBar({ onHelpClick }) {
  const [value] = useGlobalState('currUser');
  let currentRoute = window.location.pathname;
  let navigate = useNavigate();
  let routes = config.routes;

  const handleLogout = () => {
    removeUserSession();
    navigate('/');
  };

  const handleRouteChange = (route) => {
    navigate(route);
  };

  const shouldShowRoute = (route) => {
    if (currentRoute === routes[route]) return false;
    return config.users[value.role].includes(route);
  };

  const menu = (
    <Menu>
      {/* ... (unchanged menu items) ... */}
      {/* Help Menu Item */}
      <Menu.Item key='9' onClick={onHelpClick}>
        <QuestionCircleOutlined />
        &nbsp; Help
      </Menu.Item>
    </Menu>
  );

  return (
    <span id='navBar'>
      <Link
        id='link'
        to={
          value.role === 'ContentCreator'
            ? '/ccdashboard'
            : value.role === 'Mentor'
            ? '/dashboard'
            : value.role === 'Student'
            ? '/student'
            : value.role === 'Researcher'
            ? '/report'
            : '/'
        }
      >
        <img src={Logo} id='casmm-logo' alt='logo' />
      </Link>
      <div id='dropdown-menu'>
        <Dropdown overlay={menu} trigger={['click']}>
          <button
            className='ant-dropdown-link'
            onClick={(e) => e.preventDefault()}
          >
            {value.name ? value.name : 'Menu'} <DownOutlined />
          </button>
        </Dropdown>
      </div>
    </span>
  );
}
