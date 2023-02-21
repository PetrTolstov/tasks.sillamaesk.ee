import { Outlet } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import Header from "../Header/Header";
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';


function Layout() {
    
  if(UserStore.userData.user){
    if(UserStore.userData.user?.active){
        return (
            <>
                <Header/>
                <Outlet />
            </>
          );
    }else{
        return (
            <>
                <Header/>
                <p>Your account is not active</p>
            </>
          );
    }
  } else{
    return (
        <>
            <Header/>
            <p>Please Log in</p>
        </>
      );
  }
  
}

export default observer(Layout)

