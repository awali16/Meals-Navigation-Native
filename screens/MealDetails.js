import { useLayoutEffect, useContext } from "react";
import { Image, Text, View, ScrollView, StyleSheet } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealInfo from "../components/MealInfo";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavouritesContext } from "../store/context/favourites-Context";
import { useSelector, useDispatch } from "react-redux";
import { likeMeal, dislikeMeal } from "../store/redux/liked";
function MealDetails({ route }) {
  const mealId = route.params.MealId;
  const SelectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: SelectedMeal.imageUrl }} />
      <Text style={styles.title}>{SelectedMeal.title}</Text>
      <MealInfo
        duration={SelectedMeal.duration}
        complexity={SelectedMeal.complexity}
        affordability={SelectedMeal.affordability}
        detailText={styles.detailText}
      />
      <View style={styles.listContainerOuter}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={SelectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={SelectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginRight: 15,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainerOuter: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
export default MealDetails;
