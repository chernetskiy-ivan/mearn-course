import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback(text => {
        if(window.M && text) {
            //toast метод из materialize
            window.M.toast({ html: text})
        }
    }, [])
}