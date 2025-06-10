import { StatusBar } from "expo-status-bar";
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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomHeaderDrawer from './components/CustomHeaderDrawer';
import CustomHeaderStack from './components/CustomHeaderStack';
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
            header: () => <CustomHeaderDrawer title="All Categories" iconName="list" />,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Favourites"
          component={Favourites}
          options={{
            header: () => <CustomHeaderDrawer title="Favourite Meals" iconName="star" />,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="star" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Liked"
          component={Liked}
          options={{
            header: () => <CustomHeaderDrawer title="Liked Meals" iconName="heart" />,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="heart" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
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
                  options={({ navigation }) => ({
                    header: () => <CustomHeaderStack title="Meals Overview" navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="MealDetails"
                  component={MealDetails}
                  options={({ route, navigation }) => {
                    return {
                      header: () => <CustomHeaderStack
                        title="About the Meal"
                        navigation={navigation}
                        showIcons={true}
                        route={route.params}
                      />
                    }
                  }}
                />
              </Stack.Navigator>
            </FavouritesContextProvider>
          </Provider>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// this is a way of styling a single screen of the app
//  <Stack.Screen name="MealsCategories" component={CategoriesScreen}  options={{title:"All Categories",
//             headerStyle:{backgroundColor: "#351401"},
//             headerTintColor: "white",
//             contentStyle: {backgroundColor:  "#3f2f25"}
//           }}/>


