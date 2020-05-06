import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../screens/Login/components';

export default ({ children }) => {

  const isAuthenticated = useSelector(state => state.Login.isAuthenticated);

  if (!isAuthenticated) return <Login/>;

  return children;
}