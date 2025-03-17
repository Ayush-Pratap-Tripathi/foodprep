import {useState} from 'react'
import './LoginPopUp.css'
import {assets} from '../../assets/assets'

const LoginPopUp = ({setShowLogin}) => {
    
    const [curState,setCurState] = useState("Sign Up")
  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{curState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {curState!=="Log In" && <input type="text" placeholder='Your Name' required/>}
                <input type="email" placeholder='Your Email' required/>
                <input type="password" placeholder='Password' required/>
                <button className='btn'>{curState==="Sign Up"?"Create Account":"Log In"}</button>
            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>
                    By continuing, I agree to the terms & privacy policy
                </p>
            </div>
            {
                curState==="Log In" 
                ? <p>Create a new account? <span onClick={()=>setCurState("Sign Up")}>Click here</span></p>
                : <p>Already have an account? <span onClick={()=>setCurState("Log In")}>Log In</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopUp