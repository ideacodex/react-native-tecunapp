import { getUser, loadingUser, errorUser, avatarUser, asotecsaInfo } from "../types/userTypes";
import { apiUrl } from './../../App';

export const AsocTec = (objectInfo, token) => async dispatch => {
  console.log(objectInfo);
  
  dispatch({
    type: loadingUser
  });

  try {
    let json = JSON.stringify(objectInfo);
		let params = 'json=' + json;

    let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&json=' + encodeURIComponent(objectInfo);
		//console.log("Que trae data form: ",dataForm);
		const response = await fetch(`${apiUrl.link}/api/asotecsa`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`,
				Params: `json ${dataForm}`
			},
			body: params
		});

		const data = await response.json();
    console.log("Que trae data en asotecsa", data);

    if (!response.ok) {
			dispatch({
				type: errorUser,
				error: 'Error al cambiar avatar, ' + response,
				cargando: false
			});
		} else {
			dispatch({
				type: asotecsaInfo,
				message: data.message,
				cargando: false
			});
		}

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
};

export const traerUser = tokenUsr => async dispatch => {
  dispatch({
    type: loadingUser
  });
  try {
    const response = await fetch(`${apiUrl.link}/api/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Authorization: `Bearer ${tokenUsr}`
      }
    });
    const data = await response.json();
    console.log("data: ", data);
    console.log('response: ', response.ok);
    
    
    if (response.ok) {
      dispatch({
        type: getUser,
        payload: data.data,
        cargando: false,
        token: tokenUsr,
      });  
    }
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: errorUser,
      error: error.message,
      cargando: false
    });
  }
};

export const changeAvatar = (image, token) => async dispatch => {
  dispatch({
    type: loadingUser
  });

  try {
    let json = JSON.stringify(image);
		let params = 'json=' + json;

    let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&json=' + encodeURIComponent(image);
		//console.log("Que trae data form: ",dataForm);
		const response = await fetch(`${apiUrl.link}/api/avataruser`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`,
				Params: `json ${dataForm}`
			},
			body: params
		});

		const data = await response.json();
    console.log("Que trae data ", data);

    if (!response.ok) {
			dispatch({
				type: errorUser,
				error: 'Error al cambiar avatar, ' + response,
				cargando: false
			});
		} else {
			dispatch({
				type: avatarUser,
				url_image: data.url_image,
				cargando: false
			});
		}

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
};


export const sendPushTokenAction = (pushToken, userId, apiToken) => async dispatch => {

  try {
      let dataForm = "_method=" + encodeURIComponent("POST");
      dataForm += "&token=" + encodeURIComponent(pushToken);
      dataForm += "&user_id=" + encodeURIComponent(userId);
      const response = await fetch(`${apiUrl.link}/api/device/token`, {
          method: "POST",
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
              Authorization: `Bearer ${apiToken}`,
          },
          body: dataForm
      });

      const data = await response.json();
      console.log("enviando token a db: ", data);
      console.log("respuesta de token server: ", response);
      
  } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
  }
};

export const registerUsers = ( dpi, name, lastname, email, phone, password ) => async dispatch => {
  dispatch({
    type: loadingUser
  });
  try {
    let dataForm = "_method=" + encodeURIComponent("POST");
    dataForm += "&dpi=" + encodeURIComponent(dpi);
    dataForm += "&name=" + encodeURIComponent(name);
    dataForm += "&lastname=" + encodeURIComponent(lastname);
    dataForm += "&email=" + encodeURIComponent(email);
    dataForm += "&phone=" + encodeURIComponent(phone);
    dataForm += "&password=" + encodeURIComponent(password);
    dataForm += "&role_id=" + encodeURIComponent("4");
    dataForm += "&status_id=" + encodeURIComponent("1");

    const response = await fetch(`${apiUrl.link}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: dataForm
    });
    const data = await response.json();    
    if (!response.ok) {
      dispatch({ 
        type: errorLogin,
        error: data.error,
        cargando: false
      });
    } else {
      dispatch({
        type: registerUser,
        userRegister: data,
        cargando: false
      });
    }
  } catch (error) {
    dispatch({
      type: errorLogin,
      error: error.message,
      cargando: false
    });
    console.log(error.message);
  }
};

