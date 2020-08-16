import React, {Component} from 'react'
import {Animated, Easing, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'

const stylesByType = {
	success: {
		color: '#155724',
		backgroundColor: '#d4edda',
		backgroundColorProgress: '#00801e',
		borderColor: '#c3e6cb',
	},
	danger: {
		color: '#721c24',
		backgroundColor: '#f8d7da',
		backgroundColorProgress: '#cc0014',
		borderColor: '#f5c6cb',
	},
	warning: {
		color: '#856404',
		backgroundColor: '#fff3cd',
		backgroundColorProgress: '#e6a800',
		borderColor: '#ffeeba',
	},
	info: {
		color: '#0c5460',
		backgroundColor: '#d1ecf1',
		backgroundColorProgress: '#008599',
		borderColor: '#bee5eb',
	},
};

type Props = {
	onRemove: Function,

	id: number,
	text: string,
	type: 'success' | 'danger' | 'warning' | 'info',
	timeout: boolean,
	timeoutDuration: number,
	dismissable: boolean,
	progressBar: boolean,
};

type State = {
	opacity: Animated.Value,
	progress: Animated.Value,
}

class ToastrItem extends Component<Props, State> {
	static defaultProps = {
		timeout: true,
		timeoutDuration: 5000,
		dismissable: true,
		progressBar: true,
	}

	constructor(props) {
		super(props);

		this.state = {
			opacity: new Animated.Value(0),
			progress: new Animated.Value(1),
		};

		this.handlePress = this.handlePress.bind(this);
		this.remove = this.remove.bind(this);
	}

	componentDidMount() {
		Animated.timing(this.state.opacity, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start()

		if (this.props.timeout) {
			if(this.props.progressBar) {
				Animated.timing(this.state.progress, {
					toValue: 0,
					easing: Easing.linear,
					duration: this.props.timeoutDuration,
					useNativeDriver: false,
				}).start();
			}

			this.timeout = setTimeout(this.remove, this.props.timeoutDuration);
		}
	}

	componentWillUnmount() {
		if (this.props.timeout && this.timeout) {
			clearTimeout(this.timeout);
		}
	}

	remove() {
		Animated.timing(this.state.opacity, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			this.props.onRemove && this.props.onRemove();
		})
	}

	handlePress() {
		if (!this.props.dismissable) {
			return;
		}

		this.remove();
	}

	render() {
		const opacity = this.state.opacity
		const width = this.state.progress.interpolate({
			inputRange: [0, 1],
			outputRange: ['0%', '100%'],
		})

		return (
			<TouchableWithoutFeedback onPress={this.handlePress}>
				<View>
					<Animated.View
						style={[
							styles.toastContainer,
							stylesByType[this.props.type],
							{opacity}
						]}>
						<Text style={[styles.toastText, {color: stylesByType[this.props.type].color}]}>
							{this.props.text}
						</Text>

						{this.props.progressBar && (
							<Animated.View style={[
								styles.progress,
								{
									backgroundColor: stylesByType[this.props.type].backgroundColorProgress,
									width,
								},
							]} />
						)}
					</Animated.View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	toastContainer: {
		borderWidth: 1,
		borderRadius: 4,
		marginTop: 10,
		overflow: 'hidden',
	},
	toastText: {
		margin: 5,
	},
	progress: {
		width: '100%',
		height: 4,
	},
});


export default ToastrItem;
