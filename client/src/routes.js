import React from 'react'
import { Switch } from 'react-router-dom'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>

            </Switch>
        )
    }

    return (
        <Switch>

        </Switch>
    )
}