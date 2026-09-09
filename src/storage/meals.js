import AsyncStorage from "@react-native-async-storage/async-storage";
// define stuff for ts -  shape of a meal object
export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
};
// asyncstorage will store meals in array with meals key
const MEALS_KEY = "meals";
// get meals
// fetch whatever's stored, If so, If nothing's(first launch), returns an empty array []
export const getMeals = async (): Promise<Meal[]> => {
  const data = await AsyncStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};
// addmeal- create here call elsewhere
export const addMeal = async (
  //loads the existing meals array
  meal: Omit<Meal, "id" | "createdAt">,
): Promise<Meal> => {
  const meals = await getMeals();
  //Builds the new meal object by spreading your input and adding a generated id (current timestamp as a string) and createdAt (ISO date string)
  const newMeal: Meal = {
    ...meal,
    //Saves the updated array back — notice [newMeal, ...meals] puts the new meal first, so the list stays newest-first
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...meals]));
  //Returns the completed meal object so the caller can use it
  return newMeal;
};
// eventually called with long press
export const deleteMeal = async (id: string): Promise<void> => {
  const meals = await getMeals();
  const filtered = meals.filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(filtered));
};
// clear meals set fresh each day
export const clearAllMeals = async (): Promise<void> => {
  await AsyncStorage.removeItem(MEALS_KEY);
};
// TODO edit meal - when pencil button clicked go to Edixt meal screen which is almost identical in appearance to add-meal.tsx  screen
// exportablel const editMeal
//get meals, filter by the meal id
// present screen to edit
// similar to add meal, put the updated meal in asyncStorage with the same id as original
// call this in
export const editMeal = async (
  id: string,
  updates: Omit<Meal, "id" | "createdAt">,
): Promise<void> => {
  const meals = await getMeals();
  const updatedMeals = meals.map((meal) =>
    meal.id === id ? { ...meal, ...updates } : meal,
  );

  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(updatedMeals));
};
