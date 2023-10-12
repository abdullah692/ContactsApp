import { Navigate } from "react-router-dom";

export const ProtectedRoute=({
user,
redirectPath="/",
children
})=>{
    console.log(user,'cccccccccccccccc');
    if(user?.user == null)
    {
        return <Navigate to={redirectPath}  replace={true}/>
    }
    return children
}