import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDateToMonthYear, getUserDetails, listenForTweets, photoURL } from "utils/helpers";
import { useNavigation, useRoute } from "@react-navigation/native";
import Tweets from "components/Tweets";
import ImageOpenDrawer from "components/navigation/ImageOpenDrawer";

const ProfileScreen = () => {
  const { mode, theme } = useSelector((state) => state.theme);
  const isDarkMode = mode === "dark";
  const route = useRoute();
    const navigation = useNavigation();
    const userid = route?.params?.userID

  const userdeets_ = useSelector((state) => state.userDeets?.userDetails);
  const authUser = useSelector((state) => state.auth.isAuthenticated);
  const [userdeets, setuserdeets] = useState(null)
  const profilePicture = userdeets?.photoUrl ?? photoURL;
  const BACKGROUND_COLOR = isDarkMode ? "bg-black" : "bg-white";
  const TEXT_COLOR = isDarkMode ? "text-white" : "text-black";
  const ICON_COLOR = isDarkMode ? "white" : "black";
  const BORDER_COLOR = isDarkMode ? "border-gray-700" : "border-gray-300";
  const MUTED_TEXT = isDarkMode ? "text-gray-400" : "text-gray-600";
  const BUTTON_BG = isDarkMode ? "bg-white" : "bg-black";
  const BUTTON_TEXT = isDarkMode ? "text-black" : "text-white";
  const [tweets, setTweets] = useState(null)
  const [loading, setloading] = useState(false)
const lastTweetsRef = useRef(null);
  // const getUserTW = async () => {
  //   const tw = await fetchAllTweets(userdeets?.uid)
  //   // console.log('tw_', JSON.stringify(tw, null, 2))
  //   tw && setTweets(tw);
  // }

  const getUser= async (uid) => {
    setloading(true)
    const usr = await getUserDetails(uid)
    setloading(false);
    usr?.uid && setuserdeets(usr);
  }


  useEffect(() => {
    if (userdeets) {
       // Cache last tweets
  
      const unsubscribe = listenForTweets(userdeets?.uid, (newTweets) => {
        if (JSON.stringify(newTweets) !== JSON.stringify(lastTweetsRef.current)) {
          setTweets(newTweets);
          lastTweetsRef.current = newTweets; // Update cache
        }
      });
  
      return () => unsubscribe(); // Cleanup on unmount
    }
  }, [userdeets]);
  
  

  useEffect(() => {
    if(!userid && userdeets_) {
      console.log('userdeets_', userdeets_?.bannerUrl)
      setuserdeets(userdeets_)
    }
    if(userid) {     
      if(userid == userdeets_?.uid){ setuserdeets(userdeets_); return}
      
      getUser(userid)
    }
    
  }, [userdeets_])
  

  const editProfile = () => {
    navigation.navigate("EditProfileScreen");
  }


  if (!userdeets || loading) {
    return <View className='text-center flex-1 items-center justify-center'>
    {
      loading ? <ActivityIndicator /> : <Text className='text-red-900 font-extrabold text-2xl'>Invalid User</Text>
    }
    
    </View>;
  }

  return (
     <ImageOpenDrawer
      showImage={true}
      icon={<Ionicons name="settings-outline" size={24} color={theme.text} />}
      showTabs={false}
      showHeader={false}
    >
    <ScrollView className={`flex-1 ${BACKGROUND_COLOR}`}>
      
      <View className="relative h-40">
        <View>
          {userdeets?.bannerUrl ?
            <Image source={{ uri: userdeets?.bannerUrl }} className="w-full h-full" />
            :
            <View className='bg-gray-400 w-full h-full items-center justify-center'>
              <MaterialCommunityIcons name="image-plus" size={24} color={theme?.text} />
            </View>
          }
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-4 top-4 p-2 bg-black/40 rounded-full">
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View className="flex-row justify-between items-end px-4 -mt-10">
        <Image source={{ uri: profilePicture }}
          className={`w-20 h-20 rounded-full border-4 mb-4 ${mode == "light" ? "border-white" : "border-black"}`}
        />
        <View className=''>
          <TouchableOpacity onPress={editProfile} className={`px-4 py-2 h-10  border ${mode == "dark" ? "border-gray-200" : "border-gray-400"} rounded-full`}>
            <Text className={`${TEXT_COLOR} font-semibold`}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* User Info */}
      <View className="px-4 mt-2">
        <Text className={`text-xl font-bold ${TEXT_COLOR}`}>{userdeets?.name}</Text>
        <Text className={`text-base mb-2 ${MUTED_TEXT}`}>@{userdeets?.username}</Text>
        {userdeets?.bio &&
          <Text className={`mt-0 ${TEXT_COLOR} text-lg`}>
            {userdeets?.bio}
          </Text>
        }
        {userdeets?.location &&
          <View className="flex-row gap-x-2  mt-1">
            <MaterialCommunityIcons name="map-marker-outline" size={18} color={ICON_COLOR} />
            <Text className={`text-base ${MUTED_TEXT}`}>{userdeets?.location}</Text>
          </View>
        }

        {userdeets?.website &&
          <View className="flex-row gap-x-2  mt-1">
            <Ionicons name="globe-outline" size={15} color={ICON_COLOR} />
            <Text className={`text-base ${MUTED_TEXT}`}>{userdeets?.website}</Text>
          </View>
        }

        {userdeets?.createdAt &&
          <View className="flex-row gap-x-2  mt-1">
            <MaterialCommunityIcons name="calendar" size={16} color={ICON_COLOR} />
            <Text className={`text-base ${MUTED_TEXT}`}>Joined {formatDateToMonthYear(userdeets?.createdAt)}</Text>
          </View>
        }
      </View>

      {/* Profile Stats */}
      <View className="flex-row gap-x-6 px-4 mt-2">
        <Text className={`${TEXT_COLOR}`}>
          <Text className="font-bold">{userdeets?.followingCount}</Text> Following
        </Text>
        <Text className={`${TEXT_COLOR}`}>
          <Text className="font-bold">{userdeets?.followersCount}</Text> Followers
        </Text>
      </View>

      {/* Posts Section */}
      <View className="px-4 mt-4 border-t border-gray-700">
        <Text className={`text-lg font-bold py-2 ${TEXT_COLOR}`}>Posts</Text>

        {!tweets && <ActivityIndicator />}


      </View>
      <FlatList
        data={tweets}
        keyExtractor={(item) => item.id}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <Tweets tweet={item} />
        )}
      />
    </ScrollView>
     </ImageOpenDrawer>
  );

};

export default ProfileScreen;
