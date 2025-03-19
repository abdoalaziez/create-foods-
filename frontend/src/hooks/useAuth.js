import { useState, createContext, useContext } from 'react';
import * as userService from '../services/userService';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const register = async data => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success('Register Successful');
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success('Logout Successful');
  };

  const updateProfile = async user => {
    const updatedUser = await userService.updateProfile(user);
    toast.success('Profile Update Was Successful');
    if (updatedUser) setUser(updatedUser);
  };

  const changePassword = async passwords => {
    await userService.changePassword(passwords);
    logout();
    toast.success('Password Changed Successfully, Please Login Again!');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateProfile,changePassword}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



// import { useState, useEffect, createContext, useContext } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // ✅ تحميل المستخدم من localStorage عند تشغيل التطبيق
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       setUser(JSON.parse(localStorage.getItem("user")));
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const { data } = await axios.post("/api/users/login", { email, password });

//       // ✅ حفظ التوكن والمستخدم في localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data));

//       axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
//       setUser(data);
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     axios.defaults.headers.common["Authorization"] = "";
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);






// MONGO_URI=mongodb+srv://umranabdo112:tIhRjW1Nb2sm7zqx@cluster0.h0dc0.mongodb.net/First-foods
// JWT_SECRET=mysecret

// PORT=5000
// NODE_ENV=development
// MAILGUN_API_KEY=

// # CLDUDINARY_CLDUD_NAME=
// # CLDUDINARY_API_KEY=
// # CLDUDINARY_API_SECRET=


// // ?retryWrites=true&w=majority&appName=Cluster0
// # tIhRjW1Nb2sm7zqx



