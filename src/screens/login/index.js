import React, { Component } from "react";
import global from "./../../theme/global";
import { connect } from 'react-redux'
import { actions, States } from '../../store'
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
    Spinner
} from "native-base";
import {
    ActivityIndicator
} from 'react-native';
import Loader from "../../components/loader";

class Login extends Component {
    constructor(props) {
        super(props);
        // init local state
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillMount() {
        this.props.doClearError();
    }

    /*
    * Renderizar
    */
    render() {
        const { email, password } = this.state;
        const { loading, doLogin, error } = this.props;
        const isEnabled = email.length > 0 && password.length > 0;
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
                        <Text style={global.form_header}>Já sou cliente</Text>
                        <Item rounded>
                            <Input placeholder='E-mail' keyboardType="email-address" autoCapitalize="none"
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </Item>
                        <Item rounded last>
                            <Input name="password" placeholder='Senha' secureTextEntry
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                        </Item>
                    </Form>
                    {error.length > 0 && <Text style={{ textAlign: "center", color: "red", marginBottom: 15 }}>{error}</Text>}
                    <Button block style={{ marginBottom: 10 }} disabled={!isEnabled}
                        onPress={() => {
                            doLogin(this.state.email, this.state.password)
                        }}>
                        <Text>Acessar Conta</Text>
                    </Button>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ flex: 2, borderRadius: 1, borderStyle: "solid", borderWidth: 0.5, borderColor: "#000" }}></View>
                        <Text style={{ flex: 1, textAlign: "center" }}>ou</Text>
                        <View style={{ flex: 2, borderRadius: 1, borderStyle: "solid", borderWidth: 0.5, borderColor: "#000" }}></View>
                    </View>
                    <Button block bordered style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate("Register")}>
                        <Text>Criar Conta</Text>
                    </Button>
                </Content>
            </Container >
        );
    }
}

const mapStateToProps = (state: States) => {
    return {
        loading: state.app.loading,
        error: state.auth.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (email, password) =>
            dispatch(actions.auth.login(email, password)),
        doClearError: () =>
            dispatch(actions.auth.clearError())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);