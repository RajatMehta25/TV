import { Image, StyleSheet, Platform, ScrollView } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TvCard } from "@/components/TvCard";
import { useEffect, useState } from "react";

type MyData = {
  link: string;
  channel_name: string;
};

export default function HomeScreen() {
  const [data, setData] = useState<MyData[] | null>([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/RajatMehta25/TV/main/football_channels.json")
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);
  return (
    <ThemedView style={styles.MainContainer}>
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome to Rajat Tv App!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.paddingTitle}>
            All Channels
          </ThemedText>
          {/* <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">{Platform.select({ ios: "cmd + d", android: "cmd + m" })}</ThemedText> to open
          developer tools.
        </ThemedText> */}
        </ThemedView>
        <ThemedView style={styles.CardsMap}>
          {data?.map((ele, i) => (
            <TvCard key={ele.channel_name + i} Channel={ele.channel_name} URL={ele.link} />
          ))}
          {/* {data[0]?.link} */}
          {/* {<TvCard />} */}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // alignItems: "center",
    gap: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
  },
});
