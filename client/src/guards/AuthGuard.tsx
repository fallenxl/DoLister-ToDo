import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { LocalStorageKeys } from "../constants"
import { PublicRoutes } from "../constants/routes"
import { regfreshToken } from "../services/auth.service"
import Loading from "../components/loader/Loading"


export const AuthGuard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    useEffect(() => {
        const validateUser = async () => {
            const data = await regfreshToken()
            if (!data) return setIsAuthenticated(false)
            setIsAuthenticated(true)
            localStorage.setItem(LocalStorageKeys.DATA, JSON.stringify(data))
        }
        validateUser()
    }, [])

    if (isAuthenticated === null) return <Loading />


    return isAuthenticated ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />
}