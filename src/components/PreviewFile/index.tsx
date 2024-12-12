import { EDinhDangFile } from '@/services/base/constant';
import { getNameFile, renderMinType } from '@/utils/utils';
import { DownloadOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import fileDownload from 'js-file-download';
import ButtonExtend from '../Table/ButtonExtend';

const PreviewFile = (props: {
	file: string;
	mimeType: string;
	width?: string;
	height?: string;
	children?: React.ReactElement;
}) => {
	const { file, mimeType, width, height, children } = props;

	const extension = renderMinType(mimeType);

	const getIframeSrc = () => {
		if (!file) return '';
		const officeExtensions = [EDinhDangFile.WORD, EDinhDangFile.EXCEL, EDinhDangFile.POWERPOINT];
		if (extension && officeExtensions.includes(extension)) {
			return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file)}`;
		}
		return file;
	};

	const handleDownload = async () => {
		if (file) {
			try {
				const response = await fetch(file);
				const blob = await response.blob();
				fileDownload(blob, getNameFile(file));
			} catch (error) {
				console.error('Error downloading file:', error);
			}
		}
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: 12,
				}}
			>
				<b>{getNameFile(file ?? '--')}</b>

				<Space>
					<ButtonExtend type='link' tooltip='Tải xuống' icon={<DownloadOutlined />} onClick={handleDownload} />
					{children}
				</Space>
			</div>
			{extension !== EDinhDangFile.UNKNOWN ? (
				<iframe src={getIframeSrc()} width={width ?? '100%'} height={height ?? '600px'} />
			) : (
				<div
					style={{
						padding: '20px',
						textAlign: 'center',
						background: '#f8d7da',
						color: '#721c24',
						border: '1px solid #f5c6cb',
						borderRadius: '5px',
					}}
				>
					<p>
						<strong>Tệp tin không hỗ trợ hiện thị</strong>
					</p>
				</div>
			)}
		</>
	);
};

export default PreviewFile;
