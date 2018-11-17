/* eslint-disable indent,react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Input, Icon } from 'antd';
// import { isValidEmail } from '../../utils/utils';

const FormItem = Form.Item;

export class UserForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="">
        <Row gutter={24}>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="User Name"
                />,
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Please input your email!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="email"
                  placeholder="User Email"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('role', {
                rules: [
                  { required: true, message: 'Please input your user role!' },
                ],
              })(<Input type="text" placeholder="User Name" />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem>
              {getFieldDecorator('observation', {
                rules: [
                  { required: true, message: 'Please input your Observation!' },
                ],
              })(<Input type="text" placeholder="User Observation" />)}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button
            style={{ float: 'right' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Create
          </Button>
        </FormItem>
      </Form>
    );
  }
}

UserForm.propTypes = {
  form: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const UserModalForm = Form.create()(UserForm);

export default UserModalForm;
