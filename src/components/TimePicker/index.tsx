import React from 'react';
import { TimePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

const format = 'HH:mm:ss';

const index: React.FC<RangePickerProps> = (props) => {
	return <TimePicker.RangePicker {...props} format={format} placeholder={['Bắt đầu', 'Kết thúc']} />;
};

export default index;
