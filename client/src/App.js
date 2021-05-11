import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from './hooks/auth.hooks'
import {AuthContext} from './context/AuthContext'
import 'materialize-css'

function App() {
    const {login, logout, token, userId} = useAuth()
    //!!token - привожу в boolean зачению
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
            <div className="container">
                <Router>
                    {routes}
                </Router>
            </div>
        </AuthContext.Provider>
    )
}

export default App
