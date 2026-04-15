import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import RegisterForm from "../components/forms/RegisterForm";
import { auth } from "../database/config";
import { useLanguage } from "../hooks/useLanguage";
import { getRegisterErrorMessage } from "../utils/utils";
import { EMAIL_REGEX } from "../constants/constants";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const lan = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)/");
      }
    });
    return unsubscribe;
  }, [router]);

  const handleRegister = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password.trim()) {
      Alert.alert(lan.REGISTER_MISSING_INFO_TITLE, lan.REGISTER_MISSING_INFO_MESSAGE);
      return;
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      Alert.alert(lan.REGISTER_INVALID_EMAIL_TITLE, lan.REGISTER_INVALID_EMAIL_MESSAGE);
      return;
    }

    if (password.length < 6) {
      Alert.alert(lan.REGISTER_INVALID_PASSWORD_TITLE, lan.REGISTER_INVALID_PASSWORD_MESSAGE);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      Alert.alert(lan.REGISTER_SUCCESS_TITLE, lan.REGISTER_SUCCESS_MESSAGE);
      router.replace("/login");
    } catch (error) {
      Alert.alert(lan.REGISTER_FAILED_TITLE, getRegisterErrorMessage(error, lan));
    }
  };
  
  return (<RegisterForm
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

