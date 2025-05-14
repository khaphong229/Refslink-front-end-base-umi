import React from "react";

import { Modal,Form,Input } from "antd";

interface Props {
    visible: boolean,
    onCancel:() => void,
    onCreate:(originalUrl:string) => void
}

const CreateLinkModal: React.FC<Props> = ({visible,onCancel, onCreate}) =>{
    const [form] = Form.useForm();

    const handleSubmit = () =>{
        form.validateFields().then(values =>{
            onCreate(values.originalUrl);
            form.resetFields();
        });
    }

    return (
        <Modal
            title="Tạo link rút gọn"
            visible={visible}
            onCancel={()=>{
                form.resetFields()
                onCancel();
            }}
              onOk={handleSubmit}
                okText="Tạo"
                cancelText="Hủy"
        >
            <Form form={form} layout="vertical" >
                <Form.Item
                    name="originalUrl"
                    label="Nhập link gốc"
                    rules={[
                        {required:true, message:'Vui lòng nhập lại'},
                        {type:'url', message:'Nhập lại url'}
                    ]}
                >   
                    <Input placeholder="https://example.com"/>

                </Form.Item>

            </Form>

            

        </Modal>
    )
}

export default CreateLinkModal; 
