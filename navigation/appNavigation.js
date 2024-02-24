import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Homescreen from '../screens/Homescreen'
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();


const Appnavigation = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{ headerShown: false }} component={Homescreen} />
      <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
      <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
      <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default Appnavigation