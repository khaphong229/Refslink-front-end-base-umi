import useInitModel from "@/hooks/useInitModel";
import { To } from "@sentry/react/types/types";


export default() =>{
    const objInit = useInitModel<TopLink.Record>('shorten-link-ranking-client/ranking');
    console.log('objInit', objInit);
    return {
        ...objInit,
    }
}