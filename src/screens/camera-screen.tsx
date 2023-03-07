import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Camera,
  CameraDeviceFormat,
  frameRateIncluded,
  sortFormats,
  useCameraDevices,
} from "react-native-vision-camera";
import { Routes } from "../navigation/routes";
import Reanimated from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import useIsForeground from "../hooks/useIsForeground";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BUTTON_SIZE, SAFE_AREA, SPACING } from "../constant";
import { CaptureButton } from "../components/ui/capture-button";

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

  const [enableHdr, setEnableHdr] = useState(false);
  const [enableFlash, setEnableFlash] = useState<"off" | "on">("off");
  const [enableNightMode, setEnableNightMode] = useState(false);
  const [is60Fps, setIs60Fps] = useState(true);

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  const isForeground = useIsForeground();
  const isFocused = useIsFocused();
  const isActive = isForeground && isFocused;

  const formats = useMemo<CameraDeviceFormat[]>(() => {
    if (device?.formats == null) return [];
    return device.formats.sort(sortFormats);
  }, [device?.formats]);

  const fps = useMemo(() => {
    if (!is60Fps) return 30;

    if (enableNightMode && !device?.supportsLowLightBoost) {
      return 30;
    }

    const supportHighFpsHdr = formats.some(
      (f) =>
        f.supportsVideoHDR &&
        f.frameRateRanges.some((r) => frameRateIncluded(r, 60))
    );

    if (enableHdr && !supportHighFpsHdr) {
      return 30;
    }

    const supportHighFps = formats.some((f) =>
      f.frameRateRanges.some((r) => frameRateIncluded(r, 60))
    );

    if (!supportHighFps) {
      return 30;
    }

    return 60;
  }, [
    device?.supportsLowLightBoost,
    enableHdr,
    enableNightMode,
    formats,
    is60Fps,
  ]);

  const supportCameraFlip = useMemo(
    () => devices.back != null && devices.front != null,
    [devices.back, devices.front]
  );
  const supportFlash = device?.hasFlash ?? false;
  const supportHdr = useMemo(
    () => formats.some((f) => f.supportsVideoHDR || f.supportsPhotoHDR),
    [formats]
  );
  const supportHighFps = useMemo(
    () =>
      formats.some((f) =>
        f.frameRateRanges.some((rate) => frameRateIncluded(rate, 60))
      ),
    [formats]
  );
  const supportNightMode = enableNightMode
    ? true
    : (device?.supportsLowLightBoost ?? false) || fps > 30;

  const onInitialized = useCallback(() => {
    setIsCameraInitialized(true);
  }, []);

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition((p) => (p === "back" ? "front" : "back"));
  }, []);

  const onFlashPressed = useCallback(() => {
    setEnableFlash((f) => (f === "off" ? "on" : "off"));
  }, []);

  const format = useMemo(() => {
    let result = formats;

    if (enableHdr) {
      result = result.filter((f) => f.supportsVideoHDR || f.supportsPhotoHDR);
    }

    return result.find((f) =>
      f.frameRateRanges.some((r) => frameRateIncluded(r, fps))
    );
  }, [formats, fps, enableHdr]);

  if (device != null && format != null) {
    console.log(
      `Re-rendering camera page with ${
        isActive ? "active" : "inactive"
      } camera. ` +
        `Device: "${device.name}" (${format.photoWidth}x${format.photoHeight} @ ${fps}fps)`
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

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          {supportCameraFlip && (
            <TouchableOpacity
              style={styles.button}
              onPress={onFlipCameraPressed}
            >
              <Ionicons name="sync" size={24} color="white" />
            </TouchableOpacity>
          )}
          <CaptureButton />
          <TouchableOpacity style={styles.button}>
            <Ionicons name="home" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightButtonRow}>
        {supportFlash && (
          <TouchableOpacity style={styles.button} onPress={onFlashPressed}>
            <Ionicons
              name={enableFlash === "on" ? "flash" : "flash-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
        {supportHighFps && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIs60Fps(!is60Fps)}
          >
            <Text style={styles.text}>
              {is60Fps ? "60" : "30"}
              {"\n"}FPS
            </Text>
          </TouchableOpacity>
        )}
        {supportHdr && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEnableHdr((h) => !h)}
          >
            <MaterialCommunityIcons
              name={enableHdr ? "hdr" : "hdr-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
        {supportNightMode && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEnableNightMode(!enableNightMode)}
          >
            <Ionicons
              name={enableNightMode ? "moon" : "moon-outline"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    margin: SPACING,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  rightButtonRow: {
    position: "absolute",
    right: SAFE_AREA.right,
    top: SAFE_AREA.top,
  },
  button: {
    marginBottom: SPACING,
    width: BUTTON_SIZE - 25,
    height: BUTTON_SIZE - 25,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: "rgba(140, 140, 140, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
});
