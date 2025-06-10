// src/models/supportModel.ts
import { postSupport } from '@/services/Support';

export default () => {
  const postModel = async (data: Support.Record) => {
    try {
      const res = await postSupport(data);
      return res;
    } catch (error) {
      console.error('Error posting support data:', error);
      throw error;
    }
  };

  return {
    postModel,
  };
};
