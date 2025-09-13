import * as React from 'react'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import { useSignUp, useAuth } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const { isSignedIn } = useAuth()
    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState(false);
    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')
    const [error, setError] = React.useState('')

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        setIsLoading(true)
        setError('')
        try {
            await signUp.create({
                emailAddress,
                password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setPendingVerification(true)
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
            setError(err.errors?.[0]?.message || 'An error occurred during sign up')
        } finally {
            setIsLoading(false)
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        setIsLoading(true)
        setError('')
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                // Auth state change will trigger redirect in layout
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2))
                setError('Verification failed. Please try again.')
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
            setError(err.errors?.[0]?.message || 'Invalid verification code')
        } finally {
            setIsLoading(false)
        }
    }

    if (pendingVerification) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <View className="flex-1 px-6">
                        {/* Back Button */}
                        <View className="pt-4 pb-2">
                            <TouchableOpacity
                                onPress={() => {
                                    setPendingVerification(false)
                                    setCode('')
                                    setError('')
                                }}
                                className="flex-row items-center"
                            >
                                <Ionicons name="arrow-back" size={24} color="#374151" />
                                <Text className="ml-2 text-gray-700 text-lg">Back to Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View className="flex-1 justify-center">
                            {/* Logo/Branding */}
                            <View className="items-center mb-8">
                                <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                                    <Ionicons name="mail" size={40} color="white" />
                                </View>
                                <Text className="text-3xl font-bold text-gray-900 mb-2">
                                    Check Your Email
                                </Text>
                                <Text className="text-lg text-gray-600 text-center">
                                    We've sent a verification code to{"\n"}
                                    {emailAddress}
                                </Text>
                            </View>

                            {/* Verification Card */}
                            <View className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 items-center">
                                <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
                                    Enter Verification Code
                                </Text>
                                <Text className="text-base text-gray-500 text-center mb-6">
                                    Please enter the 6-digit code sent to your email
                                </Text>

                                {/* Code Input */}
                                <View className="w-full mb-6">
                                    <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200 shadow-sm">
                                        <Ionicons name="key-outline" size={20} color="#9CA3AF" />
                                        <TextInput
                                            value={code}
                                            placeholder="Enter 6-digit code"
                                            placeholderTextColor="#9CA3AF"
                                            onChangeText={setCode}
                                            className="flex-1 ml-3 text-gray-900 text-center text-lg tracking-widest"
                                            keyboardType="number-pad"
                                            maxLength={6}
                                            editable={!isLoading}
                                        />
                                    </View>
                                </View>

                                {/* Error Display */}
                                {error ? (
                                    <View className="w-full mb-4 p-3 bg-red-100 rounded-lg border border-red-300">
                                        <Text className="text-red-700 text-center">{error}</Text>
                                    </View>
                                ) : null}

                                {/* Verify Button */}
                                <TouchableOpacity
                                    onPress={onVerifyPress}
                                    disabled={isLoading}
                                    className={`w-full rounded-xl py-4 shadow-sm mb-4 ${isLoading ? "bg-gray-400" : "bg-green-600"}`}
                                    activeOpacity={0.8}
                                >
                                    <View className="flex-row items-center justify-center">
                                        {isLoading ? (
                                            <Ionicons name="refresh" size={20} color="white" />
                                        ) : (
                                            <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                                        )}
                                        <Text className="text-white font-semibold text-lg ml-2">
                                            {isLoading ? "Verifying..." : "Verify Email"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="flex-1 px-6">
                    <View className="flex-1 justify-center">
                        {/* Logo/Branding */}
                        <View className="items-center mb-8">
                            <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                                <Ionicons name="fitness" size={40} color="white" />
                            </View>
                            <Text className="text-3xl font-bold text-gray-900 mb-2">
                                Join FitNeek
                            </Text>
                            <Text className="text-lg text-gray-600 text-center">
                                Start your fitness journey{"\n"}and achieve your goals
                            </Text>
                        </View>

                        {/* Sign up form */}
                        <View className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
                            <Text className="text-3xl font-bold text-gray-900 mb-8 text-center mt-2">
                                Create Your Account
                            </Text>

                            {/* Email Input */}
                            <View className="mb-4">
                                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                                    <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
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
                            <View className="mb-6">
                                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                                    <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
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

                            {/* Error Display */}
                            {error ? (
                                <View className="mb-4 p-3 bg-red-100 rounded-lg border border-red-300">
                                    <Text className="text-red-700 text-center">{error}</Text>
                                </View>
                            ) : null}

                            {/* Sign Up Button */}
                            <TouchableOpacity
                                onPress={onSignUpPress}
                                disabled={isLoading}
                                className={`rounded-xl py-4 mb-4 ${isLoading ? "bg-gray-400" : "bg-blue-600"}`}
                            >
                                <Text className="text-white font-semibold text-lg text-center">
                                    {isLoading ? "Creating Account..." : "Create Account"}
                                </Text>
                            </TouchableOpacity>

                            {/* Sign In Link */}
                            <View className="flex-row justify-center">
                                <Text className="text-gray-600">Already have an account? </Text>
                                <Link href="/sign-in" asChild>
                                    <TouchableOpacity>
                                        <Text className="text-blue-600 font-semibold">Sign In</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
