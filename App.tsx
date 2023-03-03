import React, { useCallback, useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "./src/screens/camera-screen";
import { Linking } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App(): React.ReactElement | null {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();
  const [microphonePermisssion, setMicrophonePermission] =
    useState<CameraPermissionStatus>();

  const requestPermission = useCallback(async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestMicrophonePermission();

    if (cameraPermission === "denied" || microphonePermission === "denied")
      await Linking.openSettings();

    setCameraPermission(cameraPermission);
    setMicrophonePermission(microphonePermission);
  }, []);

  useEffect(() => {
    if (
      cameraPermission !== "authorized" ||
      microphonePermisssion !== "authorized"
    )
      requestPermission();
  }, [cameraPermission, microphonePermisssion]);

  if (cameraPermission == null) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarStyle: "dark",
            animationTypeForReplace: "push",
          }}
        >
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
