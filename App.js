import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CategoriesScreen from "./screens/CategoriesScreen";
import Meals from "./screens/MealsOverViewScreen";
import MealDetails from "./screens/MealDetails";
import Favourites from "./screens/FavouritesScreen";
import { Ionicons } from "@expo/vector-icons";
import FavouritesContextProvider from "./store/context/favourites-Context";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import Liked from "./screens/LikedScreen";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  function DrawerNavigator() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#351401" },
          headerTintColor: "white",
          sceneContainerStyle: { backgroundColor: "#3f2f25" },
          drawerContentStyle: { backgroundColor: "#351401" },
          drawerInactiveTintColor: "white",
          drawerActiveTintColor: "#351401",
          drawerActiveBackgroundColor: "#e4baa1",
          drawerItemStyle: {
            borderRadius: 6,
          },
        }}
      >
        <Drawer.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            title: "All Categories",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Favourites"
          component={Favourites}
          options={{
            title: "Favourite Meals",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="star" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Liked"
          component={Liked}
          options={{
            title: "Liked Meals",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="heart" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#351401" }}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Provider store={store}>
            <FavouritesContextProvider>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: { backgroundColor: "#351401" },
                  headerTintColor: "white",
                  contentStyle: { backgroundColor: "#3f2f25" },
                }}
              >
                <Stack.Screen
                  name="DrawerScreen"
                  component={DrawerNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MealsOverView"
                  component={Meals}
                //  options={({route, navigation})=>{
                //   const catId=route.params.categoryId;
                //   return {
                //     title: catId,
                //   }
                // }}
                />
                <Stack.Screen
                  name="MealDetails"
                  component={MealDetails}
                  options={{ title: "About the Meal" }}
                />
              </Stack.Navigator>
            </FavouritesContextProvider>
          </Provider>
        </NavigationContainer>
      </SafeAreaView>
  );
}

// this is a way of styling a single screen of the app
//  <Stack.Screen name="MealsCategories" component={CategoriesScreen}  options={{title:"All Categories",
//             headerStyle:{backgroundColor: "#351401"},
//             headerTintColor: "white",
//             contentStyle: {backgroundColor:  "#3f2f25"}
//           }}/>


