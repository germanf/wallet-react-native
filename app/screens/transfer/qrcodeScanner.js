import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import Expo, { Permissions } from 'expo'

export default class QRcodeScanner extends Component {
  static navigationOptions = {
    title: 'QR Code Scanner',
  }

  constructor(props) {
    super(props)
    const params = this.props.navigation.state.params
    this.state = {
      camera: true,
      amount: params.amount,
      note: params.note,
      reference: "",
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  goToSendTo = () => {
    this.props.navigation.navigate("SendTo", { amount: this.state.amount, note: this.state.note, reference: this.state.reference })
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <Text>No access to camera</Text>
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      if (this.state.camera === true) {
        return (
          <View style={{ flex: 1 }}>
            <Expo.BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ flex: 1 }}
            />
          </View>
        )
      }
      else {
        return (
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.input}>
                Reference: {this.state.reference}
              </Text>
            </View>
            <View style={styles.footer}>
              <TouchableHighlight
                style={[styles.buttons, { backgroundColor: 'red' }]}
                onPress={() => this.setState({ camera: true })}>
                <Text style={{ color: 'white', fontSize: 20 }}>
                  Again
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.buttons, { backgroundColor: '#2070A0' }]}
                onPress={this.goToSendTo}>
                <Text style={{ color: 'white', fontSize: 20 }}>
                  Next
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        )
      }
    }
  }

  _handleBarCodeRead = (data) => {
    this.setState({ camera: false, reference: data.data })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  footer: {
    height: 70,
    flexDirection: 'row',
    width: "100%",
    alignSelf: 'stretch',
  },
  buttons: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width: "100%",
    padding: 10,
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
})
