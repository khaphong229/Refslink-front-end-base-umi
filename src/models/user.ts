import useInitModel from "@/hooks/useInitModel";

export default () =>{
    const objInit = useInitModel<User.Record>('admin/users');
    // console.log('objInit', objInit);
    return {
        ...objInit,
    }
}