import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'react-native'
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice'; // Import the Voice library

const ChatScreen = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false); // State to track listening status
  const scrollViewRef = useRef(null);

  const handleSendMessage = async () => {
    if (recognizedText.trim() !== '') { // Use recognizedText as input
      setLoading(true);
      const newChatMessage = { message: recognizedText, sentByUser: true };
      setChatMessages([...chatMessages, newChatMessage]);

      try {
        const response = await fetch('http://192.168.165.132:3001', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: recognizedText }),
        });

        if (response.ok) {
          const responseData = await response.json();
          const newAIResponse = {
            message: responseData.aiResponse,
            sentByUser: false,
          };
          setChatMessages((prevMessages) => [...prevMessages, newAIResponse]);
        } else {
          console.error('Network request failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
        setRecognizedText(''); // Clear recognized text after sending
      }
    }
  };

  const startListening = async () => {
    try {
      if (isListening) {
        // Stop listening if already active
        await Voice.stop();
        setIsListening(false);
      } else {
        await Voice.start('en-US');
        setIsListening(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    setRecognizedText(e.value[0]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    chatCard: {
      margin: 8,
      padding: 8,
      borderRadius: 12,
    },
    messageText: {
      color: 'white',
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    input: {
      flex: 1,
      marginRight: 8,
      backgroundColor: '#F0F0F0',
      borderRadius: 20,
      paddingHorizontal: 16,
      height: 40,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isListening ? '#FF0000' : '#D3D3D3', // Change color based on listening state
      justifyContent: 'center',
      alignItems: 'center',
    },
    action: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
      >
        {chatMessages.map((chat, index) => (
          <Card
            key={index}
            style={[
              styles.chatCard,
              { alignSelf: chat.sentByUser ? 'flex-end' : 'flex-start' },
              { backgroundColor: chat.sentByUser ? '#007AFF' : '#9B59B6' },
            ]}
          >
            <Text style={styles.messageText}>{chat.message}</Text>
          </Card>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          label=""
          value={recognizedText || inputMessage}
          onChangeText={setRecognizedText} // Update recognized text
          style={styles.input}
          underlineColor="transparent"
          placeholder="Type your message..."
          placeholderTextColor="#BDC3C7"
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          style={[
            styles.sendButton,
            { backgroundColor: loading ? '#fff' : '#fff' },
          ]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            // <Icon name="send" size={25} color="white" />
            <Image source={require('./assets/send.png')} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={startListening}
          style={[styles.sendButton, { backgroundColor: isListening ? '#FF0000' : '#007AFF' }]}
        >
          <Text style={styles.action}>
          <Image source={require('./assets/mic2.png')} style={{marginBottom: "10px"}}/>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
