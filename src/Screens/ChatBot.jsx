import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
			selectedOption = holidayLength;
		} else if (questionCounter === 3) {
			selectedOption = food.join(', ');
		} else if (questionCounter === 4) {
			selectedOption = dayActivity.join(', ');
		} else if (questionCounter === 5) {
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
		if (questionCounter >= 2 && questionCounter <= 4) {
			message.quickReplies = {
				type: 'checkbox',
				values: categories[
					(console.log(categories),
					console.log(questionCounter),
					Object.keys(categories)[questionCounter - 2])
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
		console.log(questionCounter, '<<<<<<quickreply counter');
		if (questionCounter === 2) {
			setQuestionCounter(3);
			handleResponse(
				`You selected: ${options.join(
					', '
				)}. What type of food options would you like to see? Here are the options: ${categories.food.join(
					', '
				)}.`
			);
		}
		if (questionCounter === 3) {
			setFood(options);
			setQuestionCounter(4);
			handleResponse(
				`You selected: ${options.join(
					', '
				)}. What type of day activity options would you like to see? Here are the options: ${categories.daytimeActivities.join(
					', '
				)}.`
			);
		} else if (questionCounter === 4) {
			setDayActivity(options);
			setQuestionCounter(5);
			handleResponse(
				`You selected: ${options.join(
					', '
				)}. What type of night activity options would you like to see? Here are the options: ${categories.nighttimeActivities.join(
					', '
				)}.`
			);
		} else if (questionCounter === 5) {
			setNightActivity(options);
			setQuestionCounter(6);
			handleResponse(
				`Thank you! Your selections are:\nDestination: ${destination}\nCity: ${city}\nHoliday Length: ${holidayLength}\nFood: ${food.join(
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
		console.log(questionCounter, '<<<<< onsend counter');
		if (questionCounter === 0) {
			setDestination(response);
			setQuestionCounter(1);
			handleResponse(
				`Great! What city are you planning to visit in ${response}?`
			);
		} else if (questionCounter === 1) {
			setCity(response);
			setQuestionCounter(2);
			handleResponse(`Got it! How many days will your holiday be?`);
		} else if (questionCounter === 2) {
			setHolidayLength(response);
			setQuestionCounter(3);
			handleResponse(
				`You selected: ${response} days. What type of food options would you like to have in ${city}? Here are the options: ${categories.food.join(
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
			/>
			<Button
				title="to Activities List"
				onPress={() => navigation.navigate('ActivitiesList')}>
      </Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default ChatBot;
