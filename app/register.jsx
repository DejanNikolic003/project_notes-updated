import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import RegisterForm from "../components/forms/RegisterForm";
import { auth } from "../database/config";
import { useTheme } from "../hooks/useTheme";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/");
      }
    });
    return unsubscribe;
  }, [router]);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "User registered successfully!");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  
  return (<RegisterForm
  theme={theme}
  email={email}
  setEmail={setEmail}
  password={password}
  setPassword={setPassword}
  showPassword={showPassword}
  onTogglePassword={() => setShowPassword(v => !v)}
  onSubmit={handleRegister}
  onLogin={() => router.push("/login")}
  />
  );
}

