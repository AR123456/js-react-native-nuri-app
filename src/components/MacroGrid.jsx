import { StyleSheet, View } from "react-native";
import { Meal } from "@/storage/meals";
import MacroCard from "./MacroCard";

type MacroGridProps = {
  meals: Meal[];
};
// confusing name this is a card like container for the meal all the macro nutrients shown in a card like component

const MacroGrid = ({ meals }: MacroGridProps) => {
  // add up macronutrients - array reduce method
  // array.reduce((accumulator, currentValue, currentIndex, array) => {
  // Return the updated accumulator
  // }, initialValue);
  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  );
  return (
    <View style={styles.grid}>
      <MacroCard
        label="Calories"
        value={`${totals.calories}g`}
        goal="2,000"
        color="#ff6b6b"
      />
      <MacroCard
        label="Protein"
        value={`${totals.protein}g`}
        goal="150g"
        color="#4ecdc4"
      />
      <MacroCard
        label="Carbs"
        value={`${totals.carbs}g`}
        goal="250g"
        color="#ffd93d"
      />
      <MacroCard
        label="Fat"
        value={`${totals.fat}g`}
        goal="65g"
        color="#6bcb77"
      />
    </View>
  );
};

export default MacroGrid;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
