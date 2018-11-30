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
    List,
    ListItem,
    ActionSheet
} from "native-base";
import {
    ActivityIndicator, Alert
} from 'react-native';
import Loader from "../../components/loader";
import * as consts from "../../utils/constants";
import { TextMask } from "react-native-masked-text";
import Events from '../../utils/events';

var BUTTONS = ["Visualizar", "Editar", "Remover", "Cancelar"];

class Products extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(entity) {
        const title = entity.name;
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
                        this.props.navigation.navigate("Product", { product: entity, onlyRead: true });
                        break;
                    case consts.EDIT_INDEX:
                        this.props.navigation.navigate("Product", { product: entity });
                        break;
                    case consts.REMOVE_INDEX:
                        Alert.alert(
                            title,
                            'Deseja realmente remover esse produto?',
                            [
                                { text: 'Não', onPress: () => {}, style: 'cancel' },
                                { text: 'Sim', onPress: () => this.props.doRemove(entity)},
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

    render() {
        const { loading, doFindAll, products} = this.props;
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
                        <Title>Produtos</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>

                <Content padder>
                    <Form>
                        <Button block style={{ marginBottom: 10 }}
                            onPress={() => {
                                this.props.navigation.navigate("Product")
                            }}>
                            <Text>Novo Produto</Text>
                        </Button>
                        <View>
                            <List>
                                <ListItem itemDivider style={{ flex: 1, justifyContent: "center" }} >
                                    <Text style={{ fontWeight: 'bold' }}>Resultados</Text>
                                </ListItem>
                            </List>
                            <List dataArray={products}
                                renderRow={(rowData, sectionID, rowID, highlightRow) =>
                                    <ListItem noIndent button onPress={() => { this.handleClick(rowData) }} style={{ flexDirection: "column", backgroundColor: rowID % 2 === 0 ? "#FFF" : "#F8F8F8" }}>
                                        <View style={global.list_item_results}>
                                            <Left style={{ flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>Nome</Text>
                                            </Left>
                                            <Text style={{ flex: 2 }}>{rowData.name}</Text>
                                        </View>
                                        <View style={global.list_item_results}>
                                            <Left style={{ flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>Valor</Text>
                                            </Left>
                                            <TextMask style={{ flex: 2, fontSize: 16 }} type={'money'} value={rowData.value} options={{ unit: 'R$ ' }}></TextMask>
                                        </View>
                                        <View style={global.list_item_results}>
                                            <Left style={{ flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>Quantidade</Text>
                                            </Left>
                                            <Text style={{ flex: 2 }}>{rowData.stockQuantity}</Text>
                                        </View>
                                        <View style={global.list_item_results}>
                                            <Left style={{ flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>Categoria</Text>
                                            </Left>
                                            <Text style={{ flex: 2 }}>{rowData.category.name}</Text>
                                        </View>
                                    </ListItem>
                                }>
                            </List>
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
        products: state.product.products
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        doFindAll: () =>
            dispatch(actions.product.findAll()),
        doRemove: (product) =>
            dispatch(actions.product.remove(product))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);