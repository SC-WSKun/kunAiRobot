import { StyleSheet } from "react-native";
import AudioScreenInfo from "@/components/AudioScreenInfo";
import { Text, View } from "@/components/Themed";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function AudioScreen() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  return (
    <View style={styles.container}>
      <AudioScreenInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
