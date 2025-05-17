import { Card, Col, Form ,Row, Input} from "antd";
import React from "react";
import rules from "@/utils/rules";

const ProfileForm: React.FC = () => {
    return (
        <Card>
            <h2>Hồ sơ cá nhân</h2>
            <Form layout="vertical" >
                <Row>
                    <Col span={10}>
                        <Form.Item label="Họ tên" name="name" rules={[...rules.ten, ...rules.required]}>
                            <Input placeholder="Họ tên"/>
                        </Form.Item>
                        <Form.Item label="Địa chỉ" name="address"  >
                            <Input placeholder="Địa chỉ"/>
                        </Form.Item>
                    </Col>
                     <Col span={10}>
                        <Form.Item label="Số điện thoại" name="name" rules={[...rules.ten, ...rules.required]}>
                            <Input placeholder="Số điện thoại"/>
                        </Form.Item>
                        <Form.Item label="Tỉnh thành" name="city"  >
                            <Input placeholder="Tỉnh thành"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}

export default ProfileForm;