import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ImageOpenDrawer from "components/navigation/ImageOpenDrawer";
import { notifications } from "utils/helpers";

const SearchScreen = () => {
  const { mode, theme } = useSelector((state) => state.theme); 
  const API_URL = 'https://twitter-trending-hashtags-topics.p.rapidapi.com/trends?woeid=23424908';
  const CACHE_KEY = 'twitter_trendsn';
  const CACHE_EXPIRY = 10 * 60 * 1000; 

  const fetchTrends = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          return data;
        }
      }

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
          'x-rapidapi-host': 'twitter-trending-hashtags-topics.p.rapidapi.com',
        },
      });
      const result = await response.json();
      if (result.length > 0) {
        const trends = result[0].trends;
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ data: trends, timestamp: Date.now() }));
        return trends;
      }
    } catch (error) {
      console.log('Error fetching trends:', error);
    }
    return [];
  };

  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetchTrends().then(setTrends);
  }, []);

  return (
    <ImageOpenDrawer
      text={"Search eX"}
      isSearch={true}
      showImage={false}
      icon={<Ionicons name="settings-outline" size={24} color={theme.text} />}
      showTabs={true}
      showFab={true}
    >


      <View style={{ flex: 1, backgroundColor: mode == "dark" ? '#000' : '#fff', padding: 10 }}>
        <Text style={{ color: mode == "dark" ? '#fff' : '#000', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Trending Topics</Text>
        <FlatList
          data={trends}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => console.log('Open:', item.url)}>
              <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: mode == "dark" ? '#444' : '#ccc' }}>
                <Text style={{ color: mode == "dark" ? '#fff' : '#000', fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                {item.tweet_volume && (
                  <Text style={{ color: mode == "dark" ? '#aaa' : '#555', fontSize: 12 }}>{item.tweet_volume.toLocaleString()} tweets</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageOpenDrawer>
  );

};

export default SearchScreen;
