import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import './RegisterForm';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
const axios = require('axios');

class NormalLoginForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        email: '',
        username: '',
        password: '',
        passwordConf: '',
        token: [],
    };
    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    handleChange (value, param){
        this.setState({[param]: value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            passwordConf: this.state.passwordConf,
        };

        axios.post('/api/main', {user})
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.context.router.history.push('/login');
                localStorage.setItem('token',res.data.token);
                console.log(localStorage.getItem('token'));
            })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <StyledFlex2>
            <Form onSubmit={this.handleSubmit} className="login-form" method="post" action="/login">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon
                                type="user"
                                style={{ color: '#808080' }} />}
                            setfieldsvalue={this.state.username}
                            placeholder="E-mail"
                            onChange={(e) => this.handleChange(e.target.value, 'username')}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon
                                type="lock"
                                style={{ color: '#808080' }} />}
                            setfieldsvalue={this.state.password}
                            type="password" placeholder="Password"
                            onChange={(e) => this.handleChange(e.target.value, 'password')}
                        />
                    )}
                </FormItem>
                <FormItem >
                    <Button type="primary" htmlType="submit" className="login-form-button">
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
