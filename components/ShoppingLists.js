import { useState, useEffect } from "react";
import { Alert, StyleSheet, View, FlatList, Text, TextInput, KeyboardAvoidingView, TouchableOpacity  } from "react-native";
import { collection, getDocs, addDoc, onSnapshot, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ShoppingLists = ({ db, route }) => {
  const { userID } = route.params;

 const [lists, setLists] = useState([]);
 const [listName, setListName] = useState("");
 const [item1, setItem1] = useState("");
 const [item2, setItem2] = useState("");

  const listsDocuments = await getDocs(collection(db, 'shoppinglists'));
  let newLists = [];
  listsDocuments.forEach(docObject => {
    newLists.push({ id: docObject.id, ...docObject.data()});
  });
  setLists(newLists)
 }

useEffect(() => {
   const q = query(collection(db, "shoppinglists"), where("uid", "==", userID));
   const unsubShoppinglists = onSnapshot(q, async (documentsSnapshot) => {
      let newLists = [];
      documentsSnapshot.forEach(doc => {
        newLists.push({ id: doc.id, ...doc.data() })
      });
      cacheShopppingLists(newLists)
      setLists(newLists);
   });

 
    // Clean up code
    return () => {
      if (unsubShoppinglists) unsubShoppinglists();
    }
  }, []);

  const cacheShoppingLists = async (listsToCache) => {
    try {
      await AsyncStorage.setItem("shopping_lists", JSON.stringify(newLists));
    } catch (error) {
      console.log(error.message);
    }
  }

 return (
    <View style={styles.container}>
      <FlatList 
        style={styles.listsContainer}
        data={lists}
        renderItem={({ item }) => 
          <View styles={styles.listItem}>
            <Text>{item.name}: {item.items.join(",")}</Text>
          </View>
        }
      />
      <View style={styles.listForm}>
        <TextInput
          style={styles.listName}
          placeholder="List Name"
          value={listName}
          onChangeText={setListName}
        />
        <TextInput 
          style={styles.item}
          placeholder="Item #1"
          value={item1}
          onChangeText={setItem1}
        />
        <TextInput 
          style={styles.item}
          placeholder="Item #2"
          value={item2}
          onChangeText={setItem2}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            const newList = {
              uid: userID,
              name: listName,
              items: [item1, item2]
            }
            addShoppingList(newList);
           }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior ="padding" /> : null}
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listItem: {
      height: 70,
      justifyContent: "center",
      paddingHorizontal: 30,
      borderBottomWidth: 1,
      borderBottomColor: "#AAA",
      flex: 1,
      flexGrow: 1
    },
    listForm: {
      flexBasis: 275,
      flex: 0,
      margin: 15,
      padding: 15,
      backgroundColor: "#CCC"
    },
    listName: {
      height: 50,
      padding: 15,
      fontWeight: "600",
      marginRight: 50,
      marginBottom: 15,
      borderColor: "#555",
      borderWidth: 2
    },
    item: {
      height: 50,
      padding: 15, 
      marginLeft: 50,
      marginBottom: 15,
      borderColor: "#555",
      borderWidth: 2
    },
    addButton: {
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      backgroundColor: "#000",
      color: "#FFF"
    },
    addButtonText: {
      color: "#FFF",
      fontWeight: "600",
      fontSize: 20
    }
});

export default ShoppingLists;