import {type IColumn } from "@/components/Table/typing";
import TableBase from "@/components/Table";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Tooltip } from "antd";
import { useModel } from "umi";
import { useEffect } from "react";
// import support from "@/models/support";

const Support = () => {
    const {getModel, page, limit,danhSach,record} = useModel('support');

    useEffect(() => {   
        getModel();
    }
    , [page, limit]);

    const columns: IColumn<Support.Record>[] = [
        {
            title: 'Tên',
            dataIndex: 'full_name',
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
            title: 'Chủ đề',
            dataIndex: 'subject',
            width: 200,
            align: 'center',
        },
         {
            title: 'Mô tả',
            dataIndex: 'description',
            width: 200,
            align: 'center',
        },
   
     
       
    ]

    return (
        <TableBase
            columns={columns}
            widthDrawer={800}
            dependencies={[page,limit]}
            modelName='support'
            title="Quản lý HỖ TRỢ"
            buttons={{import: false, filter: false}}
        />
    )
}

export default Support;