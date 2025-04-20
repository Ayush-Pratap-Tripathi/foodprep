import { useState, useContext } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopUp = ({ setShowLogin }) => {
  const [curState, setCurState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const { url, token, setToken } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newURL = url;
    if (curState === "Sign Up") {
      newURL = `${url}/api/user/register`;
    } else {
      newURL = `${url}/api/user/login`;
    }

    try {
      const response = await axios.post(newURL, data);
      if (curState === "Sign Up") {
        toast.success("Sign Up successful");
        setCurState("Log In");
      } else {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        setShowLogin(false);
        toast.success("Login successful");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {curState !== "Log In" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit" className="btn">
            {curState === "Sign Up" ? "Create Account" : "Log In"}
          </button>
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms & privacy policy</p>
        </div>
        {curState === "Log In" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurState("Log In")}>Log In</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;