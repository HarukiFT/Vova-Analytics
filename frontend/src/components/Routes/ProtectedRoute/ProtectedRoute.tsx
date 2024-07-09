import { ReactElement } from "react"
import { useAuth } from "../../../contexts/AuthContext/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function protectedLoader() {
    return false 
}