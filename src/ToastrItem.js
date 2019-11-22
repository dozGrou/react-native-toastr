import React, {useState, useEffect} from 'react'
import {Animated, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native'

const stylesByType = {
	success: {
		color: '#155724',
		backgroundColor: '#d4edda',
		borderColor: '#c3e6cb',
	},
	error: {
		color: '#721c24',
		backgroundColor: '#f8d7da',
		borderColor: '#f5c6cb',
	},
	warning: {
		color: '#856404',
		backgroundColor: '#fff3cd',
		borderColor: '#ffeeba',
	},
	info: {
		color: '#0c5460',
		backgroundColor: '#d1ecf1',
		borderColor: '#bee5eb',
	},
};

const ToastrItem = ({toast, onRemove}) => {
	const [anim, setAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(anim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [])

	const handlePress = () => {
		Animated.timing(anim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			onRemove && onRemove();
		})
	}

	const opacity = anim;
	return (
		<TouchableWithoutFeedback onPress={handlePress}>
			<Animated.View
				style={[
					styles.toastContainer,
					stylesByType[toast.type],
					{opacity},
				]}>
				<Text style={[styles.toastText, stylesByType[toast.type]]}>
					{toast.text}
				</Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	)
}


const styles = StyleSheet.create({
	toastContainer: {
		borderWidth: 1,
		borderRadius: 4,
		marginTop: 10,
		padding: 5,
	},
	toastText: {
		margin: 5,
	},
});


export default ToastrItem;
