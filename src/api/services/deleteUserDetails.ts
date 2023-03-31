import service from './baseService';


type UserDetails = <T>(id: any | {}) => Promise<T>;

const deleteUserDetails: UserDetails = async <T>(id: any | {}) => {
    try {
        const reqPath = `${process.env.NEXT_PUBLIC_SERVICE_URL}/srinivas/${id}/`;
        const apiResponse: any = await service.delete(reqPath, {});
        return apiResponse;
    } catch (err) {
        throw err;
    }
};

export default deleteUserDetails;