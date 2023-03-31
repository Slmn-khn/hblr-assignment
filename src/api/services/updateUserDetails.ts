import service from './baseService';


type UserDetails = <T>(userData: any | {}, userId: string) => Promise<T>;

const updateUserDetails: UserDetails = async <T>(userData: any | {}, userId: string) => {
    try {
        const reqPath = `${process.env.NEXT_PUBLIC_SERVICE_URL}/srinivas/${userId}/`;
        const apiResponse: any = await service.patch(reqPath, userData, {});
        return apiResponse;
    } catch (err) {
        throw err;
    }
};

export default updateUserDetails;