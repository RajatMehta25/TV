import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TextInput,
  Button,
  Pressable,
  Text,
  PermissionsAndroid,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TvCard } from "@/components/TvCard";
import { useEffect, useState, useCallback, ReactEventHandler } from "react";
import Voice from "@react-native-voice/voice";

type MyData = {
  link: string;
  channel_name: string;
};

export default function HomeScreen() {
  const [data, setData] = useState<MyData[] | null>([]);
  const [filteredData, setFilteredData] = useState<MyData[] | null>([]);

  const [refreshing, setRefreshing] = useState(false);
  const [search, onChangeSearch] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/RajatMehta25/TV/main/football_channels.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setFilteredData(data.data);
        onChangeSearch("");
      });
  }, [refreshing]);

  const searchChannel = (data: MyData[] | null) => {
    let newData = data?.filter((ele) => ele.channel_name.toLowerCase().includes(search.toLowerCase()));

    // setFilteredData(newData ?? data);
    return newData;
  };

  const speechStartHandler = (e: any) => {
    console.log("speechStart successful", e);
  };

  const speechEndHandler = (e: any) => {
    // setLoading(false);
    // console.log("stop handler", e);
    // speechResultsHandler(e);
    // stopRecording();
  };

  const speechResultsHandler = (e: any) => {
    const text = e.value[0];
    // setResult(text);
    onChangeSearch(text);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start("en-Us");
    } catch (error) {
      console.log("error", error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      Voice.removeAllListeners();
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const clear = () => {
    // setResult("");
    onChangeSearch("");
  };
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    // Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechEnd = stopRecording;

    Voice.onSpeechResults = speechResultsHandler;
    const androidPermission = async () => {
      const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    };
    androidPermission();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ThemedView style={styles.MainContainer}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome to Rajat Tv App!</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={[styles.stepContainer, styles.ButtonContainer]}>
            <ThemedText type="subtitle" style={[styles.paddingTitle]}>
              All Channels
            </ThemedText>
            <Button title="TV Refresh" onPress={onRefresh} />
          </ThemedView>
          <ThemedView style={[styles.stepContainer, styles.VoiceContainer]}>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                // if (e) {
                onChangeSearch(e);
                // searchChannel(e);
                // } else {
                // onChangeSearch(e);
                // setFilteredData(data);
                // }
              }}
              value={search}
              placeholder="Search Channel Name"
              placeholderTextColor="white"
            />
            {!isLoading ? (
              <Pressable style={styles.VoiceButton} onPress={startRecording}>
                <Text style={{ fontSize: 25 }}>🎙️</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.VoiceButton}
                onPress={() => {
                  stopRecording();
                  clear();
                }}
              >
                <Text style={{ fontSize: 22 }}>❌</Text>
              </Pressable>
            )}
            {/* <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">{Platform.select({ ios: "cmd + d", android: "cmd + m" })}</ThemedText> to open
          developer tools.
        </ThemedText> */}
          </ThemedView>
          <ThemedView style={styles.CardsMap}>
            {searchChannel(data)?.map((ele, i) => (
              <TvCard key={ele.channel_name + i} Channel={ele.channel_name} URL={ele.link} />
            ))}
            {/* {data[0]?.link} */}
            {/* {<TvCard />} */}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // alignItems: "center",
    gap: 8,
    backgroundColor: "black",
    color: "white",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    gap: 8,
    backgroundColor: "black",
    color: "white",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    backgroundColor: "black",
    color: "white",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  paddingTitle: {
    padding: 15,
  },
  CardsMap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    backgroundColor: "black",
    color: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: "white",
    borderRadius: 50,
    paddingStart: 20,
    flex: 1,
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    alignItems: "center",
  },
  ButtonProp: {
    // flexDirection: "row",
    textAlign: "center",
    borderRadius: 20,
  },
  VoiceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  VoiceButton: {
    borderRadius: 50,
    paddingRight: 30,
  },
});
