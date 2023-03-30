import service from './baseService';


type UserDetails = <T>(userData: any | {}) => Promise<T>;

const addUserDetails: UserDetails = async <T>(userData: any | {}) => {
    try {
        const reqPath = `${process.env.NEXT_PUBLIC_SERVICE_URL}/srinivas/`;
        const apiResponse: any = await service.post(reqPath, userData, {});
        return apiResponse;
    } catch (err) {
        throw err;
    }
};

export default addUserDetails;