import React from "react";
import {Card, Form,Input, message } from "antd";

const {TextArea} = Input;

const SupportForm: React.FC = () => {
    const [form] = Form.useForm();
    
    const handleSubmit = (values:any) =>{
        // call api
        message.success("Gửi yêu cầu hỗ trợ thành công")
        form.resetFields()


    }

    return (
        <Card
        title="Gửi yêu cầu hỗ trợ"

        >
            <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            >
                <Form.Item
                label="full_name"
                
                >

                </Form.Item>


            </Form>
        </Card>

    )
}