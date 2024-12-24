import { EDinhDangFile } from '@/services/base/constant';
import type { IFile } from '@/services/base/typing';
import { getFileInfo } from '@/services/uploadFile';
import { ip3 } from '@/utils/ip';
import { getFileType, getNameFile } from '@/utils/utils';
import { CopyOutlined, DownloadOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { message, Space } from 'antd';
import fileDownload from 'js-file-download';
import { useEffect, useState } from 'react';
import ButtonExtend from '../Table/ButtonExtend';

const PreviewFile = (props: {
	file: string;
	width?: string;
	height?: string;
	children?: React.ReactElement;
	ip?: string;
}) => {
	const { file, width = '100%', height = '600px', children, ip = ip3 } = props;
	const [fileType, setFileType] = useState<EDinhDangFile>(EDinhDangFile.UNKNOWN);
	const [iframeSrc, setIframeSrc] = useState<string>('');

	const getFileExtension = (url: string) => {
		const arr = url.split('.');
		return arr.length > 1 ? arr.at(-1) : '';
	};

	const getFileTypeFromUrl = async (url: string) => {
		const idFile = url.split('/')[5];
		let mime = '';

		try {
			if (idFile) {
				const result = await getFileInfo(idFile, ip);
				const fileInfo: IFile = result?.data;
				return fileInfo?.file?.mimetype || getFileExtension(url) || EDinhDangFile.UNKNOWN;
			} else {
				mime = getFileExtension(url) || EDinhDangFile.UNKNOWN;
			}
		} catch (error) {
			console.error('Error fetching file type:', error);
			return EDinhDangFile.UNKNOWN;
		}

		return getFileType(mime);
	};

	const getIframeSrc = () => {
		if (!file) return '';
		const officeFileType = [EDinhDangFile.WORD, EDinhDangFile.EXCEL, EDinhDangFile.POWERPOINT];
		if (fileType && officeFileType.includes(fileType)) {
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

	const handleCopy = () => {
		if (file) {
			navigator.clipboard
				.writeText(file)
				.then(() => {
					message.success('Đã sao chép đường dẫn!');
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	useEffect(() => {
		const fetchFileType = async (): Promise<void> => {
			if (file) {
				const mimeType = await getFileTypeFromUrl(file);
				setFileType(getFileType(mimeType) ?? EDinhDangFile.UNKNOWN);
			}
		};
		fetchFileType();
	}, [file]);

	useEffect(() => {
		setIframeSrc(getIframeSrc());
	}, [fileType]);

	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: 12,
					flexWrap: 'wrap',
					gap: 8,
				}}
			>
				<b>{getNameFile(file ?? '--')}</b>

				<Space wrap>
					<ButtonExtend type='link' tooltip='Tải xuống' icon={<DownloadOutlined />} onClick={handleDownload} />
					<ButtonExtend type='link' tooltip='Sao chép đường dẫn' icon={<CopyOutlined />} onClick={handleCopy} />
					<ButtonExtend
						type='link'
						tooltip='Mở rộng'
						icon={<FullscreenExitOutlined />}
						onClick={() => window.open(iframeSrc, '_blank')}
					/>
					{children}
				</Space>
			</div>
			{fileType !== EDinhDangFile.UNKNOWN ? (
				<iframe src={iframeSrc} width={width} height={height} />
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
						<strong>Tệp tin không hỗ trợ hiển thị trực tiếp</strong>
						<br />
						<ButtonExtend
							notHideText
							type='link'
							tooltip='Tải xuống'
							icon={<DownloadOutlined />}
							onClick={handleDownload}
						>
							Tải xuống
						</ButtonExtend>
					</p>
				</div>
			)}
		</>
	);
};

export default PreviewFile;
