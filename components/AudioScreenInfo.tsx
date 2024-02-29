import Voice from "@react-native-voice/voice";
import { Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { Image } from "expo-image";

interface AudioScreenInfoProps {
  // TODO: Add props here
}

const AudioScreenInfo: React.FC<AudioScreenInfoProps> = (
  {
    /* TODO: Destructure props here */
  }
) => {
  const [isPressed, setIsPressed] = useState(false);
  const [userSpeech, setUserSpeech] = useState("");
  const [robotAnswer, setRobotAnswer] = useState("");
  const startRecord = () => {
    console.log("start record");
    Voice.start("zh-CN")
      .then((e) => console.log(e))
      .catch((err) => console.log("speech error:", err));
    setIsPressed(true);
  };

  const stopRecord = () => {
    console.log("stop record");
    Voice.stop();
    setIsPressed(false);
  };

  const onSpeechStartHandler = (e: any) => {
    console.log("Speech started", e);
  };

  const onSpeechEndHandler = (e: any) => {
    console.log("Speech ended", e);
  };

  const onSpeechResultsHandler = (event: any) => {
    console.log("Speech results", event.value);
    setUserSpeech(event.value[0]);
  };

  const onSpeechErrorHandler = (event: any) => {
    console.log("Speech error", event.error);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.userSpeech}>{userSpeech}</Text>
      <Text style={styles.robotAnswer}>{robotAnswer}</Text>
      <Pressable
        style={{...styles.microBtn, ...(isPressed ? styles.microBtnPressed: undefined)}}
        onPressIn={startRecord}
        onPressOut={stopRecord}
      >
        <Image
          source={require("@/assets/images/Microphone.png")}
          style={styles.microIcon}
        ></Image>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userSpeech: {
    width: 300,
    height: 100,
    borderRadius: 10,
    backgroundColor: "lightgray",
    marginBottom: 20,
    padding: 10,
  },
  robotAnswer: {
    width: 300,
    height: 100,
    borderRadius: 10,
    backgroundColor: "lightgray",
    padding: 10,
    marginBottom: 100,
  },
  microIcon: {
    width: 60,
    height: 60,
  },
  microBtn: {
    width: 80,
    height: 80,
    backgroundColor: "blue",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  microBtnPressed: {
    backgroundColor: "red",
  },
});

export default AudioScreenInfo;
