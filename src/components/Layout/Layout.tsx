import { Outlet } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import Header from "../Header/Header";
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';


function Layout() {
    useEffect(() => {
        console.log(UserStore.userData.user?.active)
    }, [UserStore.userData.user])
    
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
                <p>Teie konto pole aktiivne</p>
            </>
          );
    }
  } else{
    return (
        <>
            <Header/>
            <p>Palun logige sisse</p>
        </>
      );
  }
  
}

export default observer(Layout)

