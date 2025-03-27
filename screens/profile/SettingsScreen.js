import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useSelector } from "react-redux";

const SettingsScreen = () => {
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux

  return (
    <SafeAreaView style={{ backgroundColor: theme.background }} className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text style={{ color: theme.text }} className="text-lg font-semibold">
          Settings Screen
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
