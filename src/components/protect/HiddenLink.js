import {useSelector} from 'react-redux'

export const ShowOnLogin=({children})=>{
const {isLoggedIn}=useSelector((state)=>state.auth)
    if(isLoggedIn){
        return <>{children}</>
    }
    else{
        return null;
    }
    //return isLoggedIn?<>{children}</>:null;
}

export const ShowOnLogout=({children})=>{
    const {isLoggedIn}=useSelector((state)=>state.auth)

    if(!isLoggedIn){
        return <>{children}</>
    }
    else{
        return null;
    }
}

export const AdminAuthorLink=({children})=>{
    const {isLoggedIn,user}=useSelector((state)=>state.auth)

    return (isLoggedIn && (user?.role=== 'admin' || user?.role=== 'author'))?<>{children}</>:null;
}