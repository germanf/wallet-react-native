import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Account extends Component {
  constructor(props) {
    super(props);
    const color = this.props.data.active === true ? 'greenyellow' : '#38C87F'
    this.state = {
      balance: 0,
      color,
    }
  }

  componentWillMount() {
    this.setBalance(this.props.data.balance, this.props.data.currency.divisibility)
  }

  setBalance = (balance, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      balance = balance / 10
    }

    this.setState({balance})
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.options} >
        <View style={styles.optionsElement}>
          <View style={styles.icon}>
            <Icon
              name="arrow-right"
              size={50}
            />
          </View>
          <View style={styles.type}>
            <Text style={{fontSize:22}}>
              {this.props.data.currency.code}
            </Text>
            <Text style={{fontSize:15}}>
              {this.props.data.currency.symbol + ' ' + this.state.balance}
            </Text>
          </View>
          <View style={styles.buttonView}>
            <TouchableHighlight
              style={[styles.button, {backgroundColor: this.state.color}]}
              onPress={this.props.data.active === true ? null : (code) => this.props.setActive(this.props.data.currency.code)} >
              <Text style={{color:'white', fontSize:20}}>
                Active
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  options: {
    padding: 10,
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
  icon: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  type: {
    flex:3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonView: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex:1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
})
