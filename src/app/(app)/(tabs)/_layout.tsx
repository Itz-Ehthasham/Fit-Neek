import { Tabs } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from '@expo/vector-icons/FontAwesome';
function Layout() {
  return <Tabs>
    <Tabs.Screen name="index" options={{headerShown: false, title: "Home",
        
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="home-sharp" size={24} color="black" />
        },
         }}
          />

   <Tabs.Screen 
   name="exercises"
    options={{
        headerShown: false,
         title: "Exercises",
        tabBarIcon: ({color, size}) => {
           return <AntDesign name="book" color="black" size={24} />
        },
    }}
   />

    <Tabs.Screen name="workout" 
    options={{
        headerShown: false,
         title: "Workout",
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="barbell" size={24} color="black" />
        },
    }}
     />

   <Tabs.Screen name="active-workout"
   options={{
    headerShown: false,
     title: "Active Workout",
    href: null,
    tabBarStyle: {display: "none",

    },
}}
/>

<Tabs.Screen name="history"
    options={{
        headerShown: false,
         title: "History",
        tabBarIcon: ({color, size}) => {
          return <FontAwesome name="history" size={24} color="black" />
        },
    }}
     />

<Tabs.Screen name="profile"
    options={{
        headerShown: false,
         title: "Profile",

        tabBarIcon: ({color, size}) => {
          return <Ionicons name="person-circle-sharp" 
          size={24} color="black" />
        },
    }}
     /> 
   </Tabs>
  
}

export default Layout