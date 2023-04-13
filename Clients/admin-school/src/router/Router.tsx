import axios from "axios";
import { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/Login";
import { inject, observer } from 'mobx-react';
import authServices from "../services/AuthServices";
import { CreateUser, ListUser, User } from "../components/User";
import { ProtectedRoute } from "../common/ProtectedRoute";
import {
  allUsers,
  utilisateurPermission,

} from "../common/utils/data";


const Dashboard = lazy(() => import("../components/Dashboard"));
const CreateStudent = lazy(() => import("../components/Student/CreateStudent/CreateStudent"));
const CreateClass=lazy(() => import("../components/Class/CreateClass/CreateClass"));
const ListClass=lazy(() => import("../components/Class/ListClass/listClass"));
const Ecolage = lazy(() => import("../components/Student/Ecolage/Ecolage"));
const ListStudent = lazy(() => import("../components/Student/ListStudent/listStudent"));
const CreateProfessor = lazy(() => import("../components/Professor/CreateProfessor"));
const ListProfessor = lazy(() => import("../components/Professor/ListProfessor"));
// import Dashboard from "../components/Dashboard";

let signOutTime: any = 0;

const signOut = () => {
  authServices.setAccessToken("");
  authServices.signOut();
};

const startTimer = () => {
  signOutTime = setTimeout(signOut, 1800000);
};

const Router = () => {

  axios.interceptors.response.use((resp) => {
    const { token } = resp.headers;
    if (token !== "" && token !== undefined) {
      if (signOutTime === 0 || signOutTime === undefined) {
        startTimer();
      } else {
        clearTimeout(signOutTime);
        startTimer();
      }
      authServices.setAccessToken(token);

    }
    return resp;
  });

  return (
    <Switch>
      <Route
        path="/login"
        // path={login}
        exact={true}
        component={Login}
      />
      <ProtectedRoute
        path="/"
        // path={pathDefault}
        exact={true}
        component={Dashboard}
        access={allUsers}
      />
      <ProtectedRoute
        path="/user/list"
        exact={true}
        component={ListUser}
        // access={adminswithCom}
        access={utilisateurPermission}
      />
      <ProtectedRoute
        path="/user/new-user"
        exact={true}
        // access={adminswithCom}
        access={utilisateurPermission}
        component={CreateUser}
      />
      <ProtectedRoute
        path="/user/profile"
        exact={true}
        component={User}
        access={allUsers}
      />
      <ProtectedRoute
        path="/student/list"
        exact={true}
        component={ListStudent}
        // access={adminswithCom}
        access={utilisateurPermission}
      />
      <ProtectedRoute
        path="/student/new-student"
        exact={true}
        // access={adminswithCom}
        access={utilisateurPermission}
        component={CreateStudent}
      />
      <ProtectedRoute
        path="/student/ecolage"
        exact={true}
        component={Ecolage}
        access={allUsers}
        />
      <ProtectedRoute
        path="/professor/new-professor"
        exact={true}
        // access={adminswithCom}
        access={utilisateurPermission}
        component={CreateProfessor}
      />
      <ProtectedRoute
        path="/professor/list"
        exact={true}
        // access={adminswithCom}
        access={utilisateurPermission}
        component={ListProfessor}
      />
        <ProtectedRoute
        path="/class/new-class"
        exact={true}
        // access={adminswithCom}
        access={utilisateurPermission}
        component={CreateClass}
      />
        <ProtectedRoute
        path="/class/list"
        exact={true}
        // access={adminswithCom}
        access={utilisateurPermission}
        component={ListClass}
      />
    </Switch>
  )
};

export default inject('authStore', 'userStore')(observer(Router));
