import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

interface Props {
  onPress?: () => void;
  width?: string;
  height?: string;
  borderColor?: string;
  backgroundColor?: string;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
}

const RoundedButton = ({
  onPress,
  width,
  height,
  borderColor,
  backgroundColor,
  icon,
  iconColor,
  iconSize,
}: Props) => {
  return (
    <ButtonContainer
      onPress={onPress}
      width={width || "70px"}
      height={height || "70px"}
      borderColor={borderColor || "#b4befe"}
      backgroundColor={backgroundColor || "transparent"}
    >
      <FontAwesome5 name={icon} color={iconColor} size={iconSize} />
    </ButtonContainer>
  );
};

export default RoundedButton;

const ButtonContainer = styled.TouchableOpacity`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50px; 
  border-width: 4px;   
  border-color: ${(props) => props.borderColor}
  background-color: ${(props) => props.backgroundColor}; 
  justify-content: center;
  align-content: center;
  align-items: center;
`;
