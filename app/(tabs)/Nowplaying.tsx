import { Tabs, useLocalSearchParams } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import WebView from "react-native-webview";
import { ExternalLink } from "@/components/ExternalLink";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Nowplaying({}) {
  const colorScheme = useColorScheme();
  const local = useLocalSearchParams();
  return (
    <WebView
      source={{
        // html: '<iframe width="100%" height="50%" src="https://kisko-ant-design.vercel.app/" frameborder="0"  encrypted-media" allowfullscreen></iframe>',
        //     // uri: `${Link}`,
        uri: `${local.URL ? local.URL : "https://koora.vip/share.php?ch=main_1"}`,
      }}
    />
  );
}
