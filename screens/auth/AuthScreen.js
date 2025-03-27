import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import eX from "assets/icon.png";
import eXL from "assets/icon-light.png";
import google from "assets/google.png";
import { useGoogleSignIn } from "utils/authService";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  const { promptAsync, response } = useGoogleSignIn();
  const theme = useSelector((state) => state.theme);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // Track loading state

  const img = theme?.mode === "dark" ? eXL : eX;
  const BACKGROUND_COLOR = theme?.mode === "dark" ? "bg-black" : "bg-white";
  const TEXT_COLOR = theme?.mode === "dark" ? "text-white" : "text-black";
  const BUTTON_BG = theme?.mode === "dark" ? "bg-white" : "bg-black";
  const BUTTON_TEXT = theme?.mode === "dark" ? "text-black" : "text-white";

  const handleGoogleLogin = async () => {
    setLoading(true); // Start loading
    try {
      let c = await promptAsync();
      if(!response?.type == "dismiss") setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Google login failed:", error);
    } 
  };

  return (
    <SafeAreaView className={`flex-1 ${BACKGROUND_COLOR}`}>
      <View className="flex flex-col justify-between flex-1">
        <View className="items-center pt-8">
          <Image source={img} className="w-20 h-20" />
        </View>

        <View className="flex-1 justify-center items-center px-6">
          <Text className={`text-xl p-2 font-semibold text-center ${TEXT_COLOR}`}>
            Stay updated on what's happening in the world right now.
          </Text>
        </View>

        {/* Buttons */}
        <View className="pb-10 px-6 gap-y-6">
          {/* Google Login Button */}
          <TouchableOpacity
            onPress={handleGoogleLogin}
            disabled={loading} // Disable button while loading
            className={`flex-row items-center justify-center ${BUTTON_BG} rounded-full py-3 shadow-md ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading ? (
              <ActivityIndicator size="small" color={theme?.mode === "dark" ? "black" : "white"} />
            ) : (
              <>
                <Image source={google} className="w-6 h-6 mr-2" />
                <Text className={`${BUTTON_TEXT} text-lg font-semibold`}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("SignupScreen")}
            className={`rounded-full py-3 ${BUTTON_BG} shadow-md`}
          >
            <Text className={`text-center text-lg font-semibold ${BUTTON_TEXT}`}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="pb-6 px-6">
        <Text className={`text-base text-center ${TEXT_COLOR}`}>
          By signing up, you agree to the{" "}
          <Text className="text-base text-blue-400">Terms</Text>,{" "}
          <Text className="text-base text-blue-400">Privacy Policy</Text>, and{" "}
          <Text className="text-base text-blue-400">Cookie Policy</Text>.
        </Text>
        <Text className="text-center mt-4 text-base text-gray-400">
          Already have an account?{" "}
          <Text onPress={() => navigation.navigate("Login")} className="text-blue-400 font-semibold">Log in</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
