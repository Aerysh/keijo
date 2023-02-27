import React, { useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { StyleSheet, Text, View } from "react-native";

export default function App(): React.ReactElement | null {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`);

  if (cameraPermission == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>{cameraPermission}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
