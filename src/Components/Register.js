import {Button, Checkbox, Form, Input, Select,message} from 'antd';
import React from 'react';
import {CSSTransition} from 'react-transition-group'
import "./Login.css"
import axios from "axios";
import {useState} from "react";
const App = (props) => {
    const {Option} = Select;
    const [showLoading,setshowLoading]=useState(false)
    const onFinish = (values) => {
        setshowLoading(true)
        console.log('Success:', values);
        const {username,password,phone,role}=values
        axios.post("http://localhost:8585/register", {uname: username, pw: password,tel:phone,role:role}).then((res) => {
            setshowLoading(false)
            if(res.data.code===200){
                console.log("注册成功")
                message.success(res.data.res)
                props.setShowLogin(true)
            }else{
                message.error(res.data.res)
            }
            console.log(res)
        }, (res) => {
            setshowLoading(false)
            message.error("通讯错误")
            console.log(res)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const prefixSelector = (
        <Form.Item
            initialValue="86"
            name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    return (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames="showLogin"
            unmountOnExit

        >
            <div className="showLogin">
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
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                            {
                                pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
                                message: "支持字母、数字、下划线、减号、5-15位，禁止数字开头"
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="电话"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请输入你的电话!',
                            },
                            {
                                pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                                message: "请输入正确的电话号码!"
                            }
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            {
                                pattern: /^[a-zA-Z]\w{5,17}$/,
                                message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
                            }
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认你的密码!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次密码输入不一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={showLoading}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </CSSTransition>

    );
};

export default App;