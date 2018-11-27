import React, { Component } from "react";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import { actions, States } from "../../store";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Input,
  Icon,
  Left,
  Right,
  Body,
  ListItem,
  List,
  Thumbnail,
  View,
  Item
} from "native-base";
import Loader from "../../components/loader";
import styles from "./styles";
import global from "./../../theme/global";
import { TextMask } from "react-native-masked-text";

var image = require('./../../../assets/icon.png');

productArr = [
  {
    id: 1,
    name: "Cerveja Heineken 600ml",
    value: 8.00,
    qnt: 1,
  },
  {
    id: 2,
    name: "Cerveja Budweiser 600ml",
    value: 5.30,
    qnt: 1
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
  }

  componentDidMount() {
    this.init();
    //this.refreshEvent = Events.subscribe('RefreshList', () => this.init());
  }

  init() {
    this.props.doFindAllProducts();
  }

  componentWillUnmount() {
    //this.refreshEvent.remove();
  }

  handleClickCart() {
    alert("I am cart");
    // Call method from parent
    //this.props.onPress();
  }



  handleQuantityChange(index, value) {
    this.props.doSetQuantity(index, value);
  }

  render() {
    const { products, doIncrement, doDecrement, loading } = this.props;
    const { query } = this.state;

    return (
      <Container style={global.container}>
        <StatusBar barStyle="dark-content" />
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
            <Title>Palácio das Cervejas</Title>
          </Body>
          <Right style={{ flex: 1 }} >
            <Button transparent onPress={this.handleClickCart} dark>
              <Icon name="ios-cart" style={{ color: "#000" }} />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <View style={{ flexDirection: "row", height: 45, borderBottomWidth: 0.5, borderColor: "#c9c9c9" }}>
            <Item rounded style={{ flex: 3, backgroundColor: "#e3e3e3" }}>
              <Icon name="ios-search" />
              <Input placeholderTextColor="#575757" placeholder="Nome, estilo, volume..." style={{ fontSize: 14 }}></Input>
            </Item>
            <Button transparent style={{ flex: 1, paddingBottom: 15, height: 45 }}>
              <Text uppercase={false} style={{ color: "#000" }}> Buscar</Text>
            </Button>
          </View>
          <List>
            {
              products.map((product, i) => {
                return <ListItem thumbnail key={i}>
                  <Left>
                    <Thumbnail large square source={image} />
                  </Left>
                  <Body>
                    <Text style={{ fontWeight: 'bold' }}>{product.name}</Text>
                    <TextMask style={{ fontSize: 18 }} type={'money'} value={product.value} options={{ unit: 'R$ ' }}></TextMask>
                    <View style={{ width: 140, marginTop: 10, flexDirection: "row", alignSelf: "center", alignItems: "center", borderRadius: 10, borderStyle: "solid", borderWidth: 0.5, borderColor: "#000" }}>
                      <Button small transparent onPress={() => { doDecrement(i) }}
                        style={{ borderRightWidth: 0.5, borderRadius: 0, borderColor: "#000" }}>
                        <Icon name="ios-remove" style={{ color: "#000" }} />
                      </Button>
                      <Input style={{ flex: 1, textAlign: "center", height: "100%" }}
                        name={i}
                        type="num"
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={(txt) => this.handleQuantityChange(i, txt)}
                      >{product.qnt ? product.qnt : 1}</Input>
                      <Button small transparent onPress={() => { doIncrement(i) }}
                        style={{ borderLeftWidth: 0.5, borderRadius: 0, borderColor: "#000" }}>
                        <Icon name="ios-add" style={{ color: "#000" }} />
                      </Button>
                    </View>
                  </Body>
                  <Right>
                    <Button onPress={this.handleClickAddCart}>
                      <Icon name="ios-cart" style={{ color: "#000" }} />
                    </Button>
                  </Right>
                </ListItem>
              })
            }
          </List>
        </Content>
      </Container >
    );
  }
}

const mapStateToProps = (state: States) => {
  return {
    loading: state.app.loading,
    products: state.home.products
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doFindAllProducts: (products) =>
      dispatch(actions.home.findAllProducts()),
    doIncrement: (index) =>
      dispatch(actions.home.increment(index)),
    doDecrement: (index) =>
      dispatch(actions.home.decrement(index)),
    doSetQuantity: (index, quantity) =>
      dispatch(actions.home.setQuantity(index, quantity))

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);