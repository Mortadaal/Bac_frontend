import agent from "../api/agen";
import { User, UserFormValues } from "../models/users";
import { makeObservable, runInAction } from "mobx";
import { store } from "./store";
import { router } from "../router/Routes";
export default class UserStore {
    user: User | null = null;

    constructor() {
        makeObservable(this)
    }

    get isLoggedIn() {
        return !!this.user
    }

    login = async (creds: UserFormValues) => {
        const user = await agent.Account.login(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user);
        router.navigate('/')
    }

    logout = () => {
        store.commonStore.setToken(null);
        localStorage.removeItem('t');
        this.user = null;
        router.navigate('/')
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}

