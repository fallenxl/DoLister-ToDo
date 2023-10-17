import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"


export const AuthGuard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
    }, [])
    
    if(!isAuthenticated) return (<h1>Not Authenticated</h1>)
    

    return isAuthenticated ? <Outlet/> : <Navigate to="/login" />
}