import { Toast } from "native-base";

const showMessage = (message: string, type: string) => {
    Toast.show({
        text: message,
        buttonText: "",
        type: type,
        position: "top",
        duration: 2500,
        textStyle: {
            textAlign: 'center',
        }
    })
};

const showMessageCenter = (message: string, type: string) => {
    Toast.show({
        text: message,
        buttonText: "",
        type: type,
        position: "bottom",
        style: { bottom: "90%" },
        duration: 2000,
        textStyle: {
            textAlign: 'center',
        }
    })
};

const handleError = (error) => {
    //Quasar Toast Schema
    console.log('Handling error...',error);
    let message = {
        text: 'Network Error.',
        buttonText: "",
        type: "danger",
        position: "bottom",
        style: { bottom: "90%" },
        duration: 2000,
        textStyle: {
            textAlign: 'center',
        }
    }


    //Setup Error Message
    if (typeof error !== 'undefined') {
        if (error.hasOwnProperty('message')) {
            if (error.message.indexOf('timeout') != -1){
                message.text = 'Ocorreu um erro no servidor. Tente novamente.'
            } else {
                message.text = error.message
            }
        }
    }

    if (typeof error.response !== 'undefined') {
        //Setup Generic Response Messages
        if (error.response.status === 401) {
            message.text = 'UnAuthorized'
            vm.$emit('logout') //Emit Logout Event
        } else if (error.response.status === 404) {
            message.text = 'API Route is Missing or Undefined'
        } else if (error.response.status === 405) {
            message.text = 'API Route Method Not Allowed'
        } else if (error.response.status === 422) {
            //Validation Message
        } else if (error.response.status >= 500) {
            message.text = 'Ocorreu um erro no servidor. Tente novamente.'
        }

        //Try to Use the Response Message
        if (error.hasOwnProperty('response') && error.response.hasOwnProperty('data')) {
            if (error.response.data.hasOwnProperty('message') && error.response.data.message.length > 0) {
                message.text = error.response.data.message
            }
        }
    }

    //Toast the Message
    if (message.text.length > 0) {
        Toast.show(message);
    }
}


export { showMessage, showMessageCenter, handleError };