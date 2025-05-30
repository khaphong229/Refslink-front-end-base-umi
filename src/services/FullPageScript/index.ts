import axios from '@/utils/axios'; // Đường dẫn đến file axios bạn đã cấu hình sẵn
import { GenerateScriptPayload } from './typing';
import { ipRoot } from '@/utils/ip'; // Đường dẫn đến file chứa ipRoot

export const generateScript = async (payload: GenerateScriptPayload) => {
	const response = await axios.post(`${ipRoot}/api/generate-script`, payload);

	return response.data;
};
