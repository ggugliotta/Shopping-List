import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from 'react-native';

// Create the navigator 
const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//import screens
import ShoppingLists from './components/ShoppingLists';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const firebaseConfig = {
    // Firebase config information 
  apiKey: "AIzaSyA_BFu1_u9Ek5xEV_SQ76lib8a_RpC9ytY",
  authDomain: "shopping-list-demo-aed63.firebaseapp.com",
  projectId: "shopping-list-demo-aed63",
  storageBucket: "shopping-list-demo-aed63.appspot.com",
  messagingSenderId: "447875894876",
  appId: "1:447875894876:web:0906d0da51a14789602099"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="ShoppingLists"
        >
          {props => <ShoppingLists db={db} {...props} />} 
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;