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

/* eslint-disable react/prefer-stateless-function */
export class Users extends React.Component {
  state = {
    visible: false,
  };

  onSubmit = values => {
    this.props.create(values);
  };

  toggleModal = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  render() {
    const { list } = this.props;
    console.log(list);
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
                this.toggleModal();
                this.props.initForm('UserForm', {});
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
            dataSource={(list.size && list.toJS()) || []}
          />
        </Row>
        {this.state.visible && (
          <Modal
            title="Create User Modal"
            centered
            visible={this.state.visible}
            onOk={this.toggleModal}
            onCancel={this.toggleModal}
            footer={[null]}
          >
            <UserForm onSubmit={this.onSubmit} />
          </Modal>
        )}
      </div>
    );
  }
}

Users.propTypes = {
  initForm: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  list: PropTypes.any,
};

const mapStateToProps = state => ({
  list: makeSelectUserList()(state),
});

function mapDispatchToProps(dispatch) {
  return {
    initForm: (formName, values) => dispatch(initialize(formName, values)),
    deleteItem: id => dispatch(actions.deleteItem(id)),
    create: values => dispatch(actions.createUser(values)),
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
)(Users);
