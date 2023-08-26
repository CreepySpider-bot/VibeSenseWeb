import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatScreen from './ChatScreen';
import SpeechToTextComponent from './SpeechtoTextComponent';


const App = () => {
  return (
    <View style={styles.container}>
      <ChatScreen></ChatScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // You can set the background color here
  },
});

export default App;
