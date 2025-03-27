import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ImageOpenDrawer from "components/navigation/ImageOpenDrawer";
import { notifications } from "utils/helpers";

const GrokScreen = () => {
  const { mode, theme } = useSelector((state) => state.theme); // 'dark' or 'light'

  const bgColor = mode === "dark" ? "bg-black" : "bg-white";
  const textColor = mode === "dark"  ? "text-white" : "text-black";
  const cardColor = mode === "dark"  ? "bg-gray-800" : "bg-gray-200";

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
      text={"Grok 3(Beta)"}
      showTitle={true}
      showImage={false}
      icon={<MaterialCommunityIcons name="circle-edit-outline" size={24} color={theme.text} />}
      showTabs={true}
      showFab={false}
    >
      <View className={`flex-1 ${bgColor} p-4`}>
     
      <View className={`p-4 rounded-lg ${cardColor} flex-row items-center gap-3 mb-4`}>
        <Image source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} className="w-16 h-16 rounded-md" />
        <View className='flex-1'>
          <Text className="text-white font-semibold">Search the JFK Files</Text>
          <Text className="text-gray-400 text-sm">Ask Grok about the JFK Files: Was it Lee Harvey Oswald, the CIA, or the Mafia?</Text>
        </View>
      </View>

      {/* Features Section */}
      <Text className={`text-lg font-bold ${textColor} mb-2`}>Grok 3 is here.</Text>
      <Text className="text-gray-400 mb-4">Try our new features: DeepSearch and Think</Text>

      <View className={`p-4 rounded-lg ${cardColor} mb-4`}>
        <Text className="text-white font-semibold">🔍 DeepSearch</Text>
        <Text className="text-gray-400 text-sm">Haz búsquedas profundas para obtener respuestas detalladas y correctamente razonadas...</Text>
      </View>

      <View className={`p-4 rounded-lg ${cardColor} mb-4`}>
        <Text className="text-white font-semibold">💡 Think</Text>
        <Text className="text-gray-400 text-sm">Resuelve los problemas más difíciles en las áreas de matemáticas, ciencia y programación...</Text>
      </View>

      {/* Chat Input */}
      <View className={`flex-row items-center p-3 rounded-full ${cardColor} mt-auto`}>
        <TextInput placeholder="Pregunta cualquier cosa" placeholderTextColor="gray" className="flex-1 text-white" />
        <TouchableOpacity>
          <Ionicons name="send" size={24} color={theme ? "white" : "black"} />
        </TouchableOpacity>
      </View>

     
    </View>
    </ImageOpenDrawer>
  );

};

export default GrokScreen;
