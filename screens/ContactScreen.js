import React, { Component, useEffect } from 'react';
import { ScrollView, Linking, Image, TouchableOpacity, Alert } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
	Container,
	Content,
	Form,
	Item,
	Icon,
	Text,
	Input,
	View,
	CardItem,
	Body,
	Card,
	Button,
	ListItem,
	TextInput,
	Left,
	Right,
	Thumbnail,
	Spinner
} from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as contactsActions from '../src/actions/contactsActions';
import * as userActions from '../src/actions/userActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { myStyles, apiUrl, screenWidth } from '../App';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';

class ContactScreen extends Component {
	constructor() {
		super();
	}
	state = {
		searchNombre: '',
		searchApellido: '',
		searchDepartamento: '',
		searchPais: '',
		searchPuesto: '',
		isShowAlert: true,
		isShowResult: false,
		showFavorites: false,
		activeSections: [],
		pathImage: apiUrl.link + '/img/'
	};

	showError = () => {
		if (this.props.contactsReducer.error && this.state.isShowAlert) {
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
								{this.props.contactsReducer.error}
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
	loadFAvorites() {
		if (this.state.showFavorites == true) {
			return (
				<CardItem cardBody>
					<Grid style={{ marginTop: 3 }}>
						<Col size={4} style={{ alignItems: 'center' }}>
							<CardItem cardBody>
								<Grid style={{ marginTop: 20 }}>
									<Col size={2} style={{ alignItems: 'center' }}>
										<TouchableOpacity
											onPress={() => {
												this.props.navigation.navigate('ContactCallScreen');
											}}
										>
											<Image
												source={{ uri: this.state.pathImage + 'telephone.png' }}
												style={{ width: screenWidth / 4, height: screenWidth / 4 }}
											/>
										</TouchableOpacity>
									</Col>
									<Col size={2} style={{ alignItems: 'center' }}>
										<TouchableOpacity
											onPress={() => {
												this.props.navigation.navigate('ContactChatScreen');
											}}
										>
											<Image
												source={{ uri: this.state.pathImage + 'whatsapp.png' }}
												style={{ width: screenWidth / 4, height: screenWidth / 4 }}
											/>
										</TouchableOpacity>
									</Col>
								</Grid>
							</CardItem>
						</Col>
					</Grid>
				</CardItem>
			);
		}
	}

	showContacts = () => {
		if (this.props.contactsReducer.cargando) {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
		console.log('state: ', this.state);
		if (this.props.contactsReducer.contacts.length > 0) {
			return (
				<Accordion
					sections={this.props.contactsReducer.contacts}
					activeSections={this.state.activeSections}
					renderSectionTitle={this._renderSectionTitle}
					renderHeader={this._renderHeader}
					renderContent={this._renderContent}
					onChange={this._updateSections}
				/>
			);
		} else {
			if (this.state.isShowResult && !this.props.contactsReducer.cargando) {
				Alert.alert(
					`No hay coincidencias`,
					`Realiza una nueva busqueda`,
					[
						{
							text: 'Cerrar',
							onPress: () => this.setState({ isShowResult: false })
						}
					],
					{ cancelable: false }
				);
			}
		}
	};

	_renderHeader = (section) => {
		return (
			<View
				style={{
					flexDirection: 'row',
					padding: 10,
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: '#F7F7F7'
				}}
			>
				<Text style={{ fontWeight: '600', color: myStyles.bg1 }}> {section.nombre}</Text>
				{1 ? (
					<Icon style={{ fontSize: 18 }} name="caret-down" type="FontAwesome" />
				) : (
					<Icon style={{ fontSize: 18 }} name="add-circle" />
				)}
			</View>
		);
	};

	_renderContent = (record) => {
		return (
			<ListItem thumbnail>
				<Left>
					<Thumbnail
						square
						style={{ backgroundColor: 'transparent' }}
						source={{ uri: `${apiUrl.link}/img/logo.png` }}
					/>
				</Left>
				<Body>
					<Text note>
						{record.subDepartamento} - {record.puesto} Ext: {record.extension}
					</Text>
					<Button transparent onPress={() => Linking.openURL(`tel:${record.numeroDirecto}`)}>
						<Icon name="phone" type="FontAwesome" />
						<Text>{record.numeroDirecto}</Text>
					</Button>
					<Button transparent onPress={() => Linking.openURL(`tel:${record.celular}`)}>
						<Icon name="mobile-phone" type="FontAwesome" />
						<Text>{record.celular}</Text>
					</Button>
					<Button transparent onPress={() => Linking.openURL(`mailto:${record.correo}`)}>
						<Icon name="email-send" type="MaterialCommunityIcons" />
						<Text>{record.correo}</Text>
					</Button>
				</Body>
			</ListItem>
		);
	};

	_updateSections = (activeSections) => {
		this.setState({ activeSections });
	};

	async componentDidMount() {
		await this.props.clearContactsAction();
	}
	async searchContactData(token) {
		await this.props.searchContactsAction(
			this.state.searchNombre,
			this.state.searchApellido,
			this.state.searchDepartamento,
			this.state.searchPais,
			this.state.searchPuesto,
			token
		);
		//await this.props.
		//console.log('entra a buscar en la pantalla: ', this.props.contactsReducer.contacts);
		//this.props.navigation.navigate('ContactScreen');
	}

	render() {
		if (this.props.usuariosReducer.cargando) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
				</Container>
			);
		}

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				{this.showError()}
				<ScrollView ref={(scrollView) => (this.scrollView = scrollView)}>
					<View style={{ backgroundColor: myStyles.bg2 }}>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 30,
								fontWeight: 'bold',
								color: myStyles.light,
								paddingVertical: 18
							}}
						>
							Contactos
						</Text>
					</View>

