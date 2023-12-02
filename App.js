// import react Navigation 
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator 
const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';

//import screens
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome'; 


import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from 'react-native';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  // Check for network connection
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("You have lost your internet connection. Please reconnect to continue using the app.");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
          {props => <ShoppingLists isConnected={connectionStatus.isConnected} db={db} {...props} />} 
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;