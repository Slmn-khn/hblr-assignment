import service from './baseService';

type GetUserDetails = <T>(parm: string) => Promise<T>;

const getUserDetails: GetUserDetails = async (parm: string) => {
    try {
        const reqPath = `${process.env.NEXT_PUBLIC_SERVICE_URL}/${parm}`;
        const userDetails: any = await service.get(reqPath, {});
        return userDetails;
    } catch (err) {
        throw err;
    }
};

export default getUserDetails;