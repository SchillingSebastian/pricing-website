import React from "react";
import "./App.css";
import Information from "./components/Information";

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
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => this.updateStatus("Visualization")}
            >
              <Icon type="pie-chart" />
              <span>Visualization</span>
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
              <Menu.Item key="4">Schduled</Menu.Item>
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
            <div id="content-area">
              <Information />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Sebastian Schilling - created with Ant Design and Charts.js
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

//ReactDOM.render(<SiderDemo />, mountNode);

export default App;
