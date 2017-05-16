import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity style={{ padding: 10 }}>
    <Icon
      name="menu"
      size={30}
      onPress={() => navigation.navigate('DrawerOpen')}
    />
  </TouchableOpacity>
);

DrawerButton.propTypes = {
  navigation: React.PropTypes.object.isRequired,
};

export default DrawerButton
