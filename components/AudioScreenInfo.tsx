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
  const startRecord = () => {
    console.log("start record");
    Voice.start("zh-CN")
      .then((e) => console.log(e))
      .catch((err) => console.log("speech error:",err));
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
      <Text>hello</Text>
      <Pressable
        style={isPressed ? styles.microBtnPressed : styles.microBtn}
        onPressIn={startRecord}
        onPressOut={stopRecord}
      >
        <Image
          source={require("@/assets/images/Microphone.png")}
          style={styles.microIcon}
        ></Image>
      </Pressable>
      <Text>hello2</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    microIcon: {
        width: 50,
        height: 50,
    },
    microBtn: {
        width: 50,
        height: 50,
        backgroundColor: "blue",
    },
    microBtnPressed: {
        backgroundColor: "red",
    },
});

export default AudioScreenInfo;