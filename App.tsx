import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useChangeCamera from "./src/hooks/useChangeCamera";
import useChangeRatio from "./src/hooks/useChangeRatio";

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(null)

  const { cameraType, changeCamera } = useChangeCamera();
  const { ratio, containerRatio, changeRatio } = useChangeRatio()

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
              <View
                style={{
                  position: "absolute",
                  left: "5%",
                  top: "10%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => changeRatio()} // change this to a dedicated button after the settings menu is done
                  style={{
                    backgroundColor: "transparent",
                    height: 24,
                    width: 24,
                  }}
                >
                  <FontAwesome5 name="cog" size={24} color="#cdd6f4" />
                </TouchableOpacity>
              </View>
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
          <TouchableOpacity
            onPress={() => changeCamera()}
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              backgroundColor: "transparent",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              borderColor: "#b4befe",
              borderWidth: 2,
            }}
          >
            <FontAwesome5 name="sync" size={36} color="#cdd6f4" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Capture Image")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              backgroundColor: "#cdd6f4",
              borderColor: "#b4befe",
              borderWidth: 4,
            }}
          />
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
