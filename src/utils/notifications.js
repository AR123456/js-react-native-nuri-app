import * as Notifications from "expo-notifications";
//   notifications handler
Notifications.setNotificationHandler({
  //
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
// request permissions
export const requestPermissions = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync();

  return status === "granted";
};
// schedule meal reminders
export const scheduleMealReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "MacroZone",
      body: "Don't forget to log your lunch!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 12,
      minute: 10,
    },
  });

  console.log("Lunch reminder scheduled");
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "MacroZone",
      body: "Don't forget to log your dinner!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 0,
    },
  });
};

export const cancelMealReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
