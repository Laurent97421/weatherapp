import React from 'react';
import { Route, Routes } from "react-router";
import './App.css';
import routes from './config/routes';
import Login from './containers/auth/Login/Login';
import Signup from './containers/auth/Signup/Signup';
import NotFound from './containers/NotFound/NotFound';
import Weather from './containers/Weather/Weather';
import Profile from './containers/Profile/Profile';

const App = () => {
  return (

    <Routes>
      <Route path={routes.SIGNUP} element={<Signup/>}/>
      <Route path={routes.LOGIN} element={<Login/>}/>
      <Route path={routes.PROFILE} element={<Profile/>}/>
      <Route path={routes.WEATHER} element={<Weather/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default App;
