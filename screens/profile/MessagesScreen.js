import React, { useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated, Image, TextInput } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ImageOpenDrawer from "components/navigation/ImageOpenDrawer";
import { messages } from "utils/helpers";




export default function MessagesScreen() {
  const [fabOpen, setFabOpen] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const theme = useSelector((state) => state.theme?.mode); 

  const toggleFAB = () => {
    if (fabOpen) {
      Animated.timing(scaleAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setFabOpen(false));
    } else {
      setFabOpen(true);
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    }
  };

  return (
    <ImageOpenDrawer 
    text="Search Messages"
    icon={ <Ionicons name="settings-outline" size={24} color={theme === "dark" ? "white" : "black"} />}
    isSearch={true}
    showFab={false}
  >
    <View className={`flex-1 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
     
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className={`flex-row items-center p-3 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
            <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full mr-3" />
            <View className="flex-1">
              <Text className={theme === "dark" ? "text-white" : "text-black font-semibold"}>{item.name}</Text>
              <Text className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>{item.message}</Text>
            </View>
            <Text className={theme === "dark" ? "text-gray-400 text-xs" : "text-gray-500 text-xs"}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={toggleFAB} className="absolute bottom-8 right-8 bg-blue-500 p-4 rounded-full shadow-lg">
        <MaterialCommunityIcons name="message-plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </ImageOpenDrawer>
  );
}
