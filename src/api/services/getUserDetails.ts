import service from './baseService';
import { userDetailsType } from '../types/index'
type GetUserDetails = <T>() => Promise<T>;

const getUserDetails: GetUserDetails = async () => {
    try {
        const reqPath = `https://sandapps.hubblerapp.com/testrest/zac`;
        const userDetails: any = await service.get(reqPath, {});
        return userDetails;
    } catch (err) {
        throw err;
    }
};

export default getUserDetails;