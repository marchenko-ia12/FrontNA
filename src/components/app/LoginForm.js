import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
//import '../loginform.css';
import './RegisterForm';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import React, {Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
const axios = require('axios');



class NormalLoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    }
    handleSubmit = event => {
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        };

        axios.post('http://localhost:2000/main', {user})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    static contextTypes = {
        ...Component.contextTypes,
        router: PropTypes.object,
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <StyledFlex2>
            <Form onSubmit={this.handleSubmit} className="login-form" method="post" action="/login">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: '#808080' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: '#808080' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem >
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button" /*onClick={item => this.context.router.history.push(`/login`)}*/>
                        Log in
                    </Button>
                    <a href="" onClick={e => {
                        e.preventDefault();
                        this.context.router.history.push('/register');
                    }}
                    >
                        Register now!
                    </a>
                </FormItem>
            </Form>
            </StyledFlex2>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm


//const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

const StyledFlex2 = styled(Flex)`
    .login-form {
    max-width: 300px;

}
.login-form-forgot {
    float: right;
}
.login-form-button {
    width: 100%;
}
    margin: auto;
    
`;
