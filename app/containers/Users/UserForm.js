/* eslint-disable indent,react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Form, Row, Col, Button } from 'antd';
import { AInput } from '../../InputTypes';
import { isValidEmail } from '../../utils/regexValidations';

export class UserForm extends React.Component {
  render() {
    const { submitting, handleSubmit, onSubmit, userId } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Field hasFeedback name="name" label="Name" component={AInput} />
          </Col>
          <Col span={12}>
            <Field hasFeedback name="email" label="Email" component={AInput} />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 10 }}>
          <Col span={12}>
            <Field hasFeedback name="role" label="Role" component={AInput} />
          </Col>
          <Col span={12}>
            <Field
              hasFeedback
              component={AInput}
              name="observation"
              label="Observation"
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Button
            type="primary"
            size="default"
            loading={submitting}
            disabled={submitting}
            htmlType="submit"
            style={{ float: 'right', marginRight: 10 }}
          >
            {(userId === null && 'Create') || 'Save Changes'}
          </Button>
        </Row>
      </Form>
    );
  }
}

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  userId: PropTypes.any,
};

const validate = values => {
  const errors = {};

  const name = values.get('name');
  if (!name) errors.name = 'Required';

  const email = values.get('email');
  if (!email) errors.email = 'Required';
  else if (!isValidEmail(email)) errors.email = 'Email is not valid';

  const role = values.get('role');
  if (!role) errors.role = 'Required';

  const observation = values.get('observation');
  if (!observation) errors.observation = 'Required';

  return errors;
};

export default reduxForm({
  form: 'UserForm',
  validate,
})(UserForm);
