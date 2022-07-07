import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';
import {Ionicons} from '@expo/vector-icons'
import IconButton from '../components/ui/IconButton';

import WatchList from '../screens/WatchList';
import ProfileScreen from '../screens/Auth/Profile';
import Search from '../screens/Search';
import HomeScreen from '../screens/Test';


const BottomTabs = createBottomTabNavigator();


function Authenticated() {
    const authCtx = useContext(AuthContext);
    return (
      <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: 'white',
        // headerShown: false,
        tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "grey",
          tabBarStyle: {
            backgroundColor: "#181818",
          },
      }}
      >
        <BottomTabs.Screen name='Home' component={Search} options={{
          title: 'Market',
          tabBarLabel: 'Market',
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
          tabBarIcon: ({color, size}) => <Ionicons name='analytics-sharp' color={color} size={size} />
        }}/>
        <BottomTabs.Screen name='Favourites' component={WatchList} options={{
          tabBarIcon: ({color, size}) => <Ionicons name='star' color={color} size={size} />
        }}/>
        {/* <BottomTabs.Screen name='Search' component={HomeScreen} options={{
          tabBarIcon: ({color, size}) => <Ionicons name='person' color={color} size={size} />
        }}/> */}
        {/* <BottomTabs.Screen 
          name="Welcome"
          component={ProfileScreen}
          options={{
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
            tabBarIcon: ({color, size}) => <Ionicons name="exit" color={color} size={size}  />
          }}
        /> */}
        </BottomTabs.Navigator>
    )
}

export default Authenticated;