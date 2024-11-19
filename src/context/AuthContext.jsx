import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(localStorage.getItem("user"));
  }, []);

  const signUp = async (data) =>{
    setLoading(true);
    console.log("API URL:", apiUrl);
    axios
    .post(`${apiUrl}/auth/signup`, data,{
        headers:{
            "Content-Type": "application/json",
        }

    })
    .then((res)=>{
        console.log(data);
        setToken(res.data.data.token);
        setUser(res.data.data.user);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", res.data.data.user);
        toast.success("Registration completed");
        navigate("/")
        
    })
    .catch((err)=>{
        err?.response
          ? toast.error(err.response.data.message)
          : toast.error("An error occured");
        console.log(err?.response.data.message);
    })
    .finally(() => {
        setLoading(false);
    })
  };
  const login = async (data) => {
    setLoading(true);
    console.log("API URL:", apiUrl);
    axios
      .post(`${apiUrl}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(data);
        setToken(res.data.data.token);
        setUser(res.data.data.user);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("Login Succesful !");
        navigate("/");
      })
      .catch((err) => {
        err?.response
          ? toast.error(err.response.data.message)
          : toast.error("An error occured");
        console.log(err?.response.data.messasge);
        
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/login");
  };

  const isAuthenticated = !! token;

  const values = {
    loading,
    token,
    user,
    signUp,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;