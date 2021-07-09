import React, { useEffect } from "react";
import {
  Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import SockJsClient from 'react-stomp';
import { getCity } from "./pages/customer/actions/locationActions";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Modals from "./components/modal/modal";
import "./styles/app.scss";
import LoginPage from "./pages/login/login";
import DashBoard from "pages/dashboard/DashBoard";
import NotFoundComponent from "./components/notfound/NotFoundComponent";
import { checkInfoUser } from "./pages/login/actions/loginAction";
import PrivateRoute from "./components/router/PrivateRoute";
import { SOCKET_URL_V2 } from "./constants/api";
import { getStaffsByRepairman } from "./actions/commons";
import { notificationMaintenanceCard, getMessages } from "./actions/notificationAction";
import storage from "./utils/storage";
import history from './utils/history';
import FeedBack from "./components/topBar/feedback/FeedBack";
import RegisterPage from "./pages/register/RegisterPage";
import { addMainCardSocket } from "./pages/maintenancecard/actions/mainCard";

function App(props) {
  const { onCheckInfoUser, onNotificationMaintenanceCard, user } = props;
  useEffect(() => {
    const token = storage.get("token", false);
    if (!token && window.location.pathname === '/register') {
      history.push(window.location.pathname);
    } else if (!token) history.push("/login");
    if (token) {
      onCheckInfoUser(token);
      props.onGetMessages();
      props.onGetCity();
      props.getStaffsByRepairman();
    }
    if (token && window.location.pathname === "/login") history.push("/maintenance-cards");
    if (token && window.location.pathname) {
      history.push(window.location.pathname);
    }
  }, []);

  const onConnected = () => {
    //window.alert("Connected!!")
  }

  const onMessageReceived = (msg) => {
    onNotificationMaintenanceCard(msg, user);
    props.addMainCardSocket(msg.maintenanceCard)
  }

  const onDisconnect = () => {
    window.alert("Disconnected!");
  }
  return (
    <Router history={history}>
      <SockJsClient
        url={SOCKET_URL_V2}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={onDisconnect}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <ToastContainer
        className='toast-custom'
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        closeButton={false}
        limit={1}
      />
      <Modals />
      <FeedBack />
      <Switch>
        <Route path="/404" component={NotFoundComponent} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <PrivateRoute path="/" component={() => <DashBoard />} />
        <Route component={NotFoundComponent} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  const {
    globalUI: { showMenuTopBar },
    auth: { user },
  } = state;
  const showMenu = showMenuTopBar;
  return {
    showMenu,
    user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onGetMessages: () => dispatch(getMessages()),
  onCheckInfoUser: (token) => dispatch(checkInfoUser(token)),
  onGetCity: () => dispatch(getCity()),
  getStaffsByRepairman: () => dispatch(getStaffsByRepairman()),
  addMainCardSocket: (item) => dispatch(addMainCardSocket(item)),
  onNotificationMaintenanceCard: (notification, user) => dispatch(notificationMaintenanceCard(notification, user)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
