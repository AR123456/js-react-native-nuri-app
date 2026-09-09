import { StyleSheet, Text, View } from "react-native";
import React from "react";
type MacroCardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};
// confusing name - square for each macro nutrient and cals
const MacroCard = ({ label, value, goal, color }: MacroCardProps) => {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.goal}>/ {goal}</Text>
    </View>
  );
};

export default MacroCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    width: "47%",
    borderLeftWidth: 4,
  },
  label: {
    fontSize: 14,
    color: "#a0a0b0",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
  },
  goal: {
    fontSize: 14,
    color: "#a0a0b0",
    marginTop: 2,
  },
});
