import React from 'react';
import 'antd/dist/antd.css';
//import '../LoginForm.css';
import {Form, Input, Tooltip, Icon, Button} from 'antd';
import styled from 'styled-components';
import {Flex} from 'grid-styled';

const axios = require('axios');
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        username: '',
        email: '',
        password: '',
        confPassword: '',
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            username: this.state.nickname,
            password: this.state.password,
            confPassword: this.state.confirm,
        };

        axios.post('http://localhost:2000/register', {user})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        //const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <StyledFlex1>
                <Form onSubmit={this.handleSubmit} method="post" action="/register">
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
              Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                        )}
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="And again"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} >
                        <Button type="primary" htmlType="submit">Register</Button>
                    </FormItem>
                </Form>
            </StyledFlex1>
        );
    }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);

//ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('container'));

export default WrappedRegistrationForm

const StyledFlex1 = styled(Flex)`
    margin: auto; 
`;