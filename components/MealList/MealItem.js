import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealInfo from "../MealInfo";
function MealItem({ id, title, imageUrl, duration, complexity, affordability }) {

    const navigate = useNavigation();
    function HandleMealPress(){
        navigate.navigate('MealDetails',  {MealId:id});
    }
    
  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={HandleMealPress}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealInfo duration={duration} complexity={complexity} affordability={affordability}/>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  innerContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: Platform.OS === "android" ? 1 :  0.25,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 8,
    textAlign: "center",
  }

});

export default MealItem;
