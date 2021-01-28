import React from 'react';
import { Link } from 'react-router-dom'
import { renderRoutes } from "react-router-config";
import { Alert } from 'mj-ui'
import styles from './Login.css';

import 'mj-ui/esm/alert/style/index.css'

const Login = ({ route }) => {
  return (
    <div>
      <Alert kind="warning">2222</Alert>
      <div><Link to="/login/page">to page1</Link></div>
      <div><Link to="/login/pageTwo">to page2</Link></div>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default Login;