					<View style={{ marginTop: 20 }}>
						{/* <ListItem
							icon
							onPress={(showFavorites) => this.setState({ showFavorites: !this.state.showFavorites })}
						>
							<Left>
								<Button style={{ backgroundColor: '#007AFF' }}>
									<Icon active name="address-book" type="FontAwesome5" />
								</Button>
							</Left>
							<Body>
								<Text>Numeros Frecuentes</Text>
							</Body>
							<Right>
								<Icon active name="caret-down" type="FontAwesome" />
							</Right>
						</ListItem> */}

						<Item 
							rounded 
							onPress={(showFavorites) => this.setState({ showFavorites: !this.state.showFavorites })}
							style={{ marginLeft: 25, marginRight: 25 }}
						>
							<Left>
								<Icon active name="address-book" type="FontAwesome5" style={{ marginLeft: 15, color: '#007AFF' }} />
							</Left>
							<Body>
								<Text style={{ fontSize: 15 }}>NUMEROS IMPORTANTES</Text>
							</Body>
							<Right style={{ marginRight: 15 }}>
								<Icon active name="caret-down" type="FontAwesome" />
							</Right>
						</Item>
						<Item rounded>
							{this.loadFAvorites()}
						</Item>
					</View>

					<Grid style={{ backgroundColor: 'transparent', marginTop: 40 }}>
						<Col style={{ alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 20,
									color: myStyles.bg1,
									fontWeight: 'bold'
								}}
							>
								Buscar
							</Text>
						</Col>
					</Grid>
					<View>
						<Form style={{ marginRight: 20, marginLeft: 20, marginTop: 10 }}>
							<Item style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="user-o" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(searchNombre) => this.setState({ searchNombre })}
									value={this.state.searchNombre}
									placeholder="Nombres"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							<Item style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="user-o" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(searchApellido) => this.setState({ searchApellido })}
									value={this.state.searchApellido}
									placeholder="Apellidos"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							<Item style={{ marginTop: 15 }}>
								<Icon type="SimpleLineIcons" name="people" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(searchDepartamento) => this.setState({ searchDepartamento })}
									value={this.state.searchDepartamento}
									placeholder="Departameto o area"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							<Item style={{ marginTop: 15 }}>
								<Icon
									type="MaterialCommunityIcons"
									name="map"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									maxLength={13}
									onChangeText={(searchPais) => this.setState({ searchPais })}
									value={this.state.searchPais}
									placeholder="Pais"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							<Item style={{ marginTop: 15 }}>
								<Icon
									type="MaterialCommunityIcons"
									name="email-outline"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(searchPuesto) => this.setState({ searchPuesto })}
									value={this.state.searchPuesto}
									placeholder="Plaza o puesto"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							<Content style={{ marginTop: 20 }}>
								<Body>
									<Button
										onPress={() => {
											this.setState({ isShowResult: true });
											this.searchContactData(this.props.usuariosReducer.token);
										}}
										rounded
										style={{
											fontSize: 44,
											backgroundColor: myStyles.bg2
										}}
									>
										<Text
											style={{
												textAlign: 'center',
												color: '#ffffff',
												fontSize: 20,
												marginRight: 35,
												marginLeft: 35
											}}
										>
											Buscar
										</Text>
									</Button>
								</Body>
							</Content>
							<Content
								style={{ marginTop: 20 }}
								onContentSizeChange={() => {
									this.scrollView.scrollToEnd();
								}}
							>
								{this.showContacts()}
							</Content>
						</Form>
					</View>
				</ScrollView>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
			</Container>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, loginReducer, contactsReducer }) => {
	return { usuariosReducer, loginReducer, contactsReducer };
};

const mapDispatchProps = {
	...loginActions,
	...userActions,
	...contactsActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(ContactScreen));
