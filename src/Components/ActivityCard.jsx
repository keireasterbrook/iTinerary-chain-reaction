import { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextComponent,
  Linking,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colours from "../styles/colours";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";

const ActivityCard = ({ place, selectedActivities, setSelectedActivities }) => {
  const [checkBoxState, setCheckBoxState] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
    <View style={activityStyle.activityContainer}>
      <BouncyCheckbox
        style={activityStyle.activityname}
        textStyle={{color: 'black',
          textDecorationLine: "none",
        }}
        isChecked={checkBoxState}
        text={place.properties.name}
        onPress={() => handleFavouritePress(place)}
      ></BouncyCheckbox>
      <TouchableOpacity activeOpacity={0.8} onPress={toggleModal}>
        <View style={activityStyle.seemore}>
          <Text style={{ fontWeight: "bold", color: 'white' }}>Details</Text>
        </View>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} style={activityStyle.bottomModal}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 30, lineHeight: 40 }}>
            {place.properties.name}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", lineHeight: 40, color: colours.lightpurple }}>
            {place.properties.poi_category[0][0].toUpperCase() +
              place.properties.poi_category[0].slice(1)}
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 25 }}>
            {place.properties.full_address}
          </Text>
          <Text
            style={{ fontSize: 14, lineHeight: 25 }}
            onPress={() => Linking.openURL(place.properties.metadata.website)}
          >
            {place.properties.metadata.website
              ? place.properties.metadata.website
              : ""}
          </Text>
          <Text style={{ fontSize: 13, lineHeight: 25, marginBottom:30 }}>
            {place.properties.metadata.phone
              ? place.properties.metadata.phone
              : ""}
          </Text>

          

          <Button title="Back to list" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const activityStyle = StyleSheet.create({
  activityContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityname: {
    
    maxWidth: '70%',
  },
  seemore: {
    backgroundColor: colours.darkpurple,
    height: 30,
    width: 70,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomModal: {
     margin: 0, 
    backgroundColor: 'white', 
    height: 400, 
    flex:0 , 
    bottom: 0, 
    position: 'absolute',
    width: '100%',
    padding: 25,
    opacity: 0.8
  },

});

export default ActivityCard;
