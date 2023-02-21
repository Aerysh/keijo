import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useChangeCamera from "./src/hooks/useChangeCamera";
import useChangeRatio from "./src/hooks/useChangeRatio";
import RoundedButton from "./src/components/ui/rounded-button";
import SettingsButton from "./src/components/ui/settings-button";

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(null);

  const { cameraType, changeCamera } = useChangeCamera();
  const { ratio, containerRatio, changeRatio } = useChangeRatio();

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
        <View style={{ aspectRatio: containerRatio }}>
          <Camera type={cameraType} style={{ flex: 1 }} ratio={ratio}>
            <View
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "transparent",
                flexDirection: "row",
              }}
            >
              <SettingsButton onPress={() => changeRatio()} />
            </View>
          </Camera>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#1e1e2e",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: 20,
          }}
        >
          <RoundedButton
            onPress={() => changeCamera()}
            icon="sync"
            iconSize={36}
            iconColor="#cdd6f4"
          />

          <RoundedButton
            onPress={() => console.log("Capture Image")}
            width="80px"
            height="80px"
            backgroundColor="#cdd6f4"
          />

          {/* change the child of this component to a preview of the most recently taken photo */}
          <TouchableOpacity
            onPress={() => console.log("Open Image Preview")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              backgroundColor: "#cdd6f4",
            }}
          />
        </View>
        <StatusBar style="light" />
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
  },
});
