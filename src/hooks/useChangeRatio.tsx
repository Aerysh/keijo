import { useState } from "react";

const useChangeRatio = () => {
  const [ratio, setRatio] = useState("4:3");
  const [containerRatio, setContainerRatio] = useState(3 / 4);

  const changeRatio = () => {
    setRatio(ratio === "4:3" ? "16:9" : "4:3");
    setContainerRatio(containerRatio === 3 / 4 ? 9 / 16 : 3 / 4);
  };

  return {
    ratio,
    containerRatio,
    changeRatio,
  };
};

export default useChangeRatio;
