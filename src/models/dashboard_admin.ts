import { getAllDashboardData, getLinkStatistics, getUserStatistics } from '@/services/Dashboard';
import { useState } from 'react';
export default() =>{
    const [data,setData] = useState<any>(null);
    const [linkChart,setLinkChart] = useState<any>(null);
    const [userChart,setUserChart] = useState<any>(null);



    const fetchDataDashboard = async () => {
        try{
            const res = await getAllDashboardData();

            setData(res.data)
        }
        catch(error){
            console.error('Lỗi khi lấy dữ liệu dashboard:', error);
        }
    }

    const fetchLinkStatistics = async () => {
        try{
            const res = await getLinkStatistics();
            setLinkChart(res.data);
            console.log('Dữ liệu thống kê liên kết:', linkChart.data);
        }
        catch(error){
            console.error('Lỗi khi lấy dữ liệu thống kê liên kết:', error);
        }
    }

    const fetchUserStatistics = async () => {
        try{
            const res = await getUserStatistics();
            setUserChart(res.data);
            console.log('Dữ liệu thống kê người dùng:', userChart.data);
        } catch(error){
            console.error('Lỗi khi lấy dữ liệu thống kê người dùng:', error);
        }
    }

    return {
        data,
        linkChart,
        userChart,
        fetchDataDashboard,
        fetchLinkStatistics,
        fetchUserStatistics
    };

        

}