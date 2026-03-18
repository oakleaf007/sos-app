import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from 'react'
export default function ProtectedRoute({children}){
      const {isLoggedIn} = useContext(AuthContext);

    
    console.log("isLoggedIn:", isLoggedIn);
    if(isLoggedIn){
        return <Navigate to="/signin" replace />
    }
    return children;
}