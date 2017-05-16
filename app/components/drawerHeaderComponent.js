import React, {Component} from 'react';
import { View, StyleSheet, AsyncStorage, Image, Text} from 'react-native';

export default class DrawerHeader extends Component {
  constructor() {
      super()
      this.state = {
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
          source={{uri: this.state.userInfo.profile}}
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
    marginLeft:10,
    height:100,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 10,
    marginBottom: 10,
  },
  stretch: {
    flex: 1,
    height: 70,
    borderRadius: 50,
  },
  outerContainer: {
    flex: 3,
    padding: 10,
  },
});
