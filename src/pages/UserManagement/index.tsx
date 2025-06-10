import {type IColumn } from "@/components/Table/typing";
import TableBase from "@/components/Table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Tooltip } from "antd";
import { useModel } from "umi";
import Form from "./components/Form";
import type User from "@/services/User/typings";


const UserManagement = () => {
    const {getModel, page, limit, deleteModel, handleEdit} = useModel('user');


    const columns: IColumn<User.Record>[] = [
        {
            title: 'Tên',
            dataIndex: 'name',
            width: 150,
            align: 'center',
            render: (value) => {
                return <span style={{fontWeight: 'bold'}}>{value}</span>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 200,
            align: 'center',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            width: 150,
            align: 'center',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 120,
            filterType: 'select',
            align: 'center',
            filterData:[
                {
                    label:'Bật',
                    value:'active'
                },
                {
                    label:'Tắt',
                    value:'inactive'
                }
            ],
        },
        {
            title:'Thao tác',
            width: 150,
            align:'center',
            render:(value, record) => (
                <Space>
                    <Tooltip title="Chỉnh sửa">
                        <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    </Tooltip>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa không?"
                        onConfirm={async () => {
                            const res = await deleteModel(record._id);
                            if (res.status === 200) {
                                message.success('Xóa thành công');
                            } else {
                                message.error('Xóa thất bại');
                            }
                        }}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Tooltip title="Xóa">
                            <Button type="primary" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <TableBase
            columns={columns}
            widthDrawer={800}
            dependencies={[page,limit]}
            modelName='user'
            title="Quản lý người dùng"
            Form={Form}
            buttons={{import: false, filter: false}}
        />
    )
}

export default UserManagement;