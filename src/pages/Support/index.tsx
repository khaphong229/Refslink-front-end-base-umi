import React from "react";
import SupportForm from "./components/Form";
import ClientLayout from "@/layouts/ClientLayout";
import { Card } from "antd";

const SupportPage:React.FC = () =>{
    return (
        <ClientLayout title={'Hỗ trợ'}>
           <Card>
             <SupportForm/>
           </Card>
        </ClientLayout>
    )
}

export default SupportPage