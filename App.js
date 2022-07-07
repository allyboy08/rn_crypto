import { StatusBar } from 'expo-status-bar';
import { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthContextProvider, {AuthContext} from './store/auth-context';
import WatchlistProvider from './store/watch-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import IconButton from './components/ui/IconButton';
import AppLoading from 'expo-app-loading';
// import {Ionicons} from '@expo/vector-icons'

// import AllCoins from './screens/AllCoins';
// import WatchList from './screens/WatchList'
// import ProfileScreen from './screens/Auth/Profile';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
// import Search from './screens/Search';
// import Details from './screens/Details';
import Navigation from './navigation';

const Stack = createNativeStackNavigator();
// const BottomTabs = createBottomTabNavigator();

function Auth() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: 'blue' },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: '#181818' },
    }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      
    </Stack.Navigator>
  );
}

// function Authenticated() {
//   const authCtx = useContext(AuthContext);
//   return (
//     <BottomTabs.Navigator
//     screenOptions={{
      
//       tabBarActiveTintColor: "white",
//         tabBarInactiveTintColor: "grey",
//         tabBarStyle: {
//           backgroundColor: "#181818",
//         },
//     }}
//     >
//       <BottomTabs.Screen name='Home' component={Search} options={{
//         tabBarIcon: ({color, size}) => <Ionicons name='home' color={color} size={size} />
//       }}/>
//       <BottomTabs.Screen name='Favourites' component={WatchList} options={{
//         tabBarIcon: ({color, size}) => <Ionicons name='star' color={color} size={size} />
//       }}/>
//       <BottomTabs.Screen 
//         name="Welcome"
//         component={ProfileScreen}
//         options={{
//           headerRight: ({ tintColor }) => (
//             <IconButton
//               icon="exit"
//               color={tintColor}
//               size={24}
//               onPress={authCtx.logout}
//             />
//           ),
//           tabBarIcon: ({color, size}) => <Ionicons name="exit" color={color} size={size}  />
//         }}
//       />
//       </BottomTabs.Navigator>
//   )
// }

// function Modal() {
//   return (
//     <Stack.Navigator screenOptions={{
//       headerStyle: {backgroundColor: "grey"},
//       headerTintColor: 'white',
//     }} >
//       <Stack.Screen name='Details' component={Details} options={{
//         presentation: 'modal',
//       }}/>
//     </Stack.Navigator>
//   )
// }

function Navigating() {
  const authCtx = useContext(AuthContext);

  return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <Auth />}
        {authCtx.isAuthenticated && <Navigation />}
      </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function fetchToken() {
        const storedToken = await AsyncStorage.getItem('token')

        if (storedToken) {
            authCtx.authenticate(storedToken)
        }

        setIsTryingLogin(false)
    }

    fetchToken();
  }, [])

  if (isTryingLogin) {
    return <AppLoading />
  }

  return <Navigating />
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <WatchlistProvider>
          <Root />
        </WatchlistProvider>
      </AuthContextProvider>
    </>
  );
}