import { Toast } from "native-base";

const showMessage = (message: string, type: string) => {
    Toast.show({
        text: message,
        buttonText: "",
        type: type,
        position: "top",
        duration: 2500
    })
};

  
export { showMessage };