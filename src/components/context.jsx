import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { mainurl } from "./commonfile";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [todos, settodos] = useState(null);
  const [profile, setProfile] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await axios.get(
          `${mainurl}/userroute21/getauthuser`,
          { withCredentials: true }
        );
        setProfile(response.data.user);
        console.log("Profile:", response.data);
        console.log("User:", response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setProfile(null);
      }
    };

    fetchMyProfile();
  }, []);


  useEffect(() => {
    if (!profile) return;
    // console.log(profile.id) 

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/userroute21/allusertodo/${profile.id}`,{withCredentials:true}
        );
        settodos(response.data.todos);
        console.log(response.data.todos)
        console.log("Todos:", response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error.message);
        settodos(null);
      }
    };

    fetchData();
  }, [profile]);

  return (
    <AuthContext.Provider value={{ todos, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
