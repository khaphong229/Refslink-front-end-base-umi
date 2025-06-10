import { Form, Modal } from "antd";
import { useModel } from "umi";
import { useEffect } from "react";
import { resetFieldsForm } from "@/utils/utils";

const FormWithdraw = (props:any) => {    
    const [ form] = Form.useForm();
    const { record,getModel, setVisibleForm, visibleForm } = useModel('withdraw');
	const title = props?.title ?? 'Setting Form';
    console.log('record', record);
    
    useEffect(() => {
            if (!visibleForm) {
                resetFieldsForm(form);
                getModel()
            } else if (record?._id) {
                form.setFieldsValue({
                    ...record,
                });
            }
        }, [visibleForm, record]);
    return (
        <Modal
            title={title}
            visible={visibleForm}
            onCancel={() => setVisibleForm(false)}
        >

            <Form layout="vertical" form={form} initialValues={record}>
                <Form.Item label="Phương thức thanh toán" name="payment_method">
                    <span>{record?.payment_method}</span>
                </Form.Item>

                <Form.Item label="Số tiền" name="amount_money">
                    <span>{record?.amount_money }$</span>
                </Form.Item>

                <Form.Item label="Trạng thái" name="status">
                    <span>{record?.status}</span>
                </Form.Item>

                <Form.Item label="Mã rút tiền" name="withdraw_code"> 
                    <span>{record?.withdraw_code}</span>

                </Form.Item>
                
                <Form.Item label="Ghi chú" name="note"> 
                    <span>{record?.note}</span>

                </Form.Item>

           
            </Form>


        </Modal>


    )
}


export default FormWithdraw;