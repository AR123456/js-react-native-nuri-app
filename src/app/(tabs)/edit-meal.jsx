import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
// import { Ionicons } from "@expo/vector-icons";
// need router and the meals handler
import { editMeal, getMeals } from "@/storage/meals";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, globalStyles } from "@/styles/global";

export default function EditMealScreen() {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  useEffect(() => {
    const loadMeal = async () => {
      const meals = await getMeals();
      const meal = meals.find((m) => m.id === id);

      if (!meal) {
        Alert.alert("Error", "Meal not found.");
        router.push("/");
        return;
      }

      setName(meal.name);
      setCalories(String(meal.calories));
      setProtein(String(meal.protein));
      setCarbs(String(meal.carbs));
      setFat(String(meal.fat));
    };

    loadMeal();
  }, [id]);

  const handleEditMeal = async () => {
    if (!name || !calories) {
      Alert.alert("Error", "Please enter a meal name and calories.");
      return;
    }

    await editMeal(id, {
      name,
      // get user input cast as number
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    });

    // clear from state after adding to storage
    setName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // const triggerHaptic = async () => {
    //   console.log("Haptic feedback triggered: Success");
    //   await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // };
    // triggerHaptic();
    Alert.alert("Success", "Edited added successfully!");
    // redirect to home
    router.push("/");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Edit Meal</Text>

      <TextInput
        style={styles.input}
        placeholder={name}
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Calories"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Protein (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={protein}
          onChangeText={setProtein}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Carbs (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={carbs}
          onChangeText={setCarbs}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Fat (g)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={fat}
          onChangeText={setFat}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleEditMeal}>
        <Text style={styles.buttonText}>Save Updates Meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
