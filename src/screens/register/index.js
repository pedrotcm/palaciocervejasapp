import React, { Component } from "react";
import global from "./../../theme/global";
import { connect } from "react-redux";
import { actions, States } from '../../store';
import {
    TouchableHighlight
} from 'react-native'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Body,
    Left,
    Right,
    Text,
    Form,
    Item,
    Input,
    View,
    Picker
} from "native-base";
import Loader from "../../components/loader";
import { TextInputMask, TextMask } from "react-native-masked-text";

const stateArr = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE",
    "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const statePickerArr = stateArr.map((state, i) => (
    <Picker.Item key={i} label={state} value={state} />
));

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordConfirmation: '',
            name: '',
            lastName: '',
            client: {
                id: null,
                email: '',
                password: '',
                cpf: '',
                name: '',
                phone: '',
                address: '',
                city: '',
                state: ''
            }
        };
    }
    onValueChange(value) {
        this.setState({ client: { ...this.state.client, state: value } });
    }

    /*
    * Criar Conta
    */
    saveClient() {
        const fullName = this.state.name + ' ' + this.state.lastName;
        this.props.doRegister(this.state.client, fullName, this.state.passwordConfirmation);
    }

    /*
    * Renderizar
    */
    render() {
        const { loading, doSave } = this.props;
        const { client, name, lastName, passwordConfirmation } = this.state;
        const isEnabled = name.length > 0 && lastName.length > 0 && passwordConfirmation.length > 0 && client.email.length > 0 && client.password.length > 0 && client.phone.length > 0 && client.address.length > 0 && client.city.length > 0 && client.state.length > 0;
        return (
            <Container style={global.container}>
                <Loader loading={loading} />
                <Header style={global.primary_color} androidStatusBarColor="#DEB704">
                    <Left style={{ flex: 1 }}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()} dark>
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3, alignItems: "center" }}>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate("Home")}>
                            <Title>Palácio das Cervejas</Title>
                        </TouchableHighlight>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>

                <Content padder>
                    <Form>
                        <Item rounded>
                            <Input placeholder='E-mail' keyboardType="email-address" autoCapitalize="none"
                                onChangeText={(text) => this.setState({ client: { ...client, email: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Senha' secureTextEntry
                                onChangeText={(text) => this.setState({ client: { ...client, password: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Confirmar Senha' secureTextEntry
                                onChangeText={(text) => this.setState({ passwordConfirmation: text })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Nome'
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Sobrenome'
                                onChangeText={(text) => this.setState({ lastName: text })}
                            />
                        </Item>
                        <Item rounded>
                            <TextInputMask style={global.input_mask}
                                placeholder='Telefone'
                                type={'cel-phone'}
                                value={client.phone}
                                onChangeText={(text) => this.setState({ client: { ...client, phone: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <TextInputMask style={global.input_mask}
                                placeholder='CPF'
                                type={'cpf'}
                                value={client.cpf}
                                onChangeText={(text) => this.setState({ client: { ...client, cpf: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Endereço'
                                onChangeText={(text) => this.setState({ client: { ...client, address: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Cidade'
                                onChangeText={(text) => this.setState({ client: { ...client, city: text } })}
                            />
                        </Item>
                        <Item picker rounded last>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={global.picker}
                                placeholderStyle={global.picker_placeholder}
                                placeholder="Estado"
                                headerBackButtonText="Cancelar"
                                iosHeader="Estado"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={client.state}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {statePickerArr}
                            </Picker>
                        </Item>
                    </Form>
                    <Button block disabled={!isEnabled}
                        onPress={() => this.saveClient()}
                    >
                        <Text>Criar Conta</Text>
                    </Button>
                </Content>
            </Container >
        );
    }
}

const mapStateToProps = (state: States) => {
    return {
        loading: state.app.loading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        doRegister: (client, fullName, passwordConfirmation) =>
            dispatch(actions.client.register(client, fullName, passwordConfirmation))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);