import React, { Component } from "react";

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

const datas = [
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

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container style={styles.container}
      >
        <Content
          bounces={false}
        >
          <List>
            <ListItem
              button
              noBorder
              noIndent
              style={global.primary_color}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Left>
                <Text style={styles.text}>
                  ENTRAR
                </Text>
              </Left>
            </ListItem>
          </List>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                noIndent
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>} />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
