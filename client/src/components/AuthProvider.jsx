import { useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import { registerUser, loginUser } from "../api/auth";

export default function Auth({setToken})