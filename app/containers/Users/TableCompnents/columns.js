/**
 *
 * UsersTableColumns
 *
 */

import React from 'react';
import { Button, Divider, Icon, Modal, Tooltip } from 'antd';

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
    title: <span style={{ marginLeft: '20' }}>Action</span>,
    key: 'action',
    width: '10%',
    render: (text, record) => (
      <span>
        <Tooltip title="Delete">
          <Button
            onClick={() =>
              confirm({
                title: 'Do you Want to delete this user?',
                okType: 'danger',
                okText: 'Delete',
                cancelText: 'No',
                onOk() {
                  parent.props.deleteItem(parseInt(record.key, 10));
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
        <Divider type="vertical" style={{ top: 0 }} />
        <Tooltip title="View">
          <Button
            disabled={record.deleteLoading}
            // onClick={() => parent.onCellClick(record)}
            shape="circle"
            size="small"
            style={{
              backgroundColor: 'black',
              lineHeight: 0.4,
            }}
          >
            <Icon
              type="eye"
              style={{ color: '#fff', fontSize: '10px', lineHeight: 0 }}
              theme="outlined"
            />
          </Button>
        </Tooltip>
      </span>
    ),
  },
];
