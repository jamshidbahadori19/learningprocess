import React,{useState} from 'react'
import axios from "axios"
import "./SingupStyle.css"
import background1 from "../assets/5166950.jpg"
import {useNavigate} from "react-router-dom"
import { NotificationContainer,NotificationManager } from "react-notifications";
const SignupForm = () => {
    const [email,setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignUp = async(e)=>{
        try {
            e.preventDefault()
            let user = {username,email,password}
            let response = await axios.post("http://localhost:8080/signup",user);
            if(response.data.msg=="registered successfully"){
                localStorage.setItem("token", response.data.token);
                navigate(`/login`);
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
            <form onSubmit={handleSignUp} className="signup-form">
                <div className="image-container">
                    <img src={background1} />
                </div>
                <div className="content-wrapper">
                    <div className="form-content">
                        <div className="profile-image">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" alt="2" />
                            <h2>signup form</h2>
                        </div>
                        
                        <div className="form-details">
                            <label htmlFor="username">USERNAME:</label>
                            <i className="fa-solid fa-user username"></i>
                            <input placeholder="username" type="text" name="username" id="username"
                            value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                            <label htmlFor="email">EMAIL:</label>
                            <i className="fa-solid fa-user email"></i>
                            <input placeholder="email" type="text" name="email" id="email"
                            value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <label htmlFor="password">PASSWORD:</label>
                            <i className="fa-solid fa-lock password"></i>
                            <input placeholder="password" type="password" name="password" id="password"
                            value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                            <button className="signup-btn" type='submit'>Sign Up</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
  )
}

export default SignupForm