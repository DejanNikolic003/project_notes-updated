import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import LoginForm from "../components/forms/LoginForm";
import { auth } from "../database/config";
import { useLanguage } from "../hooks/useLanguage";
import { getLoginErrorMessage } from "../utils/utils";
import { EMAIL_REGEX } from "../constants/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();
  const lan = useLanguage();

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
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password.trim()) {
      Alert.alert(lan.LOGIN_MISSING_INFO_TITLE, lan.LOGIN_MISSING_INFO_MESSAGE);
      return;
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      Alert.alert(lan.LOGIN_INVALID_EMAIL_TITLE, lan.LOGIN_INVALID_EMAIL_MESSAGE);
      return;
    }

    if (password.length < 6) {
      Alert.alert(lan.LOGIN_INVALID_PASSWORD_TITLE, lan.LOGIN_INVALID_PASSWORD_MESSAGE);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, normalizedEmail, password);
      if (remember) {
        await AsyncStorage.setItem("remember_email", normalizedEmail);
      } else {
        await AsyncStorage.removeItem("remember_email");
      }
      router.replace("/(tabs)/");
    } catch (error) {
      Alert.alert(lan.LOGIN_FAILED_TITLE, getLoginErrorMessage(error, lan));
    }
  };

  return (<LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword((v) => !v)}
      remember={remember}
      onToggleRemember={setRemember}
      onSubmit={handleLogin}
      onRegister={() => router.push("/register")}
    />);
}