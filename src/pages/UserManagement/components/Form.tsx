import { Form,Modal,Input,Select,InputNumber } from "antd";
import { resetFieldsForm } from "@/utils/utils";
import { useEffect } from "react";
import { useModel } from 'umi';
interface FormValues extends User.Record {}

const FormUser = (props:any) =>{
    const [form] = Form.useForm();
    const {record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm}= useModel('user');
    const title = props?.title ?? 'User Form';

   useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
    } else if (record?._id) {
      // Gán dữ liệu từ `record` vào form
      form.setFieldsValue({
        ...record,
      });
    }
  }, [visibleForm, record]);

  const onFinish = async (values: FormValues) => {
    if(record?._id){
        await putModel(record._id, values);

    } else {
        await postModel(values);
    }
    setVisibleForm(false)
    form.resetFields()
    
  }

  return (
         <Modal
      title={title}
      visible={visibleForm}
      onCancel={() => setVisibleForm(false)}
      confirmLoading={formSubmiting}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select options={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}/>
        </Form.Item>

        <Form.Item name="method_withdraw" label="Method Withdraw">
          <Input />
        </Form.Item>

        <Form.Item name="total_earned" label="Total Earned">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="balance" label="Balance">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
    
}

export default FormUser