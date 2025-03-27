import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFirestore, doc, setDoc, getCountFromServer, query, collection, where } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "utils/firebaseConfig";
import eX from "assets/icon.png";
import eXL from "assets/icon-light.png";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { mode } = useSelector((state) => state.theme);
  const img = mode === "dark" ? eXL : eX;

  const checkUsernameExists = async (db, username) => {
    try {
      const sanitizedUsername = username.replace(/[.#$/[\]]/g, "");
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", sanitizedUsername));
      const querySnapshot = await getCountFromServer(q);
return querySnapshot.data().count > 0;
    } catch (error) {
      console.log("Error checking username:", error);
      return false; // Assume available if error occurs
    }
  };


  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      "auth/email-already-in-use": "This email is already registered. Try logging in.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Password should be at least 6 characters long.",
      "auth/network-request-failed": "Network error! Check your internet connection.",
      "auth/too-many-requests": "Too many attempts! Please try again later.",
      "auth/internal-error": "Something went wrong. Please try again.",
    };

    return errorMessages[errorCode] || "An unknown error occurred. Please try again.";
  };
  const handleSignup = async () => {
    if (!name || !email || !username || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (username.length < 3) {
      Alert.alert("Error", "username cannot be less than 3!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password cannot be less than 6!");
      return;
    }

    try {
      setLoading(true);

      const usernameTaken = await checkUsernameExists(db, username);
      if (usernameTaken) {
        setLoading(false);
        Alert.alert("Error", "Username is already taken!");
        return;
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      // Convert user object to plain serializable data
      const user = {
        uid: firebaseUser.uid || null,
        name: name || null,
        email: email || null,
        username: username || null,
        createdAt: new Date().toISOString(),
        photoUrl: null,
        bio: "",
        location: "",
        website: "",
        followersCount: 0,
        followingCount: 0,
        tweetsCount: 0,
        likesCount: 0,
        isVerified: false
      };

      // Store user details in Firestore
      user?.uid && await setDoc(doc(db, "users", user.uid), user);

      setLoading(false);
      // Alert.alert("Success", "Account created!");

      dispatch(login(user)); // Dispatch sanitized user object
      navigation.replace("Home");
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2))
      setLoading(false);
      const message = getErrorMessage(error.code);
      Alert.alert("Error", message);
    }
  };


  return (
    <View className={`flex-1 px-14 ${mode === "dark" ? "bg-black" : "bg-white"}`}>
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-12 left-5">
        <MaterialCommunityIcons name="arrow-left" size={24} color={mode === "dark" ? "white" : "black"} />
      </TouchableOpacity>

      <View className="items-center pt-6">
        <Image source={img} className="w-20 h-20" />
      </View>

      <Text className={`text-xl font-bold text-left mb-5 ${mode === "dark" ? "text-white" : "text-black"}`}>
        Create Your Account
      </Text>

      <View className={`flex-1 p-5 justify-center`}>
        <Text className={`text-sm mb-1 ${mode === "dark" ? "text-white" : "text-black"}`}>Name</Text>
        <TextInput
          className={`border p-3 rounded-lg ${mode === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-black"}`}
          placeholder="Enter your name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />

        <Text className={`text-sm mt-4 mb-1 ${mode === "dark" ? "text-white" : "text-black"}`}>Email</Text>
        <TextInput
          className={`border p-3 rounded-lg ${mode === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-black"}`}
          placeholder="Enter your email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text className={`text-sm mt-4 mb-1 ${mode === "dark" ? "text-white" : "text-black"}`}>Username</Text>
        <TextInput
          className={`border p-3 rounded-lg ${mode === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-black"}`}
          placeholder="Choose a username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />

        <Text className={`text-sm mt-4 mb-1 ${mode === "dark" ? "text-white" : "text-black"}`}>Password</Text>
        <TextInput
          className={`border p-3 rounded-lg ${mode === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-black"}`}
          placeholder="Enter your password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Signup Button */}
        <TouchableOpacity
          className={`mt-5 p-4 rounded-full ${mode === "dark" ? "bg-white" : "bg-black"} items-center`}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={mode === "dark" ? "black" : "white"} />
          ) : (
            <Text className={`text-lg font-semibold ${mode === "dark" ? "text-black" : "text-white"}`}>Create</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
