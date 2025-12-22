import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import LoginForm from "../components/forms/LoginForm";
import { auth } from "../database/config";
import { useTheme } from "../hooks/useTheme";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const loadRemembered = async () => {
      try {
        const saved = await AsyncStorage.getItem("remember_email");
        if (saved) {
          setEmail(saved);
          setRemember(true);
        }
      } catch (e) {
      }
    };
    loadRemembered();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/");
      }
    });
    return unsubscribe;
  }, [router]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (remember) {
        await AsyncStorage.setItem("remember_email", email);
      } else {
        await AsyncStorage.removeItem("remember_email");
      }
      router.replace("/(tabs)/");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (<LoginForm
      theme={theme} 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      onTogglePassword={setShowPassword}
      remember={remember}
      onToggleRemember={setRemember}
      onSubmit={handleLogin}
      onRegister={() => router.push("/register")}
    />);
}