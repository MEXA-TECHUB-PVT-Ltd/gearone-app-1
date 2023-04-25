import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

////////Screens
import AuthNav from './src/navigation/AuthNav/AuthNav';
import Drawerroute from './src/navigation/Drawer/Drawer';
import CategoryItem from './src/screens/StackScreen/Categories/CategoryItem';

const Stack = createNativeStackNavigator();
function App() {
  const [initialRoute, setInitialRoute] = React.useState('Home');

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          {/* <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{
              headerShown: false,
            }}
          /> */}
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;