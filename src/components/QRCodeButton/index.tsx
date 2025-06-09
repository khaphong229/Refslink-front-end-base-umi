import QRCode from 'react-qr-code';
import { Button, Modal } from 'antd';
import { useState } from 'react';

export default function QRCodeButton({ link }: { link: string }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpen = () => setIsModalOpen(true);
	const handleClose = () => setIsModalOpen(false);

	return (
		<>
			<Button type="primary" onClick={handleOpen}>
				Xem mã QR
			</Button>
			<Modal
				title="Mã QR"
				visible={isModalOpen}
				onCancel={handleClose}
				footer={null}
				centered
			>
				<div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
					<QRCode value={link} />
				</div>
			</Modal>
		</>
	);
}
