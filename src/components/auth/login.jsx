"use client";

import React from "react";
import { useState } from "react";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChangeInput(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin() {
    const { email, password } = loginData;

    if (!email || !password) {
      console.log("All fields must be filled!");
      return;
    }

    const res = await fetch("api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <main className="space-y-4">
      <div className="space-y-2">
        <h1>Login</h1>
        <p className="text-gray-600"> Welcome!</p>
      </div>
      <div className="grid grid-cols-2 gap-4"></div>
      <input name="email" placeholder="Email" onChange={handleChangeInput} />
      <input
        name="password"
        placeholder="Password"
        onChange={handleChangeInput}
      />
      <button onClick={handleLogin}>Login</button>
    </main>
  );
};
