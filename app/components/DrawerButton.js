import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let drawer = "DrawerOpen"
const DrawerButton = ({ navigation }) => (
  <TouchableOpacity style={{ padding: 10 }}>
    <Icon
      name="menu"
      size={30}
      onPress={() => {
          navigation.navigate(drawer)
          console.log(navigation.state)
          drawer = (drawer === "DrawerOpen" ? "DrawerClose" : "DrawerOpen")
        }
      }
    />
  </TouchableOpacity>
);

DrawerButton.propTypes = {
  navigation: React.PropTypes.object.isRequired,
};

export default DrawerButton
