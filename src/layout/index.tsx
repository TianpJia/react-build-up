import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import "./index.css";
import MyContent from "./component/Content";
import Sider from "antd/es/layout/Sider";
import MyMenu from "./component/Menu";

const { Header, Content, Footer } = Layout;

const MyLaout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="main-layout">
      <Header style={{ backgroundColor: "#5ea1e0" }}>
        <div>Demo</div>
      </Header>
      <Layout>
        <Sider theme="dark" collapsible>
          <MyMenu></MyMenu>
        </Sider>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-content"
            style={{ background: colorBgContainer }}
          >
            <MyContent></MyContent>
          </div>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLaout;
