import React, {Component} from 'react';
import { View, StyleSheet, AsyncStorage, Image, Text} from 'react-native';

export default class DrawerHeader extends Component {
  constructor() {
      super()
      this.state = {
         altImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmT5tM-IGcFDpqZ87p9zKGaWQuzpvAcDKfOTPYfx5A9zOmbTh8RMMFg',
         userInfo: {},
      }

      this.getUserInfo()
   }

  getUserInfo = () => {
    AsyncStorage.getItem('user').then((value) => {
         this.setState({'userInfo': JSON.parse(value)});
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.stretch}
          source={{uri: this.state.userInfo.profile !== null ? this.state.userInfo.profile : this.state.altImage}}
        />
        <View style={styles.outerContainer}>
          <Text style={{color:'white', fontSize:16}}>
            {this.state.userInfo.first_name + ' ' + this.state.userInfo.last_name}
          </Text>
          <Text style={{color:'white', fontSize:11}}>
            {this.state.userInfo.email}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height:100,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent:'center',
    marginTop: -10,
    marginBottom: 10,
    marginLeft:15,
  },
  stretch: {
    flex: 1,
    height: 70,
    borderRadius: 30,
  },
  outerContainer: {
    flex: 3,
    padding: 10,
  },
});
