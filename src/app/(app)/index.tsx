import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth()

  // Show nothing while loading
  if (!isLoaded) {
    return null
  }

  // Redirect to appropriate screen based on auth status
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />
  } else {
    return <Redirect href="/sign-in" />
  }
}
