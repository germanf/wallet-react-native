import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BitcoinAddresses extends Component {
  static navigationOptions = {
    title: 'Select Bitcoin Addresses',
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.options}
          onPress={this.goToBankAccounts}>
          <View style={styles.optionsElement}>
            <View style={styles.optionsText}>
              <Icon
                name="bitcoin"
                size={35}
              />
              <Text style={{fontSize:22}}>
                Bitcoin Address 1
              </Text>
            </View>
            <View style={styles.optionsIcon}>
              <Icon
                name="angle-double-right"
                size={50}
              />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.options}
          onPress={this.goToBitcoinAddresses}>
          <View style={styles.optionsElement}>
            <View style={styles.optionsText}>
              <Icon
                name="bitcoin"
                size={35}
              />
              <Text style={{fontSize:22}}>
                Bitcoin Address 2
              </Text>
            </View>
            <View style={styles.optionsIcon}>
              <Icon
                name="angle-double-right"
                size={50}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  options: {
    padding: 20,
    height: 80,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    alignItems: 'flex-start',
    justifyContent:'center',
  },
  optionsElement: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:'center',
  },
  optionsText: {
    flex:2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionsIcon: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
