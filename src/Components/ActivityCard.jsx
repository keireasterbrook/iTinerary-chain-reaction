import { useState } from "react";
import { View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ActivityCard = ({ place, selectedActivities, setSelectedActivities }) => {
  const [checkBoxState, setCheckBoxState] = useState(false);

  const handleFavouritePress = (place) => {
    if (!checkBoxState) {
      setSelectedActivities((currActivities) => [...currActivities, place]);
    } else {
      setSelectedActivities((currActivities) =>
        currActivities.filter((activity) => activity !== place)
      );
    }

    setCheckBoxState(!checkBoxState);
  };

  return (
    <View>
      <BouncyCheckbox
        textStyle={{
          textDecorationLine: "none",
        }}
        isChecked={checkBoxState}
        text={place.properties.name}
        onPress={() => handleFavouritePress(place)}
      ></BouncyCheckbox>
    </View>
  );
};

export default ActivityCard;
