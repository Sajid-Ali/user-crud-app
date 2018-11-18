/**
 *
 * Users
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initialize } from 'redux-form/immutable';
import { Button, Col, Modal, Row, Table } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import saga from './saga';
import reducer from './reducer';
import UserForm from './UserForm';
import * as actions from './actions';
import { makeSelectUserList } from './selectors';
import { columns } from './TableCompnents/columns';
import { ToJS } from '../../components/ToJS';

/* eslint-disable react/prefer-stateless-function */
export class Users extends React.Component {
  state = {
    visible: false,
    userId: null,
  };

  onSubmit = values => {
    const { userId } = this.state;
    if (values.toJS().key || userId !== null)
      this.props.update(values.toJS().key, values.toJS());
    else this.props.create(values.toJS());
  };

  toggleModal = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  onCellClick = record => {
    this.setState({ userId: record.key });
    this.props.initForm('UserForm', { ...record });
  };

  render() {
    const { list } = this.props;
    const { userId } = this.state;
    return (
      <div style={{ marginLeft: '5%', marginRight: '5%' }}>
        <br />
        <br />
        <br />
        <Row gutter={16}>
          <Col span={22}>
            <h1>Home</h1>
          </Col>
          <Col span={2} style={{}}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ userId: null });
                this.props.initForm('UserForm', {});
                this.toggleModal();
              }}
            >
              Add User
            </Button>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row gutter={24}>
          <Table
            rowKey="id"
            size="small"
            pagination={false}
            scroll={{ y: 500 }}
            columns={columns(this)}
            dataSource={(list && list) || []}
          />
        </Row>
        {this.state.visible && (
          <Modal
            title={
              (userId === null && 'Create User Modal') || 'Update User Model'
            }
            centered
            visible={this.state.visible}
            onOk={this.toggleModal}
            onCancel={this.toggleModal}
            footer={[null]}
          >
            <UserForm userId={userId} onSubmit={this.onSubmit} />
          </Modal>
        )}
      </div>
    );
  }
}

Users.propTypes = {
  initForm: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  list: PropTypes.any,
};

const mapStateToProps = state => ({
  list: makeSelectUserList()(state),
});

function mapDispatchToProps(dispatch) {
  return {
    initForm: (formName, values) => dispatch(initialize(formName, values)),
    create: values => dispatch(actions.createUser(values)),
    update: (id, values) => dispatch(actions.updateUser(id, values)),
    deleteItem: id => dispatch(actions.deleteItem(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ToJS(Users));
