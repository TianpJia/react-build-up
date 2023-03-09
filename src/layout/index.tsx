import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import './index.css'
import MyContent from './component/Content';

const { Header, Content, Footer } = Layout;

const MyLaout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header style={{backgroundColor: '#5ea1e0'}}>
        <div>Demo</div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          <MyContent></MyContent>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default MyLaout;