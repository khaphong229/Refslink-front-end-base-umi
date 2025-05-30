import React, { useState } from 'react';
import { Table, Select, Typography, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import './style.less';
import { useModel } from 'umi';
import { useEffect } from 'react';
import TableBase from '@/components/Table';

const { Title } = Typography;
const { Option } = Select;



const PopularLinks: React.FC = () => {
  const [month, setMonth] = useState(dayjs().format('MM/YYYY'));
  const {getModel,page,limit, record} = useModel('top_link');  


  
  
  const handleChangeMonth = (value: string) => {
    setMonth(value);
    // TODO: fetch data for that month
  };

  useEffect(()=>{
    getModel();
  },[])

  const columns: ColumnsType<TopLink.Record> = [
  
    {
      title: 'Links',
      dataIndex: 'original_link',
      key: 'original_link',
    },
    {
      title: 'Shorten Link',
      dataIndex: 'shorten_link',
      key: 'shorten_link',
    },
    {
      title: 'View',
      dataIndex: 'valid_clicks',
      key: 'valid_clicks',
      align: 'center',
      width: 80,
    },
    {
      title: 'Link Earnings',
      dataIndex: 'earned_amount',
      key: 'earned_amount',
      align: 'right',
    },
  ];

  const generateMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthValue = dayjs().subtract(i, 'month').format('MM/YYYY');
      return (
        <Option key={monthValue} value={monthValue}>
          Tháng {monthValue}
        </Option>
      );
    });
  };

  return (
    <div className="popular-link-page">
      <div className="popular-link-header">
        <Title level={3}>Popular link</Title>
        <Select
          style={{ width: 180 }}
          value={month}
          onChange={handleChangeMonth}
        >
          {generateMonthOptions()}
        </Select>
      </div>

      <Card
        title="🔥 Top 10 Links In Month"
        bordered
        headStyle={{ borderBottom: '2px solid #52c41a' }}
      >
			<TableBase
			columns={columns}
			widthDrawer={800}
			dependencies={[page, limit]}
			modelName='top_link'
			// title={ROUTER.API_WEB}
			buttons={{ import: false, filter: false }}
		/>
      </Card>
    </div>
  );
};

export default PopularLinks;
