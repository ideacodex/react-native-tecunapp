import React, { Component } from "react";
import { Dimensions, Image, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { withNavigation } from "react-navigation";
import {
  Container,
  Content,
  Spinner,
  Thumbnail,
  Form,
  Picker,
  Input,
  Icon,
  Text,
  CardItem,
  Card,
  Button,
  Left,
  Right,
  Body,
} from "native-base";
import { connect } from "react-redux";
import * as rrhhActions from "../src/actions/rrhhActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import HederPostSection from "../components/HederPostSection";
import Loading from "./../components/Loading";
import { apiUrl } from "../App";

class ProccessCertificateScreen extends Component {
  constructor() {
    super();
  }
  state = {
    pathImage: apiUrl.link + "/img/",
    pathDocuemnt: apiUrl.link,
  };

  test() {
    console.log("Hola mundo desde el boton");
  }

  mailCertificate(contry, pais) {
    let mailUser = this.props.usuariosReducer.user.email;
    let token = this.props.usuariosReducer.token;

    console.log(pais);

    let objectMail = { country: contry, emailUser: mailUser, pais: pais };

    Alert.alert(
      `Constancia laboral ${pais}`,
      `Se enviará un correo electronico con su solicitud, Al momento de seleccionar "Aceptar" se enviara un correo electronico al encargado de procesar su solicitud. Pronto se contactaran contigo`,
      [
        {
          text: "Cancelar",
          //onPress: () => console.log("Cancelar Pressed"),
          style: "Cancelar",
        },
        {
          text: "Aceptar",
          onPress: () => this.sendMailCertificate(objectMail, token),
        },
      ],
      { cancelable: false }
    );
  }

  sendMailCertificate(onlyObject, token) {
    this.props.mailCertificate(onlyObject, token);

    if (this.props.rrhhReducer.cargando) {
      Alert.alert(
        "Correo enviado exitosamente",
        `Constancia solicitada correctamente, pronto llegara un correo electronico a su bandeja de entradas para corroborar dicha informacion. `,
        [
          {
            text: "Aceptar",
            onPress: () =>
              this.props.navigation.navigate("ProccessCertificateScreen"),
          },
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    let gt = "gtm";
    let paisGT = "Guatemala";
    let sv = "sv";
    let paisSV = "El Salvador";
    let hn = "hnd";
    let paisHn = "Honduras";

    /* if (this.props.rrhhReducer.cargando) {
      return (
        <Container>
          <HeaderCustom navigation={this.props.navigation} />
          <HederPostSection navigation={this.props.navigation} />
          <Loading />
          <FooterTabsNavigationIconText navigation={this.props.navigation} />
        </Container>
      );
    } */

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem
              style={{ backgroundColor: "white", alignItems: "center" }}
            >
              <Body style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: this.state.pathImage + "guatemala.png" }}
                  style={{
                    borderRadius: 20,
                    width: screenWidth / 3,
                    height: screenHeight / 6,
                  }}
                />
                <Button
                  onPress={() => this.mailCertificate(gt, paisGT)}
                  style={{
                    alignSelf: "center",
                    backgroundColor: "#FA8258",
                    width: screenWidth / 2,
                    height: screenHeight / 17,
                    borderRadius: 20,
                  }}
                >
                  <Icon
                    type="FontAwesome"
                    name="send"
                    style={{ marginLeft: 13, color: "#ffffff" }}
                  />
                  <Text style={{ color: "#ffffff", marginRight: 50 }}>
                    Enviar
                  </Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          <Card style={{ flex: 0 }}>
            <CardItem
              style={{ backgroundColor: "white", alignItems: "center" }}
            >
              <Body style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: this.state.pathImage + "el-salvador.png" }}
                  style={{
                    borderRadius: 20,
                    width: screenWidth / 3,
                    height: screenHeight / 6,
                  }}
                />
                <Button
                  onPress={() => this.mailCertificate(sv, paisSV)}
                  style={{
                    alignSelf: "center",
                    backgroundColor: "#FA8258",
                    width: screenWidth / 2,
                    height: screenHeight / 17,
                    borderRadius: 20,
                  }}
                >
                  <Icon
                    type="FontAwesome"
                    name="send"
                    style={{ marginLeft: 13, color: "#ffffff" }}
                  />
                  <Text style={{ color: "#ffffff", marginRight: 50 }}>
                    Enviar
                  </Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          <Card style={{ flex: 0, marginBottom: 15 }}>
            <CardItem
              style={{ backgroundColor: "white", alignItems: "center" }}
            >
              <Body style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: this.state.pathImage + "honduras.png" }}
                  style={{
                    borderRadius: 20,
                    width: screenWidth / 3,
                    height: screenHeight / 6,
                  }}
                />
                <Button
                  onPress={() => this.mailCertificate(hn, paisHn)}
                  style={{
                    alignSelf: "center",
                    backgroundColor: "#FA8258",
                    width: screenWidth / 2,
                    height: screenHeight / 17,
                    borderRadius: 20,
                  }}
                >
                  <Icon
                    type="FontAwesome"
                    name="send"
                    style={{ marginLeft: 13, color: "#ffffff" }}
                  />
                  <Text style={{ color: "#ffffff", marginRight: 50 }}>
                    Enviar
                  </Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
          <Card></Card>
        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}

const mapStateToProps = ({ rrhhReducer, usuariosReducer }) => {
  //return reducers/*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { rrhhReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...rrhhActions,
  ...loginActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(ProccessCertificateScreen)
);
