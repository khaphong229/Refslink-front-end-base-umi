import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm:ss';

const index: React.FC<{ start?: dayjs.Dayjs; end?: dayjs.Dayjs }> = (props) => {
	const { start, end } = props;

	const startTime = dayjs('00:00:00', 'HH:mm:ss');
	const endTime = dayjs('23:59:59', 'HH:mm:ss');

	return <TimePicker.RangePicker defaultValue={[startTime, endTime]} format={format} />;
};

export default index;
