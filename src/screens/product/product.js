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
    Spinner,
    Picker
} from "native-base";
import {
    ActivityIndicator
} from 'react-native';
import Loader from "../../components/loader";
import { TextInputMask, TextMask } from "react-native-masked-text";
import * as consts from "../../utils/constants";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                id: null,
                name: '',
                value: 0,
                stockQuantity: 1,
                category: {}
            },
            title: 'Novo Produto',
            onlyRead: false,
            valueInput: '',
        }
    }

    componentDidMount() {
        if (this.props.navigation.state.params) {
            const onlyRead = this.props.navigation.state.params.onlyRead;
            this.setState({
                product: this.props.navigation.state.params.product,
                onlyRead: onlyRead,
                title: onlyRead ? 'Visualizar Produto' : 'Editar Produto',
                valueInput: this.props.navigation.state.params.product.value
            })
        }
        this.props.doFindAllCategories();
    }

    onCategoryChange(categoryId) {
        const category = { id: categoryId }
        this.setState({ product: { ...this.state.product, category: category } });
    }

    onValueChange(value) {
        this.setState({ valueInput: value });
        const valueNumber = value.replace("R$ ", "").replace(",", ".");
        this.setState({ product: { ...this.state.product, value: Number(valueNumber) } });
    }

    /*
    * Renderizar
    */
    render() {
        const { product, title, onlyRead, valueInput } = this.state;
        const { loading, categories, doSave } = this.props;
        let isEnabled = product.name.length > 0 && product.value > 0;
        if (product.id){
            isEnabled = isEnabled && product.stockQuantity >= 0 && product.stockQuantity !== "" ;
        } else {
            isEnabled = isEnabled && product.stockQuantity > 0 && product.category.id !== undefined;
        }
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
                        <Item rounded>
                            <Input placeholder='Nome'
                                value={product.name}
                                disabled={onlyRead}
                                onChangeText={(text) => this.setState({ product: { ...product, name: text } })}
                            />
                        </Item>
                        <Item rounded>
                            {!onlyRead ?
                                <TextInputMask style={global.input_mask}
                                    placeholder='Valor'
                                    type={'money'} options={{ unit: 'R$ ' }}
                                    value={valueInput}
                                    onChangeText={this.onValueChange.bind(this)}
                                />
                                :
                                <TextMask style={global.text_mask}
                                    value={product.value}
                                    type={'money'} options={{ unit: 'R$ ' }}
                                />
                            }

                        </Item>
                        <Item rounded>
                            <Input placeholder='Quantidade'
                                value={String(product.stockQuantity)}
                                disabled={onlyRead}
                                keyboardType="number-pad"
                                onChangeText={(text) => this.setState({ product: { ...product, stockQuantity: text } })}
                            />
                        </Item>
                        <Item picker rounded last>
                            {!onlyRead ?
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon type="MaterialCommunityIcons" name="ios-arrow-down-outline" />}
                                    style={{ width: "100%" }}
                                    placeholder="Categoria"
                                    headerBackButtonText="Cancelar"
                                    iosHeader="Categoria"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={product.category.id}
                                    onValueChange={this.onCategoryChange.bind(this)}
                                >
                                    {
                                        categories.map((category, i) => (
                                            <Picker.Item key={i} label={category.name} value={category.id} />
                                        ))
                                    }
                                </Picker>
                                :
                                <Input
                                    value={product.category.name}
                                    disabled={onlyRead}
                                />
                            }
                        </Item>
                    </Form>
                    {!onlyRead ?
                        <Button block style={{ marginBottom: 10 }} disabled={!isEnabled}
                            onPress={() => {
                                doSave(product);
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
        loading: state.app.loading,
        categories: state.category.categories
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        doFindAllCategories: () =>
            dispatch(actions.category.findAll()),
        doSave: (product) =>
            dispatch(actions.product.save(product))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);