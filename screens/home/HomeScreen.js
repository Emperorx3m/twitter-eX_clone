import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Animated, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImageOpenDrawer from "components/navigation/ImageOpenDrawer";
import Tweets from "components/Tweets";
import { fetchAllTweets } from "utils/helpers";
// import { tweets } from "utils/helpers";

export default function HomeScreen() {
  const { theme, mode } = useSelector((state) => state.theme); // Light/Dark mode
  const userdeets = useSelector((state) => state.userDeets?.userDetails);
  const [tab, setTab] = useState("For You");
  const navigation = useNavigation()
  const [tweets, setTweets] = useState(null)

  const getUserTW = async () => {
    const tw = await fetchAllTweets()
    // console.log('tw_', JSON.stringify(tw, null, 2));
    setTweets(tw);
  }

  useEffect(() => {
      getUserTW()
  }, [])

  return (
    <ImageOpenDrawer
      showImage={true}
      icon={<Ionicons name="settings-outline" size={24} color={theme.text} />}
      showTabs={true}
    >
    {!tweets && <ActivityIndicator />}
      <View className="flex-1" style={{ backgroundColor: theme.background }}>

        <View className="flex-row justify-around border-b border-gray-700 py-2">
          <TouchableOpacity onPress={() => setTab("For You")}>
            <Text
              className={`text-lg ${tab === "For You"
                ? mode == "dark"
                  ? "text-white font-bold"
                  : "text-black font-bold"
                : "text-gray-400"
                }`}
            >
              For You
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTab("Following")}>
            <Text
              className={`text-lg ${tab === "Following"
                ? mode == "dark"
                  ? "text-white font-bold"
                  : "text-black font-bold"
                : "text-gray-400"
                }`}
            >
              Following
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList className=''
          data={tweets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
            <Tweets tweet={item}/>
          )}}
        />




      </View>

    </ImageOpenDrawer>
  );
}
