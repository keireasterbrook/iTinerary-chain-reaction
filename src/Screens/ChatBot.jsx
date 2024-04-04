import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import colours from "../styles/colours";
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies';


function ChatBot({ setHolidayObj }) {
  const [messages, setMessages] = useState([]);
  const [destination, setDestination] = useState('');
  const [city, setCity] = useState('');
  const [holidayLength, setHolidayLength] = useState('');
  const [food, setFood] = useState([]);
  const [dayActivity, setDayActivity] = useState([]);
  const [nightActivity, setNightActivity] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);
  const navigation = useNavigation();

  const categories = {
    food: ['Mexican', 'Cafe', 'Italian', 'American', 'Seafood'],
    daytimeActivities: [
      'Shopping',
      'Outdoor Activities',
      'Tourist Attractions',
      'Art & History',
      'Sports',
    ],
    nighttimeActivities: ['Party', 'Pub', 'Bar', 'Live Entertainment'],
  };

  const handleResponse = (response) => {
    let selectedOption = '';
    if (questionCounter === 0) {
      selectedOption = destination;
    } else if (questionCounter === 1) {
      selectedOption = city;
    } else if (questionCounter === 2) {
      selectedOption = food.join(', ');
    } else if (questionCounter === 3) {
      selectedOption = dayActivity.join(', ');
    } else if (questionCounter === 4) {
      selectedOption = nightActivity.join(', ');
    }

    let messageContent = response;
    if (selectedOption) {
      messageContent += `\n\nYou selected: ${selectedOption}`;
    }

    const message = {
      _id: Math.random().toString(36).substring(7),
      text: messageContent,
      createdAt: new Date(),
      role: 'ChatGPT',
    };
    if (questionCounter >= 1 && questionCounter <= 3) {
      message.quickReplies = {
        type: 'checkbox',
        values: categories[
          (Object.keys(categories)[questionCounter - 1])
        ].map((option) => ({
          title: option,
          value: option,
        })),
      };
    }

    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, [message])
    );
  };

  const handleQuickReply = (options) => {
    if (questionCounter === 1) {
      setQuestionCounter(2);
      handleResponse(
        `You selected: ${options.join(
          ', '
        )}. What type of food options would you like to see? Here are the options: ${categories.food.join(
          ', '
        )}.`
      );
    }
    if (questionCounter === 2) {
      setFood(options);
      setQuestionCounter(3);
      handleResponse(
        `You selected: ${options.join(
          ', '
        )}. What type of day activity options would you like to see? Here are the options: ${categories.daytimeActivities.join(
          ', '
        )}.`
      );
    } else if (questionCounter === 3) {
      setDayActivity(options);
      setQuestionCounter(4);
      handleResponse(
        `You selected: ${options.join(
          ', '
        )}. What type of night activity options would you like to see? Here are the options: ${categories.nighttimeActivities.join(
          ', '
        )}.`
      );
    } else if (questionCounter === 4) {
      setNightActivity(options);
      setQuestionCounter(5);
      handleResponse(
        `Thank you! Your selections are:\nDestination: ${destination}\nCity: ${city}\nFood: ${food.join(
          ', '
        )}\nDay Activities: ${dayActivity.join(
          ', '
        )}\nNight Activities: ${options.join(', ')}`
      );
    }
    setHolidayObj({
      destination,
      city,
      holidayLength,
      food,
      dayActivity,
      nightActivity: options,
    });
  };

  const onSend = (newMessages = []) => {
    const response = newMessages[0].text;
    const userMessage = {
      _id: messages.length + 1,
      text: response,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'User',
      },
    };
    setMessages((prevMessages) => [userMessage, ...prevMessages]);

    if (questionCounter === 0) {
      setDestination(response);
      setQuestionCounter(1);
      handleResponse(
        `Great! What city are you planning to visit in ${response}?`
      );
    } else if (questionCounter === 1) {
      setCity(response);
      setQuestionCounter(2);
      handleResponse(
        `You selected: ${response}. What type of food options would you like to have in ${city}? Here are the options: ${categories.food.join(
          ', '
        )}.`
      );
    } else if (questionCounter === 2) {
      setHolidayLength(response);
      setQuestionCounter(3);
      handleResponse(
        `You selected: ${response}. What type of food options would you like to have in ${city}? Here are the options: ${categories.food.join(
          ', '
        )}.`
      );
    }

    newMessages[0].text = '';
  };

  useEffect(() => {
    handleResponse(
      'Hello, welcome to the chatbot! What country are you planning to visit?'
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#5E376D',
          },
          right: {
            backgroundColor: '#BD97CB', 
          },
        }}
        textStyle={{
          left: {
            color: '#FFFFFF', 
          },
          right: {
            color: '#FFFFFF',
          },
        }}
      />
    );
  };

  const renderQuickReply = (props) => {
    return (
      <QuickReplies
        {...props}
        quickReplyStyle={{
          borderRadius: 12,
          backgroundColor: '#FFFFFF', 
        }}
        quickReplyTextStyle={{
          color: '#FFFFFF', 
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
          name: 'User',
        }}
        placeholder="Type your message..."
        onQuickReply={(reply) =>
          handleQuickReply(reply.map((option) => option.value))
        }
        renderBubble={renderBubble} 
        renderQuickReply={renderQuickReply} 
      />
      {questionCounter > 4 ? (
        <Button
          title="Show me my recommendations"
          onPress={() => navigation.navigate('ActivitiesList')}
          style={styles.button} 
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colours.lightpurple,
    opacity: 0.8
  }
});

export default ChatBot;








