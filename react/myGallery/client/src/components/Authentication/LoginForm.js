import React,{useState} from 'react'
import axios from "axios"
import "./SingupStyle.css"
import background1 from "../assets/3626052.jpg"
import {useNavigate} from "react-router-dom"
import { NotificationContainer,NotificationManager } from "react-notifications";

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    let token = localStorage.getItem("token")
    console.log(token)
    async function login(e){

        try {
            e.preventDefault()
            let user = {username, password}
            let response = await axios.post("http://localhost:8080/login",user,
            {
                headers:{Authentication:`Bearer${token}`,},
            });
            if(response.data.msg==="welcome"){
                localStorage.setItem("token", response.data.token);

                navigate("/");
              }else{
                NotificationManager.warning(response.data.msg,'',3000)
              }
        } catch (error) {
            NotificationManager.error('Error message', 'Close after 3000ms', 3000);
        }

  
    }

  return (
    <div>
        <NotificationContainer/>
        <section>
            <form onSubmit={login} className="signup-form">
                <div className="image-container">
                    <img src={background1} />
                </div>
                <div className="content-wrapper">
                    <div className="form-content">
                        <div className="profile-image">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" alt="2" />
                            <h2>Login form</h2>
                        </div>
                        
                        <div className="form-details" style={{"height":"50%"}}>
                            <label htmlFor="username">USERNAME:</label>
                            <i className="fa-solid fa-user username"  style={{"top":"45px"}}></i>
                            <input placeholder="username" type="text" name="username" id="username"
                            value={username} onChange={(e)=>setUsername(e.target.value)} />
                            <label htmlFor="password">PASSWORD:</label>
                            <i className="fa-solid fa-lock password"  style={{"top":"130px"}}></i>
                            <input placeholder="password" type="password" name="password" id="password"
                            value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <button className="signup-btn" type='submit'>Log in</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
  )
}

export default LoginForm