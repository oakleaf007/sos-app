import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
export const AuthContext = createContext();

export default function AuthProvider({children}){
    const [isLoggedIn, setLogin] = useState(()=>{
        return !!localStorage.getItem("sostoken");
    });
  
  
    
    function login(token){
        localStorage.setItem("sostoken",token);
        setLogin(true);
  
    }


    return(
        <AuthContext.Provider value={{isLoggedIn, login}}>
            {children}
        </AuthContext.Provider>
    )
}