import { View, type ViewProps, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import WebView from "react-native-webview";
import { Navigator } from "expo-router";
import "./TvCard.css";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};
export type TvCardProps = ThemedViewProps & {
  Channel?: string;
  URL?: string;
};

export function TvCard({ style, lightColor, darkColor, Channel, URL, ...otherProps }: TvCardProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return (
    <Link
      href={{
        pathname: "/Nowplaying",
        params: { URL: URL },
      }}
      className="CardContainerHover"
      style={[styles.CardContainer]}
    >
      {" "}
      {Channel}
    </Link>
  );
}

const styles = StyleSheet.create({
  CardContainer: {
    // flexDirection: "column",
    // alignItems: "center",
    textAlign: "center",
    // gap: 8,
    width: "100%",
    textTransform: "capitalize",
    backgroundColor: "grey",
    borderWidth: 1,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    borderRadius: 5,
    borderColor: "white",
    padding: 8,
    cursor: "pointer",
    color: "white",
    fontWeight: "900",
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
});
