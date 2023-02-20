import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(null);

  const requestPermission = async () => {
    const permission = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(permission.status === "granted");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  if (cameraPermission == null) {
    return (
      <View style={styles.information}>
        <Text>Waiting for permission to use the camera</Text>
      </View>
    );
  } else if (cameraPermission === false) {
    return (
      <View style={styles.information}>
        <Text>Does not have permission to use the camera</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Keijo</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  information: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
