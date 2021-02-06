import React from 'react';
import { Linking, BackHandler, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Text, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Constants from 'expo-constants';
import { logoutUser } from '../src/actions/loginActions';
import { persistor } from '../App';

function HeaderCustom(props) {
	logout = async () => {
		//await this.props.logoutUser();
		console.log('borró usuario');
		//await this.props.resetAddress();
		await persistor.purge();
		props.navigation.navigate('Login');
		console.log('borró direccion');
	};

	exitApp = () => {
		Alert.alert(
			'Salir',
			'Cerrar aplicación',
			[
				{
					text: 'No',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{ text: 'Si', onPress: () => BackHandler.exitApp() }
			],
			{ cancelable: false }
		);
	};

	handleGoBack = () => {
		if (props.navigation.canGoBack()) {
			props.navigation.goBack();
		} else {
			exitApp();
		}
	};
	return (
		<Header style={{ backgroundColor: '#1D578A' }}>
			<Left>
				<Button transparent onPress={() => handleGoBack()}>
					<Icon style={{ color: '#FFFFFF' }} name="arrow-back" />
				</Button>
			</Left>
			<Body>
				<Title />
			</Body>
			<Right>
				<Button transparent onPress={() => props.navigation.navigate('SettingsScreen')}>
					<Icon style={{ color: '#FFFFFF' }} name="user" type="FontAwesome" />
					<Text style={{ color: '#ffffff' }}>{props.usuariosReducer.user.name} </Text>
				</Button>
			</Right>
		</Header>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 15,
		paddingBottom: 8,
		elevation: 2
	},
	iconContainer: {
		flexDirection: 'row'
	},
	logo: {
		width: 41,
		height: 35,
		resizeMode: 'contain'
	},
	textPoints: {
		fontSize: 20,
		color: '#EC4C17',
		fontWeight: 'bold',
		paddingVertical: 5
	},
	statusBar: {
		height: Constants.statusBarHeight
	}
});

const MapStateToProps = ({ usuariosReducer }) => {
	return {
		usuariosReducer
	};
};

export default connect(MapStateToProps)(HeaderCustom);
