import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import CacluateAeara from "../Caculate";

const MenuContext = React.createContext<MenuContextInterface>({
  selectedText: "",
  updateSelectedText: () => {},
});
interface MenuContextInterface {
  selectedText: string;
  updateSelectedText: (text: string) => void;
}

const Item: React.FC<{
  menu: any;
}> = ({ menu }) => {
  const context = useContext(MenuContext);
  return (
    <div
      className={`menu-item`}
      style={{
        backgroundColor:
          menu.text === context.selectedText ? "rgb(231, 111, 111)" : "",
      }}
      key={menu.text}
      onClick={() => {
        context.updateSelectedText(menu.text);
      }}
    >
      {menu.text}
    </div>
  );
};

const SubMenu: React.FC<{
  menus: any[];
}> = ({ menus }) => {
  const [subMenus, setSubMenus] = useState<any[]>([]);
  useEffect(() => {
    setSubMenus(menus);
  }, [menus]);
  return (
    <div style={{ marginLeft: "8px" }}>
      {subMenus.map((menu) => {
        return <Item menu={menu} key={menu.text}></Item>;
      })}
    </div>
  );
};

const Menu: React.FC<{ menu: any }> = ({ menu }) => {
  const [isClosed, setIsClose] = useState(true);
  const context = useContext(MenuContext);
  return (
    <div>
      <div
        className="menu-item"
        style={{
          backgroundColor:
            menu.text === context.selectedText ? "rgb(231, 111, 111)" : "",
        }}
        onClick={() => {
          context.updateSelectedText(menu.text);
        }}
      >
        {menu.text}
        <span
          style={{ float: "right", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsClose((pre) => !pre);
          }}
        >
          {isClosed ? "open" : "close"}
        </span>
      </div>
      {isClosed ? <></> : <SubMenu menus={menu.subMenu} />}
    </div>
  );
};

const Sider: React.FC<{ menus: any[] }> = ({ menus }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const update = (text: string) => {
    setSelectedValue(text);
  };
  return (
    <div>
      <MenuContext.Provider
        value={{ selectedText: selectedValue, updateSelectedText: update }}
      >
        {menus.map((menu, i) => {
          return <Menu menu={menu} key={menu.text} />;
        })}
      </MenuContext.Provider>
    </div>
  );
};

const MenuDemo: React.FC = () => {
  const menus = new Array(5).fill(0).map((_, i) => {
    return {
      text: `menu${i}`,
      subMenu: [
        { text: `menu${i} - submenu${i}`, isSelected: false },
        { text: `menu${i} - submenu${i + 1}`, isSelected: false },
      ],
      isSelected: false,
    };
  });
  return (
    <div>
      <Row style={{ height: 680 }}>
        <Col className="left-side" flex={"250px"}>
          <Sider menus={menus}></Sider>
        </Col>
        <Col className="right-content" flex={"auto"}>
          <CacluateAeara />
        </Col>
      </Row>
    </div>
  );
};

export default MenuDemo;
