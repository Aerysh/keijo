import { CameraType } from "expo-camera";
import { useState } from "react";

const useChangeCamera = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);

  const changeCamera = () => {
    setCameraType(
      cameraType == CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return {
    cameraType,
    changeCamera,
  };
};

export default useChangeCamera;
