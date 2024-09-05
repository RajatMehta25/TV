import { Tabs, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import WebView from "react-native-webview";
import { ExternalLink } from "@/components/ExternalLink";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator, View } from "react-native";

export default function Nowplaying({}) {
  const colorScheme = useColorScheme();
  const local = useLocalSearchParams();
  return (
    <>
      <ThemedView style={{ flex: 1 }}>
        <WebView
          allowsFullscreenVideo
          allowsAirPlayForMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          startInLoadingState={true}
          source={{
            uri: `${local.URL ? local.URL : "https://koora.vip/share.php?ch=main_1"}`,
          }}
        />
      </ThemedView>
    </>
  );
}
