import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from './hooks/auth.hooks'
import 'materialize-css'

function App() {
    const {login, logout, token, userId} = useAuth()
    const routes = useRoutes(false)
    return (
        <div className="container">
            <Router>
                {routes}
            </Router>
        </div>
    )
}

export default App
