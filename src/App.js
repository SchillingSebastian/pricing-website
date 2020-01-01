import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Information from "./components/Information";
import myLineGraph from "./components/Visualization";

import { Layout, Menu, Icon } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
    diplayed: "Information"
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  updateStatus(pageName) {
    this.setState({ diplayed: pageName });
    console.log("Updated to " + pageName);
  }

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <Icon type="info-circle" />
                <span>Information</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => this.updateStatus("Visualization")}
              >
                <Icon type="pie-chart" />
                <span>Visualization</span>
                <Link to="/visualization" />
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="desktop" />
                    <span>Tasks</span>
                  </span>
                }
              >
                <Menu.Item key="3">Running</Menu.Item>
                <Menu.Item key="4">Scheduled</Menu.Item>
                <Menu.Item key="5">Completed</Menu.Item>
              </SubMenu>
              <Menu.Item key="6">
                <Icon type="line-chart" />
                <span> Server Load</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }} />
            <Content style={{ margin: "0 16px", background: "#fff" }}>
              <Route exact path="/" component={Information} />
              <Route exact path="/visualization" component={myLineGraph} />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Sebastian Schilling - created with Ant Design and Charts.js
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

//ReactDOM.render(<SiderDemo />, mountNode);

export default App;
