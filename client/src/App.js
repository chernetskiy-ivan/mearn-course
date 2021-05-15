import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from './hooks/auth.hooks'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from "./components/Loader";
import 'materialize-css'

function App() {
    const {login, logout, token, userId, ready} = useAuth()
    //!!token - привожу в boolean зачению
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if(!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
            <div className="container">
                <Router>
                    {isAuthenticated && <Navbar />}
                    {routes}
                </Router>
            </div>
        </AuthContext.Provider>
    )
}

export default App
