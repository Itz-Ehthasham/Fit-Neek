import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    View,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import GoogleSignIn from '../components/GoogleSignin';

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded) return

        setIsLoading(true)
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/(tabs)')
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="flex-1 px-6">
                    {/* Header section */}
                    <View className="flex-1 justify-center">
                        {/* Logo/Branding */}
                        <View className="items-center mb-12">
                            <View className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl items-center justify-center mb-6 shadow-2xl">
                                <Ionicons name="fitness" size={48} color="white" />
                            </View>
                            <Text className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                                FitNeek
                            </Text>
                            <Text className="text-xl text-gray-700 text-center leading-relaxed">
                                Track your fitness journey{"\n"}and reach your goals
                            </Text>
                        </View>
                    </View>

                    {/* Sign in form */}
                    <View className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
                        <Text className="text-3xl font-bold text-gray-900 mb-8 text-center mt-2">
                            Welcome Back
                        </Text>

                        {/* Email Input */}
                        <View className="mb-4">
                            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                                <Ionicons name="mail-outline" size={20} color="#000000ff" />
                                <TextInput
                                    autoCapitalize="none"
                                    value={emailAddress}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#9CA3AF"
                                    onChangeText={setEmailAddress}
                                    className="flex-1 ml-3 text-gray-900"
                                    editable={!isLoading}
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View className="mb-4">
                            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                                <Ionicons name="lock-closed-outline" size={20} color="#000000ff" />
                                <TextInput
                                    value={password}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={true}
                                    onChangeText={setPassword}
                                    className="flex-1 ml-3 text-gray-900"
                                    editable={!isLoading}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Sign In Button */}
                    <TouchableOpacity
                        onPress={onSignInPress}
                        disabled={isLoading}
                        className={`rounded-xl py-4 shadow-sm mb-4 ${isLoading ? "bg-gray-400" : "bg-blue-600"
                            }`}
                        activeOpacity={0.8}
                    >
                        <View className="flex-row items-center justify-center">
                            {isLoading ? (
                                <Ionicons name="refresh" size={20} color="white" />
                            ) : (
                                <Ionicons name="log-in-outline" size={20} color="white" />
                            )}
                            <Text className="text-white font-semibold text-lg ml-2">
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <View className="flex-row items-center my-6 px-6">
                    <View className="flex-1 h-px bg-gray-200" />
                    <Text className="px-4 text-gray-500 text-sm font-medium">or</Text>
                    <View className="flex-1 h-px bg-gray-200" />
                </View>

                {/* Google Sign In */}
                <View className="px-6 mb-6">
                    <GoogleSignIn />
                       {/* Sign Up Link */}
                <View className="flex-row justify-center items-center mt-4">
                    <Text className="text-gray-600">Don't have an account? </Text>
                    <Link href="/sign-up" asChild>
                        <TouchableOpacity>
                            <Text className="text-blue-600 font-semibold">Sign Up</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                </View>

             
                


                {/* Footer section */}
                <View className="pb-8 px-6">
                    <Text className="text-center text-gray-500 text-base">
                        Start your fitness journey today
                    </Text>
                </View>




            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}