import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import AddVideo from '../screens/AddVideo'
import Feed from '../screens/Feed'

const Tab = createBottomTabNavigator()

export default function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={{

      }}
    >
        <Tab.Screen name="create" component={AddVideo} />
        <Tab.Screen name="feed" component={Feed} options={{headerShown : false}} />
    </Tab.Navigator>
  )
}