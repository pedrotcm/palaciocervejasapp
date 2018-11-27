import React, { Component } from "react";
import global from "../../theme/global";
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

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    render() {
        const { loading } = this.props

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
                        <Title>Relatórios</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>

                <Content padder>
                    <Form>
                        
                    </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(Report);