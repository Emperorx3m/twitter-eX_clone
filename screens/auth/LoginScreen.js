import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "utils/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import eX from "assets/icon.png";
import eXL from "assets/icon-light.png";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen() {
    const mode = useSelector((state) => state.theme.mode);
    const isDark = mode === "dark";

    // Theme-based class constants
    const bgColor = isDark ? "bg-[#000]" : "bg-[#fff]";
    const textColor = isDark ? "text-[#fff]" : "text-[#000]";
    const borderColor = isDark ? "border-[#444]" : "border-[#ddd]";
    const placeholderColor = isDark ? "#bbb" : "#555";
    const buttonBg = isDark ? "bg-[#fff]" : "bg-[#000]";
    const buttonText = isDark ? "text-[#000]" : "text-[#fff]";
    const buttonText2 = isDark ? "text-[#fff]" : "text-[#000]";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const img = isDark ? eXL : eX;

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            

            console.log('error', error)
            let errorMessage = "An unexpected error occurred.";
            if (error.code === "auth/user-not-found") errorMessage = "User not found.";
            if (error.code === "auth/wrong-password") errorMessage = "Incorrect password.";
            if (error.code === "auth/invalid-email") errorMessage = "Invalid email address.";
            if (error.code === "auth/invalid-credential") errorMessage = "Invalid credentials.";
            Alert.alert("Login Failed", errorMessage);
        }finally{
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className={`flex-1  ${bgColor} p-6`}>
            <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-12 left-5">
                <MaterialCommunityIcons name="close" size={24} color={isDark ? "white" : "black"} />
            </TouchableOpacity>
            <View className={`flex-1 items-center`}>
                <View className="items-center pt-2">
                    <Image
                        source={img}
                        className="w-20 h-20"
                    />
                </View>
                <Text className={`text-2xl font-bold mb-4 mt-8 w-full ${textColor}`}>
                    Enter your email  and password to continue
                </Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor={placeholderColor}
                    value={email}
                    onChangeText={setEmail}
                    className={`w-full border ${borderColor} rounded-lg px-4 py-2 ${textColor}`}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor={placeholderColor}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    className={`w-full border ${borderColor} rounded-lg px-4 py-2 mt-4 ${textColor}`}
                />
            </View>
            <View className="flex flex-row items-center justify-between w-full">
                <TouchableOpacity className={`px-6 py-3 rounded-full border ${borderColor}`}>
                    <Text className={`font-normal text-base ${buttonText2}`}>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogin}
                    className={`px-6 py-3 rounded-full ${buttonBg}`}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={mode === "dark" ? "black" : "white"} />
                    ) : (
                        <Text className={`font-bold text-base ${buttonText}`}>Login</Text>
                    )}

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
