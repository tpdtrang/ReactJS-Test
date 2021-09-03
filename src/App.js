import "./App.css";
import ShowList from "./page/ShowList";
import "antd/dist/antd.css";
import { Menu } from "antd";
import Todos from "./page/Todos";
import Photos from "./page/Photos";
import Comments from "./page/Comments";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import UserDetail from "./component/UserDetail";

const App = () => {
  const routers = [
    { id: 1, path: "/users", component: ShowList, exact: true, title: "Users" },
    { id: 2, path: "/todos", component: Todos, exact: true, title: "Todos" },
    { id: 3, path: "/photos", component: Photos, exact: true, title: "Photos" },
    {
      id: 4,
      path: "/comments",
      component: Comments,
      exact: true,
      title: "Comments",
    },
    {
      id: 5,
      path: "/users/:id",
      component: UserDetail,
      exact: true,
      title: null,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", height: "100vh", width: "100%" }}>
        <div style={{ width: "300px", borderRight: "1px solid #ccc" }}>
          <Menu
            style={{
              border: "none",
              paddingTop: 10,
            }}
            selectable={false}
          >
            {routers
              .filter((item) => item.title !== null)
              .map((router) => (
                <Menu.Item
                  className={
                    window.location.pathname === router.path
                      ? "ant-menu-item-selected"
                      : ""
                  }
                  key={router.path}
                >
                  <a href={router.path}>{router.title}</a>
                </Menu.Item>
              ))}
          </Menu>
        </div>
        <div style={{ width: "100%", padding: 24 }}>
          <Router>
            <Switch>
              {routers.map((router) => (
                <Route
                  key={router.id}
                  path={router.path}
                  component={router.component}
                  exact={router.exact}
                ></Route>
              ))}
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default App;
