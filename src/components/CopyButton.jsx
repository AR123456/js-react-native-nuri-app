import { Ionicons } from "@expo/vector-icons";
// getting clipboard from expo
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Meal } from "@/storage/meals";
import { colors } from "@/styles/global";

type CopyButtonProps = {
  meals: Meal[];
};

const CopyButton = ({ meals }: CopyButtonProps) => {
  // handle copy
  const handleCopy = async () => {
    const totals = meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
    // summary to return
    const summary = `MacroZone Daily Summary\n\nCalories: ${totals.calories}\nProtein: ${totals.protein}g\nCarbs: ${totals.carbs}g\nFat: ${totals.fat}g\n\nMeals: ${meals.length} logged today`;
    await Clipboard.setStringAsync(summary);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Copied!", "Macro summary copied to clipoard.");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCopy}>
      <Ionicons name="copy-outline" size={18} color={colors.primary} />
      <Text style={styles.text}>Copy Summary</Text>
    </TouchableOpacity>
  );
};

export default CopyButton;
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
  },
});
