import { makeAutoObservable } from "mobx";
import { UserType } from "../types/UserType";

class UserStore { 
    constructor() { 
        makeAutoObservable(this); 
    }

    userData: {isLoggedIn: boolean, user: UserType | null} = { 
        isLoggedIn: false, 
        user: null,
    }

    setIsLoggedIn(newValue: boolean) { 
        this.userData.isLoggedIn = newValue; 
    } 
    setUserData(newValue: UserType) { 
        this.userData.user = newValue; 
    }
}


export default new UserStore();