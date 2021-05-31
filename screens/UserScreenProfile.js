import React, { Component, useState, useEffect, useRef } from 'react';
import { Image, Linking, TouchableOpacity, Modal, Alert, Pressable, TextInput, StyleSheet } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
	Container,
	ListItem,
	Content,
	Spinner,
	Badge,
	Thumbnail,
	Form,
	Item,
	Input,
	View,
	Icon,
	Text,
	Left,
	CardItem,
	Card,
	Button,
	Body,
	Right
} from 'native-base';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as userActions from '../src/actions/userActions';
import * as questionActions from '../src/actions/questionActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from './../components/HeaderCustom';
import { persistor, apiUrl, screenHeight, screenWidth, myStyles } from './../App';
import { withNavigation } from 'react-navigation';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

class UserScreenProfile extends Component {
	constructor(props) {
		super();
	}
	state = {
		expoPushToken: '',
		setExpoPushToken: '',
		notification: false,
		setNotification: false,
		phone: '',
		password: '',
		title: '',
		description: '',
		messageAction: '',
		status: '',
		statusAction: '',
		modalVisibleMail: false,
		titleModal: '',
		modalVisible: false,
		confirmPassword: '',
		errorMessage: null,
		isShowAlert: true
	};

	styles = StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: 'rgba(52, 52, 52, 0.8)'
			//backgroundColor: 'white'
		},
	
		modalViewMail: {
			marginTop: 50,
			width: screenWidth - 20,
			height: screenHeight / 3,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},
	
		modalTextTitle: {
			marginBottom: 15,
			fontSize: 18,
			textAlign: "center",
			marginTop: 20,
			fontWeight: "bold",
			color: myStyles.bg1
		},
	
		modalTextDescription: {
			marginBottom: 15,
			textAlign: "center",
			color: '#858585'
		},
	
		ListCloseMail: {
			alignSelf: 'flex-end',
			width: screenWidth / 2,
			//backgroundColor: 'black'
		},
	
		viewMailAccept: {
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			//backgroundColor: 'red',
		},
	
		viewMail:{
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			//backgroundColor: 'blue',
			marginLeft: -15,
			marginRight: 5
		},
	
		buttonIcon: {
			color: myStyles.bg1,
			width: 28,
			marginRight: 5,
		},
	
		textStyleMail: {
			color: myStyles.bg1,
			marginLeft: 5
		},	
  	});

	async componentDidMount() {
		await this.props.allScoreActions(this.props.usuariosReducer.token);
		if (Platform.OS === 'android' && !Constants.isDevice) {
			this.setState({
				errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
			});
		} else {
			this.getTokenExpoNotificationsPush();
		}
	}

	setModalVisibleOnly = (visible) => {
		this.setState({ modalVisible: visible });
	};

	styles = StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: 'rgba(52, 52, 52, 0.8)'
			//backgroundColor: 'white'
		},

		modalViewSendMail: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 5.5,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		modalViewMail: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 5 + 25,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		modalViewText: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 4.5,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		viewMailAccept: {
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			//backgroundColor: 'red',
		},

		viewMail:{
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			//backgroundColor: 'blue',
			marginLeft: -15,
			marginRight: 5
		},

		modalViewButton: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 4,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			flexDirection: 'row',
			justifyContent: 'flex-end',
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		ListCloseMail: {
			alignSelf: 'flex-end',
			width: screenWidth / 2,
			//backgroundColor: 'black'
		},

		ListClose: {
			alignSelf: 'flex-end',
			width: screenWidth / 2 - 90,
		},

		textStyle: {
			color: myStyles.bg1,
			marginRight: 10
		},

		textStyleMail: {
			color: myStyles.bg1,
		},

		modalTextTitle: {
			marginBottom: 15,
			fontSize: 18,
			textAlign: "center",
			marginTop: 20,
			fontWeight: "bold",
			color: myStyles.bg1
		},

		modalTextDescription: {
			marginBottom: 15,
			textAlign: "center",
			color: '#858585'
		},

		ListbodyMail: {
			backgroundColor: 'black'
		},

		ListLeftMail: {
			backgroundColor: 'blue',
			width: 2,
			marginLeft: -100
		},

		ListLeft: {
			marginRight: -15,
			alignItems: 'center'
		},

		buttonIcon: {
			color: myStyles.bg1,
			width: 28,
		},
  	});

	allScoreTitle() {
		if (this.state.isDisplay == 1 && this.props.questionReducer.score) {
			return (
				<Grid
					style={{
						marginTop: 15
					}}
				>
					<Col
						size={1}
						style={{
							marginVertical: 5,
							paddingVertical: 10,
							marginHorizontal: 2,
							alignItems: 'center',
							backgroundColor: myStyles.bg1,
							borderBottomLeftRadius: 5,
							borderTopLeftRadius: 5,
							borderBottomRightRadius: 5,
							borderTopRightRadius: 5
						}}
					>
						<Text style={{ color: myStyles.light }}>#</Text>
					</Col>
					<Col
						size={3}
						style={{
							marginVertical: 5,
							paddingVertical: 10,
							marginHorizontal: 2,
							alignItems: 'center',
							backgroundColor: myStyles.bg2,
							borderBottomLeftRadius: 5,
							borderTopLeftRadius: 5,
							borderBottomRightRadius: 5,
							borderTopRightRadius: 5
						}}
					>
						<Text style={{ color: myStyles.light }}>Nombre</Text>
					</Col>
					<Col
						size={1}
						style={{
							marginVertical: 5,
							paddingVertical: 10,
							marginHorizontal: 2,
							alignItems: 'center',
							backgroundColor: myStyles.bg1,
							borderBottomLeftRadius: 5,
							borderTopLeftRadius: 5,
							borderBottomRightRadius: 5,
							borderTopRightRadius: 5
						}}
					>
						<Text style={{ color: myStyles.light }}>Puntos</Text>
					</Col>
				</Grid>
			);
		}
	}

	allScore() {
		//console.log("Que viene en puntos?: ",this.props.questionReducer);
		let count = 0;
		let color = '#F8FAFB';
		let idUserScore;
		if (this.props.questionReducer.userScore) {
			idUserScore = this.props.questionReducer.userScore.id;
		}
		if (this.state.isDisplay == 1 && this.props.questionReducer.score) {
			return this.props.questionReducer.score.map(
				(pounts) => (
					count++,
					(
						<Grid
							style={{
								backgroundColor: idUserScore == pounts.id ? myStyles.grey : 'transparent',
								borderBottomLeftRadius: 10,
								borderTopLeftRadius: 10,
								borderBottomRightRadius: 10,
								borderTopRightRadius: 10
							}}
							key={pounts.id}
						>
							<Col
								size={1}
								style={{
									marginTop: 5,
									marginBottom: 5,
									alignItems: 'center',
									marginLeft: 5
								}}
							>
								<Text style={{ color: myStyles.bg1 }}>{count}</Text>
							</Col>
							<Col size={3} style={{ marginTop: 5, marginBottom: 5 }}>
								<Text style={{ color: myStyles.bg1 }}>
									{pounts.user.name} {pounts.user.lastname}
								</Text>
							</Col>
							<Col size={1} style={{ marginTop: 5, marginBottom: 5, marginLeft: 15 }}>
								<Text style={{ color: myStyles.bg1 }}>{pounts.points}</Text>
							</Col>
						</Grid>
					)
				)
			);
		}
	}

	async suggestionButton() {
		var token = this.props.usuariosReducer.token;
		var object = {
			'title': this.state.title,
			'description': this.state.description
		};

		if ((object.title != "") && (object.description != "")) {
			await this.props.suggestion(object, token);
			this.setState({ 
				title: "",
				description: "",
				messageAction: this.props.usuariosReducer.messageSuggestion,
				statusAction: this.props.usuariosReducer.statusSuggestion
			});
			
		} else {
			this.setState({
				messageAction: "Los campos de titulo y descripcion son requeridos, intente de nuevo",
				statusAction: "error"
			});
		}

		if (this.state.statusAction == "success") {
			this.setState({ status: 'Correcto' });
		} else {
			this.setState({ status: 'Error' });
		}

		console.log("Que trae el estado: ",this.state);
		
		this.setState({ modalVisibleMail: true });
	}

	modalMessage(){
		return(
			<View style={this.styles.centeredView} key={2}>
				<Modal
					animationType="fade"
					transparent={this.state.modalVisibleMail}
					visible={this.state.modalVisibleMail}
					onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					
					this.setModalVisible(false);
					}}
				>
					<View style={this.styles.centeredView}>
						<View style={this.styles.modalViewMail}>
							<Text style={this.styles.modalTextTitle}>{this.state.status}</Text>
							<Text style={this.styles.modalTextDescription}>{this.state.messageAction}</Text>
							<ListItem key={2} noBorder style={this.styles.ListCloseMail} icon delayPressIn>
								<Pressable onPress={() => this.setModalVisibleOnly(false)}>
									<View style={this.styles.viewMailAccept}>
										<Icon style={this.styles.buttonIcon} name="closecircleo" type="AntDesign"/>
										<Text style={this.styles.textStyleMail}>CERRAR</Text>
									</View>
								</Pressable>
							</ListItem>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	async onPressChange() {
		await this.props.topScoreAction(this.props.usuariosReducer.token);
		if (this.state.isDisplay == 1) {
			this.setState({
				isDisplay: 0
			});
		} else {
			this.setState({
				isDisplay: 1
			});
		}
	}

	logout = async () => {
		//await this.props.logoutUser();
		//console.log('borró usuario');
		//await this.props.resetAddress();
		await persistor.purge();
		this.props.navigation.navigate('Login');
		//console.log('borró direccion');
	};

	/**+++++++++++++NOTIFICACIONES+++++++++++++ */
	getTokenExpoNotificationsPush = async () => {
		let token;
		if (Constants.isDevice) {
			let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			if (status !== 'granted') {
				status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			}
			if (status !== 'granted') {
				this.setState({
					errorMessage: 'Failed to get push token for push notification!'
				});
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			this.props.sendPushTokenAction(token, this.props.usuariosReducer.user.id, this.props.usuariosReducer.token);
			//console.log('push token: ', token);
		} else {
			this.setState({
				errorMessage: 'Must use physical device for Push Notifications'
			});
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [ 0, 250, 250, 250 ],
				lightColor: '#FF231F7C'
			});
		}

		this.setState({ expoPushToken: token });
		this.setState({
			errorMessage: 'Debe tener token y error'
		});
		return token;
	};

	setNotification() {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false
			})
		});
	}

	async sendPushNotification(expoPushToken) {
		this.setNotification();
		const message = {
			to: expoPushToken,
			sound: 'default',
			title: 'Nuevo Contenido en la app',
			body: 'Escucha este increible podcast!',
			data: { data: 'Podcast de seguridad indistrial' }
		};
		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		});
	}
	/**+++++++++++++NOTIFICACIONES+++++++++++++ */
	showTokenAlert = () => {
		if (this.state.expoPushToken && this.state.isShowAlert) {
			return (
				<Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
					<CardItem style={{ backgroundColor: '#EB0101' }}>
						<Image
							source={{ uri: `${apiUrl.link}/img/game/trivia.png` }}
							style={{ width: 25, height: 25 }}
						/>
						<Col size={4}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 15,
									fontWeight: 'bold',
									color: '#fff'
								}}
							>
								{this.state.expoPushToken}
							</Text>
						</Col>
						<Button onPress={(isShowAlert) => this.setState({ isShowAlert: false })} transparent rounded>
							<Icon name="close" />
						</Button>
					</CardItem>
				</Card>
			);
		}
	};

	showError = () => {
		if (this.state.errorMessage && this.state.isShowAlert) {
			return (
				<Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
					<CardItem style={{ backgroundColor: '#00B9D3' }}>
						<Image
							source={{ uri: `${apiUrl.link}/img/game/trivia.png` }}
							style={{ width: 25, height: 25 }}
						/>
						<Col size={4}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 15,
									fontWeight: 'bold',
									color: '#fff'
								}}
							>
								{this.state.errorMessage}
							</Text>
						</Col>
						<Button onPress={(isShowAlert) => this.setState({ isShowAlert: false })} transparent rounded>
							<Icon name="close" />
						</Button>
					</CardItem>
				</Card>
			);
		}
	};

	async changeAvatar(nameImage) {
		let token = this.props.usuariosReducer.token;
		let object = { url_image: nameImage };

		this.setModalVisibleOnly(false);
		await this.props.changeAvatar(object, token);
		await this.props.traerUser(token);
		if (!this.props.usuariosReducer.cargando) {
			this.props.navigation.navigate('SettingsScreen');
		}
	}

	showModal() {
		let b1 = 'b1.png';
		let b2 = 'b2.png';
		let g1 = 'g1.png';
		let g2 = 'g2.png';

		//console.log(apiUrl.link + '/img/' + b1);

		return (
			<View style={this.styles.centeredView} key={1}>
				<Modal
					animationType="slide"
					transparent={this.state.modalVisible}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
						this.setModalVisibleOnly(false);
					}}
				>
					<View style={this.styles.centeredView}>
						<View style={this.styles.modalViewText}>
							<Text style={this.styles.modalTextTitle}>ELIGE TU PERSONAJE</Text>
							<Grid style={this.styles.gridModal}>
								<Col>
									<TouchableOpacity onPress={() => this.changeAvatar(b1)}>
										<View style={this.styles.cardModal}>
											<Image
												source={{ uri: apiUrl.link + '/img/' + 'b1.png' }}
												style={this.styles.imageModal}
											/>
										</View>
									</TouchableOpacity>
								</Col>
								<Col>
									<TouchableOpacity onPress={() => this.changeAvatar(g1)}>
										<View style={this.styles.cardModal}>
											<Image
												source={{ uri: apiUrl.link + '/img/' + 'g1.png' }}
												style={this.styles.imageModal}
											/>
										</View>
									</TouchableOpacity>
								</Col>
							</Grid>
							<Grid style={this.styles.gridModal}>
								<Col>
									<TouchableOpacity onPress={() => this.changeAvatar(g2)}>
										<View style={this.styles.cardModal}>
											<Image
												source={{ uri: apiUrl.link + '/img/' + 'g2.png' }}
												style={this.styles.imageModal}
											/>
										</View>
									</TouchableOpacity>
								</Col>
								<Col>
									<TouchableOpacity onPress={() => this.changeAvatar(b2)}>
										<View style={this.styles.cardModal}>
											<Image
												source={{ uri: apiUrl.link + '/img/' + 'b2.png' }}
												style={this.styles.imageModal}
											/>
										</View>
									</TouchableOpacity>
								</Col>
							</Grid>
							<ListItem key={2} noBorder style={this.styles.ListCloseMail} icon delayPressIn>
								<Pressable onPress={() => this.setModalVisibleOnly(false)}>
									<View style={this.styles.viewMailAccept}>
										<Icon style={this.styles.buttonIcon} name="closecircleo" type="AntDesign" />
										<Text style={this.styles.textStyleMail}>Cerrar</Text>
									</View>
								</Pressable>
							</ListItem>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	render() {
		//console.log('perfil: ', this.props.questionReducer);
		//console.log('User: ', this.props.usuariosReducer.user);
		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content style={{ backgroundColor: myStyles.light }}>
					{this.modalMessage()}
					<View style={{ backgroundColor: myStyles.bg1, paddingBottom: screenHeight / 5 }} />
					<Card
						transparent
						style={{
							width: screenWidth,
							marginLeft: 0,
							marginBottom: 30,
							borderTopLeftRadius: 50,
							borderTopRightRadius: 50,
							borderBottomLeftRadius: 15,
							borderBottomRightRadius: 15,
							marginTop: -75,
							backgroundColor: myStyles.light
						}}
					>
						<View transparent style={{ alignSelf: 'center' }}>
							<TouchableOpacity onPress={() => this.setModalVisibleOnly(true)}>
								{(() => {
									if (this.props.usuariosReducer.cargando) {
										return (
											<Spinner
												color="red"
												style={{
													backgroundColor: myStyles.light,
													height: screenWidth / 3,
													width: screenWidth / 3,
													marginTop: -60,
													borderRadius: 70,
													padding: 50
												}}
											/>
										);
									} else {
										if (this.props.usuariosReducer.user.url_image != null) {
											return (
												<Image
													style={{
														backgroundColor: myStyles.light,
														height: screenWidth / 3,
														width: screenWidth / 3,
														marginTop: -60,
														borderRadius: 70,
														padding: 50
													}}
													source={{
														uri: `${apiUrl.link}/img/${this.props.usuariosReducer.user
															.url_image}`
													}}
												/>
											);
										} else {
											return (
												<Thumbnail
													style={{
														backgroundColor: myStyles.light,
														height: screenWidth / 3,
														width: screenWidth / 3,
														marginTop: -60,
														borderRadius: 70,
														padding: 50
													}}
													large
													source={{ uri: `${apiUrl.link}/img/logo.png` }}
												/>
											);
										}
									}
								})()}
							</TouchableOpacity>
						</View>
						<View style={{ alignSelf: 'center', paddingVertical: 30 }}>
							<Text
								style={{ color: myStyles.bg1, fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}
							>
								{this.props.usuariosReducer.user.name}
							</Text>
							<Text
								style={{ color: myStyles.bg1, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}
							>
								{' '}
								{this.props.usuariosReducer.user.email}
							</Text>
						</View>
						<View style={{ paddingTop: screenHeight / 17 }}>
							<Grid>
								<Col style={{ marginTop: -50, alignItems: 'center'}}>
									<Col style={{ alignItems: 'center'}}>
										<Text
											style={{
												fontSize: 20,
												color: myStyles.bg2,
												fontWeight: 'bold',
												marginBottom: 5
											}}
										>
											DUDAS Y SUGERENCIAS
										</Text>

										<Item rounded style={{ marginTop: 10, width: screenWidth / 1.2,}}>
											<Icon
												type="MaterialIcons"
												name="title"
												style={{ color: myStyles.bg1, fontSize: 25 }}
											/>
											<Input
												onChangeText={(title) => this.setState({ title })}
												value={this.state.title}
												placeholder="Titulo"
												placeholderTextColor={myStyles.bg1}
												style={{ color: myStyles.bg1, fontWeight: 'bold' }}
											/>
										</Item>
										<Item rounded style={{ marginTop: 15, width: screenWidth / 1.2, textAlignVertical: 'top'}}>
											<Icon
												type="Ionicons"
												name="md-text"
												style={{ color: myStyles.bg1, fontSize: 25 }}
											/>
											<TextInput
												style={{ color: myStyles.bg1, justifyContent: "flex-start", marginRight: 50 }}
												onChangeText={(description) => this.setState({description})}
												placeholder="Descripcion                                                                   "
												placeholderTextColor={myStyles.bg1}
												numberOfLines={6}
												value={this.state.description}
												multiline={true}
											/>
										</Item>
										<Col style={{ alignItems: 'center'}}>
											<Item rounded style={{ marginTop: 15, marginBottom: 20, width: screenWidth / 2.4, textAlignVertical: 'top'}}>
												<Button
												onPress={ () => this.suggestionButton() }
													rounded
													iconLeft
													style={{
														backgroundColor: myStyles.bg1,
														borderRadius: 20,
														marginLeft: -10,
														shadowColor: `#9400d3`,
														shadowOffset: {
															width: 0,
															height: 3
														},
														shadowOpacity: 0.27,
														shadowRadius: 4.65,

														elevation: 6
													}}
												>
													<Icon
														type="MaterialCommunityIcons"
														name="email-send"
														style={{
															color: myStyles.light,
															fontSize: 25,
															marginLeft: 30
														}}
													/>
													<Text
														style={{
															textAlign: 'center',
															color: '#ffffff',
															fontSize: 20,
															marginRight: 30,
															paddingBottom: 35,
															paddingTop: 35
														}}
													>
														ENVIAR
													</Text>
												</Button>
											</Item>
										</Col>
										
									</Col>
									<TouchableOpacity
										onPress={() => {
											this.onPressChange();
										}}
									>
										<ListItem
											style={{
												backgroundColor: myStyles.bg2,
												width: screenWidth / 1.2,
												marginTop: 10,
												marginBottom: 10,
												borderRadius: 10
											}}
											noBorder
											delayPressIn
											onPress={() => {
												this.onPressChange();
											}}
										>
											<Body>
												<Text
													style={{
														fontWeight: 'bold',
														textAlign: 'center',
														color: myStyles.light
													}}
												>
													RANKING GENERAL
												</Text>
											</Body>
											<Right>
												<Icon
													type="Entypo"
													name="trophy"
													style={{
														color: myStyles.light,
														textAlign: 'center'
													}}
												/>
											</Right>
										</ListItem>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => Linking.openURL('http://www.denunciagrupotecun.com/')}
									>
										<ListItem
											style={{
												backgroundColor: myStyles.bg2,
												width: screenWidth / 1.2,
												borderRadius: 10,
												marginBottom: 10
											}}
											noBorder
											delayPressIn
											onPress={() => Linking.openURL('http://www.denunciagrupotecun.com/')}
										>
											<Body>
												<Text
													style={{
														fontWeight: 'bold',
														textAlign: 'center',
														color: myStyles.light
													}}
												>
													LÍNEA DE DENUNCÍA
												</Text>
											</Body>
											<Right>
												<Icon
													type="FontAwesome"
													name="warning"
													style={{
														color: myStyles.light,
														textAlign: 'center'
													}}
												/>
											</Right>
										</ListItem>
									</TouchableOpacity>
									<TouchableOpacity>
										<ListItem
											style={{
												backgroundColor: myStyles.bg2,
												width: screenWidth / 1.2,
												borderRadius: 10,
												marginBottom: 10
											}}
											onFocus
											delayPressIn
											noBorder
											onPress={() => this.props.navigation.navigate('EmergencyNumberScreen')}
										>
											<Body>
												<Text
													style={{
														fontWeight: 'bold',
														textAlign: 'center',
														color: myStyles.light
													}}
												>
													NUMEROS DE EMERGENCIA
												</Text>
											</Body>
											<Right>
												<Icon
													type="MaterialIcons"
													name="add-ic-call"
													style={{
														color: myStyles.light,
														textAlign: 'center'
													}}
												/>
											</Right>
										</ListItem>
									</TouchableOpacity>

									<TouchableOpacity>
										<ListItem
											style={{
												backgroundColor: myStyles.bg2,
												width: screenWidth / 1.2,
												marginBottom: 10,
												borderRadius: 10
											}}
											noBorder
											delayPressIn
											onPress={() => {
												this.logout();
											}}
										>
											<Body>
												<Text
													style={{
														fontWeight: 'bold',
														textAlign: 'center',
														color: myStyles.light
													}}
												>
													CERRAR SESION
												</Text>
											</Body>
											<Right>
												<Icon
													type="Entypo"
													name="log-out"
													style={{
														color: myStyles.light,
														textAlign: 'center'
													}}
												/>
											</Right>
										</ListItem>
									</TouchableOpacity>
								</Col>
							</Grid>
							{this.showModal()}
						</View>
						<View style={{ marginHorizontal: 30, alignItems: 'center' }}>
							{this.allScoreTitle()}
							{this.allScore()}
						</View>
					</Card>
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
			</Container>
		);
	}
}

const mapStateToProps = ({ questionReducer, usuariosReducer, loginReducer }) => {
	//return reducers.questionReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { questionReducer, usuariosReducer, loginReducer };
};

const mapDispatchProps = {
	...userActions,
	...questionActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(UserScreenProfile));
