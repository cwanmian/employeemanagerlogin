import {Button, Checkbox, Form, Input, Spin} from 'antd';
import React from 'react';
import {CSSTransition} from 'react-transition-group'
import "./Login.css"
import axios from "axios";
import {useState} from "react";
const App = (props) => {
    const [showLoading,setshowLoading]=useState(false)
    const onFinish = (values) => {
        console.log('Success:', values);
        const{username,password}=values
        setshowLoading(true)
        axios.post("./login", {uname: username, pw: password}).then((res) => {
            setshowLoading(false)
            if(res.data.code===200){
                window.location.href="/indexPage"
            }
            console.log(res)
        }, (res) => {
            setshowLoading(false)
            console.log(res)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="showLogin">

            <CSSTransition
                in={props.show}
                timeout={300}
                classNames="showLogin"
                unmountOnExit
                onExited={props.setRegistershow}
            >
                <Form
                    className="showLoginForm"
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={showLoading}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </CSSTransition>

        </div>

    );
};

export default App;