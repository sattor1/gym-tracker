import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { ThemedInput } from "@/components/themed-input";
import { ThemedButton } from "@/components/themed-button";
import { useFetch } from "@/hooks/use-fetch";

export default function SignIn() {
  const [username, onChangeUsername] = useState<string | undefined>();
  const [password, onChangePassword] = useState<string | undefined>();
  const { data, loading, error, post } = useFetch();

  const onPressButton = async () => {
    await post("auth/login", {
      body: {
        login: username,
        password,
      },
    });
    console.log("error:", error);
    console.log("data:", data);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Auth</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedInput
          value={username}
          onChangeText={onChangeUsername}
          placeholder="Username"
          size="large"
        />
        <ThemedInput
          value={password}
          onChangeText={onChangePassword}
          placeholder="Password"
          size="large"
        />
      </ThemedView>

      <ThemedButton
        fullWidth
        type="secondary"
        size="large"
        loading={loading}
        onPress={onPressButton}
      >
        Login
      </ThemedButton>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 5,
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
