import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, States } from '../../store';

import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./styles";
import global from "../../theme/global";

const adminMenus = [
  {
    name: "Pagina Inicial",
    route: "Home"
  },
  {
    name: "Categorias",
    route: "Categories"
  },
  {
    name: "Produtos",
    route: "Products"
  },
  {
    name: "Pedidos",
    route: "Order"
  },
  {
    name: "Relatórios",
    route: "Report"
  }
];

const userMenus = [
  {
    name: "Minha Conta",
    route: "Account"
  },
  {
    name: "Meus Pedidos",
    route: "MyOrders"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  componentDidMount() {
    this.props.doFindAllCategories();
  }

  render() {
    const { isAdmin, loggedIn, user, categories, doLogout } = this.props;
    return (
      <Container style={styles.container}>
        <Content
          bounces={false}>
          <List>
            <ListItem
              button
              noBorder
              noIndent
              disabled={loggedIn}
              style={{ ...global.primary_color, height: 50 }}
              onPress={() => this.props.navigation.navigate("Login")}>
              <Left>
                <Text style={styles.text}>
                  {!loggedIn ? "ENTRAR" : "Bem vindo, " + user.name}
                </Text>
              </Left>
            </ListItem>
          </List>
          {loggedIn && <List
            dataArray={isAdmin ? adminMenus : userMenus}
            renderRow={data =>
              <ListItem
                button
                noIndent
                onPress={() => this.props.navigation.navigate(data.route)}>
                <Left>
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>} />
          }
          <List>
            <ListItem
              button
              noIndent
              itemHeader first>
              <Left>
                <Text style={styles.text}>
                  Estilos
                </Text>
              </Left>
            </ListItem>
          </List>
          <List
            showsVerticalScrollIndicator={true}
            dataArray={categories}
            style={{height: 200}}
            renderRow={data =>
              <ListItem
                button
                noIndent
                style={styles.subitem}
                onPress={() => console.log(data)}>
                <Left>
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>} />
          {loggedIn && <List>
            <ListItem
              button
              noIndent
              noBorder
              last
              onPress={() => doLogout()}>
              <Left>
                <Text style={styles.text}>
                  Sair
                </Text>
              </Left>
            </ListItem>
          </List>}
        </Content>
      </Container >
    );
  }
}

const mapStateToProps = (state: States) => {
  return {
    isAdmin: state.auth.isAdmin,
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    categories: state.category.categories
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doFindAllCategories: () =>
      dispatch(actions.category.findAll()),
    doLogout: () => 
      dispatch(actions.auth.logout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);