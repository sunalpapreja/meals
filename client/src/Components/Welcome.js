import React, {useEffect} from 'react';
import Navbar from './Navbar';

const Welcome = (props) => {

    useEffect(() => {
        var accessToken = localStorage.getItem("accessToken");
        console.log(accessToken)
        if(accessToken)
        {
            props.history.push("/home");
        }
    })

    return (
        <div>
            <Navbar {...props}/>
        </div>
    )
}

export default Welcome;