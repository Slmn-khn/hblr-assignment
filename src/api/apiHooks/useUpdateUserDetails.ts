import { useState } from 'react';
import updateUserDetails from '../services/updateUserDetails';

const useUpdateUserDetails = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState({});
    const [userUpdatedDetailsResponse, setUserUpdatedDetailsResponse] = useState();

    const updateUserData = async (userData: any, userId: string) => {
        setIsLoading(true);
        setError({});
        return await updateUserDetails(userData, userId)
            .then(onSuccess)
            .catch(error => {
                setError({ error });
                return false;
            }).finally(() => setIsLoading(false));
    };

    const onSuccess = async (response: any) => {
        return setUserUpdatedDetailsResponse(response);
    };

    return {
        isLoading,
        error,
        userUpdatedDetailsResponse,
        updateUserData,
    };
};

export default useUpdateUserDetails;