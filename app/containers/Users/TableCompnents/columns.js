/**
 *
 * UsersTableColumns
 *
 */

import React from 'react';
import { Button, Icon, Modal, Tooltip } from 'antd';

const { confirm } = Modal;

export const columns = parent => [
  {
    title: 'User Name',
    dataIndex: 'name',
    key: 'created_at',
    width: '20%',
  },
  {
    title: 'User Email',
    dataIndex: 'email',
    key: 'email',
    width: '20%',
  },
  {
    title: 'User Role',
    dataIndex: 'role',
    key: 'role',
    width: '20%',
  },
  {
    title: 'User Observation',
    dataIndex: 'observation',
    key: 'observation',
    width: '20%',
  },
  {
    title: <span style={{ marginLeft: 20 }}>Action</span>,
    key: 'action',
    width: '10%',
    render: (text, record) => (
      <span style={{ marginLeft: 45, align: 'center' }}>
        <Tooltip title="Delete">
          <Button
            onClick={() =>
              confirm({
                title: 'Do you Want to delete this template?',
                okType: 'danger',
                okText: 'Delete',
                cancelText: 'No',
                onOk() {
                  parent.props.deleteItem(parseInt(record.id, 10));
                },
              })
            }
            type="danger"
            shape="circle"
            size="small"
            style={{
              backgroundColor: 'black',
              lineHeight: 0.4,
            }}
          >
            <Icon
              type="delete"
              style={{ fontSize: '12px', lineHeight: 0 }}
              theme="outlined"
            />
          </Button>
        </Tooltip>
      </span>
    ),
  },
];
