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
import * as actions from './actions';
import * as selectors from './selectors';

import UserForm from './UserForm';
import { columns } from './TableCompnents/columns';
import { ToJS } from '../../components/ToJS';

/* eslint-disable react/prefer-stateless-function */
export class Users extends React.Component {
  state = { userId: null };

  onSubmit = values => {
    const { userId } = this.state;
    if (values.toJS().key || userId !== null)
      this.props.update(values.toJS().key, values.toJS());
    else this.props.create(values.toJS());
  };

  onCellClick = record => {
    this.setState({ userId: record.key });
    this.props.initForm('UserForm', { ...record });
  };

  render() {
    const { list, visible, toggleModal } = this.props;
    const { userId } = this.state;
    return (
      <div style={{ marginLeft: '5%', marginRight: '5%' }}>
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
                this.props.initForm('UserForm', null);
                this.setState({ userId: null });
                toggleModal();
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
        <Modal
          title={
            (userId === null && 'Create User Modal') || 'Update User Model'
          }
          centered
          visible={visible}
          onOk={toggleModal}
          onCancel={toggleModal}
          footer={[null]}
        >
          <UserForm userId={userId} onSubmit={this.onSubmit} />
        </Modal>
      </div>
    );
  }
}

Users.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  initForm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  list: PropTypes.any,
};

const mapStateToProps = state => ({
  list: selectors.makeSelectUserList()(state),
  visible: selectors.makeSelectModalVisible()(state),
});

function mapDispatchToProps(dispatch) {
  return {
    initForm: (formName, values) => dispatch(initialize(formName, values)),
    update: (id, values) => dispatch(actions.updateUser(id, values)),
    create: values => dispatch(actions.createUser(values)),
    toggleModal: () => dispatch(actions.toggleModal()),
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
