import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
} from 'react-native';

import Voice from '@react-native-voice/voice';

class SpeechToTextComponent extends Component {
  state = {
    recognizedText: '',
    isListening: false,
  };

  componentDidMount() {
    Voice.onSpeechResults = this.onSpeechResults;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechResults = (e) => {
    this.setState({
      recognizedText: e.value[0], // Take the first recognized result
    });
  };

  startListening = async () => {
    this.setState({
      recognizedText: '',
      isListening: true,
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
      this.setState({
        isListening: false,
      });
    }
  };

  stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
    
    this.setState({
      isListening: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={this.state.recognizedText}
          placeholder="Recognized Text"
          editable={false}
        />
        <Button
          title={this.state.isListening ? 'Stop Listening' : 'Start Listening'}
          onPress={this.state.isListening ? this.stopListening : this.startListening}
          disabled={false} // You might want to handle disabling logic based on your use case
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center',
  },
});

export default SpeechToTextComponent;
