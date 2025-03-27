import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ImageOpenDrawer from "components/navigation/ImageOpenDrawer";
import { notifications } from "utils/helpers";

const CommunityScreen = () => {
  const { mode, theme } = useSelector((state) => state.theme); // 'dark' or 'light'

  const bgColor = mode === "dark" ? "bg-black" : "bg-white";
 

  const communities = [
    {
      name: "Pulse Nigeria Trybe",
      members: "7,925",
      image: "https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      avatars: [
        "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
    },
    {
      name: "Lagos X Community",
      members: "5,396",
      image: "https://images.pexels.com/photos/240561/pexels-photo-240561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      avatars: [
        "https://images.pexels.com/photos/889545/pexels-photo-889545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/267961/pexels-photo-267961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1245055/pexels-photo-1245055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
    },
    {
      name: "Abuja X Community",
      members: "861",
      image: "https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      avatars: [
        "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/889545/pexels-photo-889545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
    },
  ];

  return (
    <ImageOpenDrawer
      text={"Communities"}
      showTitle={true}
      showImage={false}
      icon={<Ionicons name="settings-outline" size={24} color={theme.text} />}
      showTabs={true}
    >
      <View className={`flex-1 ${bgColor}`}>
      <Text className={`text-xl font-bold m-4 ${mode === "dark" ? "text-white" : "text-black"}`}>
        Discover New Communities
      </Text>
      <FlatList
        data={communities}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View className="flex-1 flex-row items-center p-4 border-b border-gray-700">
            <Image source={{ uri: item.image }} className="w-28 h-28 rounded-lg" />
            <View className="ml-4 flex-1">
              <Text className={`text-lg font-semibold ${mode === "dark" ? "text-white" : "text-black"}`}>{item.name}</Text>
              <Text className="text-gray-400 text-sm">{item.members} miembros</Text>
              <View className="flex-row mt-2">
                {item.avatars.map((avatar, index) => (
                  <Image key={index} source={{ uri: avatar }} className="w-12 h-12 rounded-full -ml-2 border-2 border-black" />
                ))}
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity>
        <Text className="text-blue-500 text-lg font-semibold mt-4">Mostrar más</Text>
      </TouchableOpacity>
    </View>
    </ImageOpenDrawer>
  );

};

export default CommunityScreen;
