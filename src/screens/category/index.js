import React, { Component } from "react";
import axios from 'axios';
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
    List,
    ListItem,
    ActionSheet,
} from "native-base";
import {
    ActivityIndicator, Alert
} from 'react-native';
import Loader from "../../components/loader";
import * as consts from "../../utils/constants";
var BUTTONS = ["Visualizar", "Editar", "Remover", "Cancelar"];
import Events from '../../utils/events';

class Categories extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.init();
        this.refreshEvent = Events.subscribe('RefreshList', () => this.init());
    }

    init() {
        this.props.doFindAll();
    }

    componentWillUnmount() {
        this.refreshEvent.remove();
    }

    handleClick(category) {
        const title = category.name;
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: consts.CANCEL_INDEX,
                destructiveButtonIndex: consts.REMOVE_INDEX,
                title: title
            },
            buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
                switch (buttonIndex) {
                    case consts.VISUALIZE_INDEX:
                        this.props.navigation.navigate("Category", { category: category, onlyRead: true });
                        break;
                    case consts.EDIT_INDEX:
                        this.props.navigation.navigate("Category", { category: category });
                        break;
                    case consts.REMOVE_INDEX:
                        Alert.alert(
                            title,
                            'Deseja realmente remover essa categoria? Todos os produtos desta categoria serão removidos também.',
                            [
                                { text: 'Não', onPress: () => {} , style: 'cancel' },
                                { text: 'Sim', onPress: () => this.props.doRemove(category)},
                            ],
                            { cancelable: false }
                        )
                        break;
                    default:
                        break;
                }
            }
        )
    }

    render() {
        const { loading, categories } = this.props;
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
                        <Title>Categorias</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>

                <Content padder>
                    <Form>
                        <Button block style={{ marginBottom: 10 }}
                            onPress={() => this.props.navigation.navigate("Category")}>
                            <Text>Nova Categoria</Text>
                        </Button>
                        <View>
                            <List>
                                <ListItem itemDivider style={{ flex: 1, justifyContent: "center" }} >
                                    <Text style={{ fontWeight: 'bold' }}>Resultados</Text>
                                </ListItem>
                            </List>
                            {categories.length > 0 &&
                                <List dataArray={categories}
                                    renderRow={(rowData, sectionID, rowID, highlightRow) =>
                                        <ListItem noIndent button onPress={() => { this.handleClick(rowData) }} style={{ backgroundColor: rowID % 2 === 0 ? "#FFF" : "#F8F8F8" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Left style={{ flex: 1 }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Nome</Text>
                                                </Left>
                                                <Text style={{ flex: 2 }}>{rowData.name}</Text>
                                            </View>
                                        </ListItem>
                                    }>
                                </List>}
                            {categories.length == 0 &&
                                <List>
                                    <ListItem noIndent style={{ flex: 1, justifyContent: "center", backgroundColor: "#FFF" }} >
                                        <Text>Nenhum registro encontrado</Text>
                                    </ListItem>
                                </List>
                            }
                        </View>
                    </Form>
                </Content>
            </Container >
        );
    }
}

const mapStateToProps = (state: States) => {
    return {
        loading: state.app.loading,
        categories: state.category.categories
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        doFindAll: () =>
            dispatch(actions.category.findAll()),
        doRemove: (category) =>
            dispatch(actions.category.remove(category))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);