'use client';
import React from "react";
import { Password } from "@mui/icons-material";
import { createContext, useState, useEffect } from "react";

type UserType={
    email: string,
    name: string,
    password: string,
}
type authContextType = {
    isLoggedIn:boolean,
    user: UserType;
    login: ({}) => void;
    logout: () => void;
};
const AuthContext=createContext<authContextType>({
    isLoggedIn:false,
    user: {email:"", name:"",password:""},
    login: () => {},
    logout: () => {},
});

 const AuthContextProvider= ({children})=>{
    const [user,setUser]=useState({email:"", name:"",password:""});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const login = () => {
    //     setIsLoggedIn(true);
    //    // setUser({ email, name }); 
    // };

    // const logout = () => {
    //     setIsLoggedIn(false);
    //     setUser(null);
    // };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const login = ({email, name,password}) => {
       
        setIsLoggedIn(true);
        const userData = { email, name, password }; 
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
    };
    
    return(
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthContextProvider};