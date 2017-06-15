import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Withdraw extends Component {
  static navigationOptions = {
    title: 'Withdraw',
  }

  goToBankAccounts = () => {
    this.props.navigation.navigate("BankAccounts")
  }

  goToBitcoinAddresses = () => {
    this.props.navigation.navigate("BitcoinAddresses")
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.options}
          onPress={this.goToBankAccounts}>
          <View style={styles.optionsElement}>
            <Text style={styles.optionsText}>
              Bank Account
            </Text>
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
            <Text style={styles.optionsText}>
              Bitcoin Address
            </Text>
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
    alignItems: 'center',
    justifyContent:'center',
  },
  optionsElement: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
  },
  optionsText: {
    flex:1,
    fontSize:22,
  },
  optionsIcon: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
