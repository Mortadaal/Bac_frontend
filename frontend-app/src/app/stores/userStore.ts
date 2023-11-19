import agent from "../api/agen";
import { User, UserFormValues } from "../models/users";
import { makeObservable, runInAction } from "mobx";
import { store } from "./store";
import { router } from "../router/Routes";
import { jwtDecode } from "jwt-decode";

export default class UserStore {
  user: User | null = null;
  userRegistry = new Map<string, User>();
  _userRole: string | null = null;
  loading = false;
  constructor() {
    makeObservable(this);
    this.loadUserRoleFromToken();
  }


  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/");
  };

  logout = () => {
    store.commonStore.setToken(null);
    localStorage.removeItem("tablenumber");
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };
  register = async (values: UserFormValues) => {
    try {
      await agent.Account.register(values);
      router.navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  private loadUserRoleFromToken = () => {
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken) as { role?: string };
        const userRole = decodedToken?.role;

        if (userRole) {
          runInAction(() => {
            this._userRole = userRole;
          });
        } else {
          console.error('Rolle ikke fundet!!:', decodedToken);
        }
      } catch (error) {
        console.error('Fejl ved Decoding af token:', error);
      }
    }
  };

  get userRole() {
    return this._userRole;
  }
}
