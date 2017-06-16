import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Date from './../util/date.js'

export default class Withdraw extends Component {

  getAmount = (amount, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      amount = amount / 10
    }

    return amount.toFixed(8).replace(/\.?0+$/, "")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.icon}>
            <Icon
              name={'ios-arrow-dropright-outline'}
              size={50}
            />
          </View>
          <View style={styles.type}>
            <Text style={{ fontSize: 20 }}>
              {this.props.data.label}
            </Text>
            <Text style={{ fontSize: 13 }}>
              {this.props.data.note}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={{ fontSize: 18, color: 'black' }}>
            {this.props.data.currency.symbol + " " + this.getAmount(this.props.data.amount, this.props.data.currency.divisibility)}
          </Text>
          <Text style={{ fontSize: 13, color: 'darkgray' }}>
            {Date.getDateFromMiliseconds(this.props.data.updated)} | {this.props.data.status}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    height: 70,
    backgroundColor: 'white',
  },
  left: {
    flex: 3,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  type: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
