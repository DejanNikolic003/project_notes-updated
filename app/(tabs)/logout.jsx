import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect } from 'react';
import { auth } from "../../database/config";

export default function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace("/login");
        } catch (error) {
            console.log("Logout error:", error.message);
        }
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return null;
};