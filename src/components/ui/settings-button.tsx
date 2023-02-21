import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

interface Props {
  onPress?: () => void;
}

const SettingsButton = ({ onPress }: Props) => {
  return (
    <Container>
      <Button onPress={onPress}>
        <FontAwesome5 name="cog" size={24} color="#cdd6f4" />
      </Button>
    </Container>
  );
};

export default SettingsButton;

const Container = styled.View`
  position: absolute;
  left: 25px;
  top: 50px;
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  background-color: transparent;
  height: 24px;
  width: 24px;
`;
