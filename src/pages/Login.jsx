import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext"; // Update the path as needed

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { login, signup } = useContext(ShopContext); // Access login and signup functions

  // State to manage input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmithandle = (event) => {
    event.preventDefault();
  
    // Basic validation for inputs
    if (currentState === "Sign Up" && !name) {
      toast.error("Name is required"); // Ensure the name is provided
      return;
    }
  
    if (!email || !password) {
      toast.error("Email and Password are required"); // Ensure email and password are provided
      return;
    }
  
    // Handle login or signup based on the currentState
    if (currentState === "Login") {
      login(email, password); // Call login function
    } else {
      signup(name, email, password); // Call signup function
    }
  };
  

  return (
    <form
      onSubmit={onSubmithandle}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
