import  useInitModel from '@/hooks/useInitModel';

export default () =>{
    const objInit = useInitModel<Support.Record>('admin/supports');
    console.log('objInit', objInit);
    return {
        ...objInit,
    };
}