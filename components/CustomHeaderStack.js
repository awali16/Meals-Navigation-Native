import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./IconButton";
import { useSelector, useDispatch } from "react-redux";
import { likeMeal, dislikeMeal } from "../store/redux/liked";
import { useContext } from "react";
import { FavouritesContext } from "../store/context/favourites-Context";

const CustomHeaderStack = ({ title = "Custom Title", navigation, showIcons, route }) => {
    const MealId=route?.MealId;
    const favouritesCtx = useContext(FavouritesContext);
    const likedMealIds = useSelector((state) => state.likedMeals);
    const dispatch = useDispatch();
    const MealIsFavourite = favouritesCtx.ids.includes(MealId);
    const MealIsLiked = likedMealIds.ids.includes(MealId);

    function changeFavouriteStatusHandler() {
        if (MealIsFavourite) {
            favouritesCtx.removeFavourite(MealId);
        } else {
            favouritesCtx.addFavourite(MealId);
        }
    }
    function changeLikedStatusHandler() {
        if (MealIsLiked) {
            dispatch(dislikeMeal({ id: MealId }));
        } else {
            dispatch(likeMeal({ id: MealId }));
        }
    }
    return (
        <View style={styles.header}>
            <View style={styles.iconTitleContainer}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="white"
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>{title}</Text>
            </View>
            {showIcons && (
                <View style={styles.iconContainer}>
                    <IconButton
                        name={MealIsLiked ? "heart" : "heart-outline"}
                        color="red"
                        onPress={changeLikedStatusHandler}
                    />
                    <IconButton
                        name={MealIsFavourite ? "star" : "star-outline"}
                        color="gold"
                        onPress={changeFavouriteStatusHandler}
                    />
                </View>)}
            {/* <View style={{ width: 24 }} /> For spacing on the right */}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: "#351401",
        gap: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 15,
        paddingBottom: 15,
    },
    iconTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
    },
    title: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
    }
});

export default CustomHeaderStack;
