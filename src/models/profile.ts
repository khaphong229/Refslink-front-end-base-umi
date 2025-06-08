import { getProfile as fetchProfile } from '@/services/User';
import { useState } from 'react';

export default () => {
    const [profile, setProfile] = useState<any>({});

    const getProfile = async () => {
       const res = await fetchProfile();
       console.log('getProfile', res);
       if (res) {
           setProfile(res.data);
       }
       return res.data;
    }

    return {
        profile,
        getProfile
    }
};
