import useInitModel from "@/hooks/useInitModel";
import { WithdrawItem } from "@/services/Withdraw/typing";

export default () => {
    const objInit = useInitModel<WithdrawItem>('admin/withdraw');
    console.log('objInit', objInit);
    return {
        ...objInit
    }
};
