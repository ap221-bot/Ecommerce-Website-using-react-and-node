import React, { useState } from "react";
import './Login.css'

const Login = () => {

    const [state,setState] = useState("Login");
    const [fieldData,setFieldData] = useState({
        username:"",
        password:"",
        email:""
    })

    const changeHandler = (e) => {
        setFieldData({...fieldData,[e.target.name]:e.target.value})
    }

    const login = async () => {
        let resData;
        await fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(fieldData),
        }).then((response)=> response.json()).then((data)=>resData=data)

        if(resData.success)
        {
            localStorage.setItem('auth-token',resData.token);
            window.location.replace("/");
        }
        else
        {
            alert(resData.error);
        }

    }

    const signup = async () => {
        let resData;
        await fetch('http://localhost:5000/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(fieldData),
        }).then((response)=> response.json()).then((data)=>resData=data)

        if(resData.success)
        {
            localStorage.setItem('auth-token',resData.token);
            window.location.replace("/");
        }
        else
        {
            alert(resData.error);
        }
    }

    return(
        <div className="login">
            <div className="loginContainer">
                <h1>{state}</h1>
                <div className="fields">
                    {state==="Sign Up"?<input type="text" name="username" value={fieldData.username} onChange={changeHandler} placeholder="Your Name"/>:<></>}
                    <input name="email" value={fieldData.email} onChange={changeHandler} type="email" placeholder="Email Address"/>
                    <input type="password" name="password" value={fieldData.password} onChange={changeHandler} placeholder="Password"/>
                </div>
                <button onClick={()=>{state==="Login"?login():signup()}}>Let's Go</button>
                {state==="Sign Up"?<p className="alreadyAccount">Already Have An Account? <span onClick={()=>{setState("Login")}}> Click Here to Login!! </span></p>
                :<p className="alreadyAccount">Don't have an account? <span onClick={()=>{setState("Sign Up")}}> Click Here to Sign Up!! </span></p>}
                
                
            </div>
        </div>
    )
} 

export default Login