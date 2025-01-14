import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

//////////////////Screens/////////////////////
import AuthNav from './src/navigation/AuthNav/AuthNav';
import Drawerroute from './src/navigation/Drawer/Drawer';
import CategoryItem from './src/screens/StackScreen/Categories/CategoryItem';
import MyPosts from './src/screens/StackScreen/MyGear/MyPosts';
import MyAccount from './src/screens/StackScreen/MyGear/MyAccount';
import ItemDetails from './src/screens/StackScreen/Dashboard/ItemDetails';
import OtherProfile from './src/screens/StackScreen/Dashboard/Othersprofile';
import UploadItem from './src/screens/StackScreen/Sell/UploadItem';
import ChatScreen from './src/screens/Drawer/Chat/ChatScreen';
import EditProfile from './src/screens/StackScreen/MyGear/EditProfile';
import AllFollowers from './src/screens/StackScreen/MyGear/AllFollowers';
import AllFollowings from './src/screens/StackScreen/MyGear/AllFollowings';
import MerchandiseDetails from './src/screens/StackScreen/Drawer/MerchandiseDetail';
import DailyDealsDetails from './src/screens/StackScreen/Drawer/DailyDealsDetail';
import SearchResults from './src/screens/StackScreen/Search/SearchResults';

const Stack = createNativeStackNavigator();
function App() {
  const [initialRoute, setInitialRoute] = React.useState('Home');

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Drawerroute"
            component={Drawerroute}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CategoryItem"
            component={CategoryItem}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MyPosts"
            component={MyPosts}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MyAccount"
            component={MyAccount}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ItemDetails"
            component={ItemDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OtherProfile"
            component={OtherProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UploadItem"
            component={UploadItem}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AllFollowers"
            component={AllFollowers}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AllFollowings"
            component={AllFollowings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MerchandiseDetails"
            component={MerchandiseDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DailyDealsDetails"
            component={DailyDealsDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchResults"
            component={SearchResults}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
