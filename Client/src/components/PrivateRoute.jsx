import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({element}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login')
        }
    },[isAuthenticated, navigate, dispatch])
    
    return isAuthenticated ? element : null;
}

export default PrivateRoute