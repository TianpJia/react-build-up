import { Menu } from "antd";
import { Link } from "react-router-dom";

function AppMenu(props: any) {
  const { menuItems } = props;

  return (
    <Menu theme="dark">
      {menuItems.map((item: any) => (
        <Menu.Item key={item.key}>
          <Link to={item.link}>{item.title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

const MENU_ITEMS = [
  { key: "home", title: "Home", link: "/home" },
  { key: "Statistics", title: "Statistics", link: "/statistics" },
  { key: "Dashbord", title: "Dashbord", link: "/dashbord" },
];

const MyMenu: React.FC = () => {
  return (
    <div style={{ marginTop: 16 }}>
      <AppMenu menuItems={MENU_ITEMS} />
    </div>
  );
};

export default MyMenu;
