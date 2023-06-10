import React from 'react'
import {Routes, Route} from "react-router-dom"
import {ROUTE_PATH} from "../constants"
import Login from '../component/login'
import SignUp from '../component/signUP'
import Dashboard from '../component/dashboard'
import ProtectedRoute from '../ProtectedRoute'


const Paths = () => {
  return (
    <>
    <Routes>
    <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
    <Route path={ROUTE_PATH.SIGNUP} element={<SignUp />} />
    <Route element={<ProtectedRoute />}>
    <Route path={ROUTE_PATH.DASHBOARD} element={<Dashboard />} />
    </Route>
    </Routes>
    </>
  )
}

export default Paths