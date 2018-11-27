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
        duration: 2500,
        textStyle: {                                                                                                                                                                        
            textAlign: 'center',                                                                                                                                                            
        }
    })
};


export { showMessage, showMessageCenter};