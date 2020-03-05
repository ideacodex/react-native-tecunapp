import React, { Component } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Container, Content, Text, Card, CardItem, Button, Icon, Form, Item, Input, Spinner } from 'native-base';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';


class RegisterScreen extends Component {
	state = {
		dpi: '',
		name: '',
		lastname: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: ''
	};

	componentDidMount() {
		console.log('');
	}

	userData = async () => {
		let Dpi = this.state.dpi;
		let Name = this.state.name;
		let Lastname = this.state.lastname;
		let Email = this.state.email;
		let Phone = this.state.phone;
		await this.props.logoutUser();
		if (this.state.password === this.state.confirmPassword) {
			var Password = this.state.password;
			await this.props.registerUsers(Dpi, Name, Lastname, Email, Phone, Password);
		}
		if (this.props.error == '') {
			await this.props.traerToken(Email, Password);
			await this.props.traerUser(this.props.token);
		}
	};

	ponerContenido = () => {
		if (this.props.cargando) {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
		return (
			<Grid>
				<Col style={{ alignItems: 'center' }}>
					<Button
						onPress={this.userData}
						rounded
						style={{
							backgroundColor: '#1B2853',
							borderBottomLeftRadius: 20,
							borderTopLeftRadius: 20,
							borderBottomRightRadius: 20,
							borderTopRightRadius: 20
						}}
					>
						<Text style={{ fontWeight: 'bold' }}> Registrate </Text>
					</Button>
				</Col>
			</Grid>
		);
	};

	handleSubmit = () => {
		if (this.state.password !== this.state.confirmPassword) {
			return (
				<Row>
					<Grid>
						<Col style={{ alignItems: 'center', marginBottom: 15 }}>
							<Text style={{ color: 'white' }}>Las contraseñas no coinsiden</Text>
						</Col>
					</Grid>
				</Row>
			);
		}
	};

	Erroruser = () => {
		if (this.props.error != '') {
			return (
				<Row>
					<Grid>
						<Col style={{ alignItems: 'center', marginBottom: 15 }}>
							<Text style={{ color: 'white' }}>
								{this.props.error}
							</Text>
						</Col>
					</Grid>
				</Row>
			);
		}
	};

	render() {
		if (this.props.user.dpi) {
			//el navigate le pela la verga
			//this.props.navigation.navigate("CategoriesRoute");
			return (
				<Container>
					<HeaderCategories />
					<CategoriesScreen />
				</Container>
			);
		}

		console.log('Register: ', this.props);

		return (
			<Container style={{ backgroundColor: '#EF5F2F' }}>
				<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
					<Content>
						<Card transparent>
							<CardItem style={{ backgroundColor: '#EF5F2F' }}>
								<Grid style={{ marginTop: 60 }}>
									<Col style={{ alignItems: 'center' }}>
										<Image
											source={require('../assets/images/robot-dev.png')}
											style={{ width: 165, height: 165 }}
										/>
									</Col>
								</Grid>
							</CardItem>
							<CardItem style={{ backgroundColor: '#EF5F2F' }}>
								<Grid>
									<Col style={{ alignItems: 'center' }}>
										<Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
											Crear cuenta
										</Text>
									</Col>
								</Grid>
							</CardItem>
						</Card>
						<Form style={{ marginRight: 20, marginLeft: 20 }}>
							<Item rounded>
								<Icon type="FontAwesome" name="user-o" style={{ color: 'white', fontSize: 25 }} />
								<Input
									onChangeText={name => this.setState({ name })}
									value={this.state.name}
									placeholder="Nombre"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
							<Item rounded style={{ marginTop: 25 }}>
								<Icon type="SimpleLineIcons" name="people" style={{ color: 'white', fontSize: 25 }} />
								<Input
									onChangeText={lastname => this.setState({ lastname })}
									value={this.state.lastname}
									placeholder="Apellido"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
							<Item rounded style={{ marginTop: 25 }}>
								<Icon
									type="MaterialCommunityIcons"
									name="numeric"
									style={{ color: 'white', fontSize: 25 }}
								/>
								<Input
									keyboardType="numeric"
									maxLength={13}
									onChangeText={dpi => this.setState({ dpi })}
									value={this.state.dpi}
									placeholder="Dpi"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
							<Item rounded style={{ marginTop: 25 }}>
								<Icon
									type="MaterialCommunityIcons"
									name="email-outline"
									style={{ color: 'white', fontSize: 25 }}
								/>
								<Input
									onChangeText={email => this.setState({ email })}
									value={this.state.email}
									placeholder="Email"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
							<Item rounded style={{ marginTop: 25 }}>
								<Icon type="AntDesign" name="phone" style={{ color: 'white', fontSize: 25 }} />
								<Input
									keyboardType="numeric"
									maxLength={8}
									onChangeText={phone => this.setState({ phone })}
									value={this.state.phone}
									placeholder="Teléfono"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
							<Item rounded style={{ marginTop: 25 }}>
								<Icon type="SimpleLineIcons" name="lock" style={{ color: 'white', fontSize: 25 }} />
								<Input
									textContentType="password"
									secureTextEntry={true}
									onChangeText={password => this.setState({ password })}
									value={this.state.password}
									placeholder="Contraseña"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
							<Item rounded style={{ marginTop: 25 }}>
								<Icon type="SimpleLineIcons" name="lock" style={{ color: 'white', fontSize: 25 }} />
								<Input
									textContentType="password"
									secureTextEntry={true}
									onChangeText={confirmPassword => this.setState({ confirmPassword })}
									value={this.state.confirmPassword}
									placeholder="Confirmar contraseña"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
						</Form>
						<Card transparent>
							<CardItem style={{ backgroundColor: '#EF5F2F' }}>
								<Grid>
									<Row>
										<Col style={{ alignItems: 'center' }}>
											{this.Erroruser()}
										</Col>
									</Row>
									<Row>
										<Col style={{ alignItems: 'center' }}>
											{this.handleSubmit()}
										</Col>
									</Row>
								</Grid>
							</CardItem>
							<CardItem style={{ backgroundColor: '#EF5F2F' }}>
								{this.ponerContenido()}
							</CardItem>
							<CardItem style={{ backgroundColor: '#EF5F2F' }}>
								<Grid>
									<Col style={{ alignItems: 'center' }}>
										<Button
											transparent
											vertical
											onPress={() => this.props.navigation.navigate('LoginRoute')}
										>
											<Text
												style={{
													fontSize: 14,
													color: 'white',
													fontWeight: 'bold',
													textDecorationLine: 'underline',
													textTransform: 'capitalize'
												}}
											>
												Ya tiene una Cuenta? Ingresa Ahora
											</Text>
										</Button>
									</Col>
								</Grid>
							</CardItem>
						</Card>
					</Content>
				</KeyboardAvoidingView>
			</Container>
		);
	}
}

const mapStateToProps = reducers => {
	return reducers.usuariosReducer;
};

export default connect(mapStateToProps, loginActions)(RegisterScreen);
