import React, { Component } from "react";
import global from "./../../theme/global";
import { connect } from "react-redux";
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
            selected: undefined,
            register: {
                email: null,
                password: null
            }
        };
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    render() {
        const { loading } = this.props;
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
                            <Input placeholder='E-mail' keyboardType="email-address"
                                onChangeText={(text) => this.setState({ register: { ...this.state.register, email: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Senha' secureTextEntry
                                onChangeText={(text) => this.setState({ register: { ...this.state.register, password: text } })}
                            />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Confirmar Senha' secureTextEntry />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Nome' />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Sobrenome' />
                        </Item>
                        <Item rounded>
                            <Input placeholder='CPF' keyboardType="numeric" />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Endereço' />
                        </Item>
                        <Item rounded>
                            <Input placeholder='Cidade' />
                        </Item>
                        <Item picker rounded last>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: "100%" }}
                                placeholder="Estado"
                                headerBackButtonText="Cancelar"
                                iosHeader="Estado"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {statePickerArr}
                            </Picker>
                        </Item>
                    </Form>
                    <Button block onPress={() => this.props.dispatch(thunk_action_register(this.state.register))}>
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
       
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);