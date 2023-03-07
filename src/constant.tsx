import { Dimensions, Platform } from "react-native";
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

export const SPACING = 12;

export const SAFE_AREA = {
  left: StaticSafeAreaInsets.safeAreaInsetsLeft + SPACING,
  top: StaticSafeAreaInsets.safeAreaInsetsTop + SPACING,
  right: StaticSafeAreaInsets.safeAreaInsetsRight + SPACING,
  bottom:
    Platform.select({ ios: StaticSafeAreaInsets.safeAreaInsetsBottom }) ??
    0 + SPACING,
};

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Platform.select<number>({
  android: Dimensions.get("screen").height,
  ios: Dimensions.get("window").height,
});

export const PAN_GESTURE_HANDLER_FAIL_X = [-SCREEN_WIDTH, SCREEN_WIDTH];
export const PAN_GESTURE_HANDLER_FAIL_Y = [-2, 2];

export const RECORDING_DELAY = 200;

export const BUTTON_SIZE = 75;

export const BORDER_WIDTH = BUTTON_SIZE * 0.1;
