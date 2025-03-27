import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ImageOpenDrawer from "components/navigation/ImageOpenDrawer";
import { notifications } from "utils/helpers";

const NotificationsScreen = () => {
  const { mode, theme } = useSelector((state) => state.theme); // 'dark' or 'light'

  const bgColor = mode === "dark" ? "bg-black" : "bg-white";
  const textColor = mode === "dark" ? "text-white" : "text-black";
  const secondaryText = mode === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = mode === "dark" ? "border-gray-700" : "border-gray-300";
  const accentBg = mode === "dark" ? "bg-purple-600" : "bg-purple-300";
  const iconColor = mode === "dark" ? "white" : "black";

  return (
    <ImageOpenDrawer
      text={"Notificaciones"}
      showTitle={true}
      showImage={false}
      icon={<Ionicons name="settings-outline" size={24} color={theme.text} />}
      showTabs={true}
    >
      <View className={`flex-1 ${bgColor}`}>

        <View className={`flex-row px-4 py-2 border-b ${borderColor}`}>
          <Text className={`border-b-2 pb-2 flex-1 text-center font-semibold text-blue-500 border-blue-500  ${textColor}`}>
            Todas
          </Text>
          <Text className={`flex-1 text-center ${secondaryText}`}>Verificado</Text>
          <Text className={`flex-1 text-center ${secondaryText}`}>Menciones</Text>
        </View>

        <ScrollView className="p-4 space-y-4">
          <View className={`flex-row items-start p-3 rounded-lg`}>
            <View className={` px-4 ${accentBg} rounded-full`}>
              <MaterialCommunityIcons name="bell" size={24} color={theme.text} />
            </View>
            <View className='flex-1'>
              <View className={`flex-row  rounded-lg`}>
                <MaterialCommunityIcons name="currency-btc" size={24} color={theme.text} />
                <MaterialCommunityIcons name="currency-sign" size={24} color={theme.text} />
              </View>

              <Text className={`flex-1 ${textColor}`}>
                Nuevas notificaciones de posts para{" "}
                <Text className="font-bold">Crypto Jobs List — Web3 jobs y Naira Rates</Text>
              </Text>
            </View>

          </View>

          {/* Recent Posts */}
          {notifications.map((post, index) => (
            
              <View key={index}  className={`flex-row items-start p-3 rounded-lg`}>
                <View className={` px-4 ${accentBg} rounded-full`}>
                  <MaterialCommunityIcons name="star-four-points" size={24} color={theme.text} />
                </View>
                <View className='flex-1'>
                  <View className={`flex-row  rounded-lg`}>
                    <Image
                      source={{ uri: post.avatar }}
                      className="w-10 h-10 rounded-full"
                    />
                  </View>

                  <View className="gap-3 flex-1">
                  <Text className={`mt-4 ${textColor}`}>
                    Post reciente de <Text className="font-bold">{post.name}</Text>
                  </Text>
                  <Text className={`mt-4 ${secondaryText}`}>{post.text}</Text>
                </View>
                </View>
              </View>
           
          ))}
        </ScrollView>
      </View>
    </ImageOpenDrawer>
  );

};

export default NotificationsScreen;
