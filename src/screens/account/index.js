import React, { Component } from "react";
import global from "./../../theme/global";
import { connect } from "react-redux";
import { actions, States } from '../../store';
import {
    TouchableHighlight, Alert
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
    Picker,
    H3
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

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordConfirmation: '',
            client: {
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

    componentDidMount() {
        this.setState({ client: this.props.clientLoaded });
        this.setState({passwordConfirmation: this.props.clientLoaded.password});
    }

    onValueChange(value) {
        this.setState({ client: { ...this.state.client, state: value } });
    }

    updateClient() {
        console.log(this.state.client, this.state.passwordConfirmation)
        this.props.doUpdate(this.state.client, this.state.passwordConfirmation);
    }

    dialogRemove(){
        Alert.alert(
            this.state.client.name,
            'Deseja realmente apagar sua conta?',
            [
                { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Sim', onPress: () => this.props.doRemove(this.state.client)}
            ],
            { cancelable: false }
        )
    }

    render() {
        const { loading, doUpdate } = this.props;
        let { passwordConfirmation, client } = this.state;
        const isEnabled = client.name.length > 0 && passwordConfirmation.length > 0 && client.email.length > 0 && client.password.length > 0 && client.phone.length > 0 && client.address.length > 0 && client.city.length > 0 && client.state.length > 0;
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
                    <View style={{ flexDirection: "row" }}>
                        <H3 style={{ alignSelf: "center", marginRight: "auto", paddingBottom: 5 }}>Minha Conta</H3>
                        <Button
                            transparent
                            style={{ alignSelf: "center", marignLeft: "auto" }}
                            onPress={() => this.dialogRemove()} dark>
                            <Icon name="ios-trash" />
                        </Button>
                    </View>
                    <Form>
                        <Item rounded>
                            <Input placeholder='E-mail' keyboardType="email-address" disabled
                                defaultValue={client.email}
                                onChangeText={(text) => this.setState({ client: { ...client, email: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Senha' secureTextEntry
                                defaultValue={client.password}
                                onChangeText={(text) => this.setState({ client: { ...client, password: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Confirmar Senha' secureTextEntry
                                defaultValue={client.password}
                                onChangeText={(text) => this.setState({ passwordConfirmation: text })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Nome'
                                defaultValue={client.name}
                                onChangeText={(text) => this.setState({ client: { ...client, name: text } })}
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
                                defaultValue={client.address}
                                onChangeText={(text) => this.setState({ client: { ...client, address: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Cidade'
                                defaultValue={client.city}
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
                        onPress={() => this.updateClient()}
                    >
                        <Text>Atualizar</Text>
                    </Button>
                </Content>
            </Container >
        );
    }
}

const mapStateToProps = (state: States) => {
    return {
        loading: state.app.loading,
        clientLoaded: state.auth.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        doUpdate: (client, passwordConfirmation) =>
            dispatch(actions.client.update(client, passwordConfirmation)),
        doRemove: (client) =>
            dispatch(actions.client.remove(client))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);