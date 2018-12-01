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

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                id: null,
                name: ''
            },
            title: 'Nova Categoria',
            onlyRead: false
        }
    }

    componentDidMount() {
        if (this.props.navigation.state.params) {
            const onlyRead = this.props.navigation.state.params.onlyRead;
            this.setState({ category: this.props.navigation.state.params.category });
            this.setState({ onlyRead: onlyRead });
            this.setState({ title: onlyRead ? 'Visualizar Categoria' : 'Editar Categoria' });
        }
    }


    /*
    * Renderizar
    */
    render() {
        const { category, title, onlyRead } = this.state;
        const { loading, doSave } = this.props
        const isEnabled = category.name.length > 0;
        return (
            <Container style={global.container}>
                <Loader loading={loading} />
                <Header style={global.primary_color} androidStatusBarColor="#DEB704">
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()} dark>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3, alignItems: "center" }}>
                        <Title>{title}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>

                <Content padder>
                    <Form>
                        <Text>{onlyRead}</Text>
                        <Item rounded last>
                            <Input placeholder='Nome'
                                value={category.name}
                                disabled={onlyRead}
                                onChangeText={(text) => this.setState({ category: { ...category, name: text } })}
                            />
                        </Item>
                    </Form>
                    {!onlyRead ?
                        <Button block style={{ marginBottom: 10 }} disabled={!isEnabled}
                            onPress={() => {
                                doSave(category);
                            }}>
                            <Text>Salvar</Text>
                        </Button> : null
                    }

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
        doSave: (category) =>
            dispatch(actions.category.save(category))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);