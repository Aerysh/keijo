import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { Routes } from "../navigation/routes";
import Reanimated from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import useIsForeground from "../hooks/useIsForeground";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

type Props = NativeStackScreenProps<Routes, "CameraScreen">;

const CameraScreen = ({ navigation }: Props) => {
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);

  const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
    "back"
  );

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  const isForeground = useIsForeground();
  const isFocused = useIsFocused();
  const isActive = isForeground && isFocused;

  const onInitialized = useCallback(() => {
    setIsCameraInitialized(true);
  }, []);

  if (device != null) {
    console.log(
      `Re-rendering camera page with ${
        isActive ? "active" : "inactive"
      } camera.`
    );
  } else {
    console.log("re-rendering camera page without active camera");
  }

  return (
    <View style={styles.container}>
      {device != null && (
        <Reanimated.View style={StyleSheet.absoluteFill}>
          <ReanimatedCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            onInitialized={onInitialized}
          />
        </Reanimated.View>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
