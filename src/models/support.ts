import  useInitModel from '@/hooks/useInitModel';

export default () =>{
    const objInit = useInitModel<WebApi.Record>('support');
    console.log('objInit', objInit);
    return {
        ...objInit,
    };
}