import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function ProfilePage() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace('/sign-in');
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center px-6">
        <Text className="text-2xl font-bold text-center mb-8">Profile</Text>
        
        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-600 rounded-3xl p-5"
          style={{
            shadowColor: '#DC2626',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
          activeOpacity={0.9}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={22} color="white" />
            <Text className="text-white font-black text-lg ml-3">
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
