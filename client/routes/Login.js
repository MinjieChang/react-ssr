import React from 'react';
import { Link } from 'react-router-dom'
import { renderRoutes } from "react-router-config";

import styles from './Login.css';

const Login = ({ route }) => {
  return (
    <div>
      <div>welcome to login<Link to="/login/page">to page</Link></div>
      <div><Link to="/login/pageTwo">to page2</Link></div>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default Login;