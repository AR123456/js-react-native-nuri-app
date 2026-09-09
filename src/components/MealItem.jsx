import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { deleteMeal } from "@/storage/meals";

import { colors } from "@/styles/global";

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDelete: () => void;
};

// take meal name and its macros , display it
const MealItem = ({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  onDelete,
}: MealItemProps) => {
  const handleLongPress = () => {
    Alert.alert("Delete Meal", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteMeal(id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          // const triggerHaptic = async () => {
          //   console.log("Haptic feedback triggered: Success");
          //   await Haptics.notificationAsync(
          //     Haptics.NotificationFeedbackType.Success,
          //   );
          // };
          // triggerHaptic();
          onDelete();
        },
      },
    ]);
  };
  const handleEdit = () => {
    router.push({ pathname: "/edit-meal", params: { id } });
    // present the edit screen
    // take the updates from that screen and get them to editMeal in meals.ts
  };
  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>
        {calories} cal • {protein}g P • {carbs}g C • {fat}g F
      </Text>
      <Pressable onPress={handleEdit}>
        <Text style={styles.red}>Edit meal here</Text>
      </Pressable>
    </TouchableOpacity>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#16213e",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  macros: {
    fontSize: 13,
    color: "#a0a0b0",
    marginTop: 4,
  },
  red: { color: "yellow" },
});
