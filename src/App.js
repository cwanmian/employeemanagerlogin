import './App.css';
import 'antd/dist/antd.min.css'
import Login from "./Components/Login";
import {useState} from "react";
import {Button} from "antd";
import Register from "./Components/Register";

function App() {
    const [showLogin, setshowLogin] = useState(true)
    return (
        <div className="App">
            <div className="bg">
                <img src="./bg2.jpg" alt="加载中。。。"/>
            </div>
            <div className="content">
                <div className="Login-header">
                    {showLogin ? <Button onClick={() => {
                        setshowLogin(false)
                    }}>注册</Button> : <Button onClick={() => {
                        setshowLogin(true)
                    }}>返回</Button>}
                </div>
                <div className="loginContent">
                    <div className="indexLogo">
                        <a>Hunting Manager</a>
                    </div>
                    <Login show={showLogin}></Login>
                    <Register show={!showLogin} setShowLogin={setshowLogin}></Register>
                </div>
                <div className="noneDiv"></div>
            </div>
        </div>
    );
}

export default App;
