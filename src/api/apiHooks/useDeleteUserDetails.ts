import { useState } from 'react';
import { deleteUserDetails } from 'api/services';

const useDeleteUserDetails = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState({});
    const [userDetailsResponse, setUserDetailsResponse] = useState();

    const deleteUserData = async (userData: any) => {
        setIsLoading(true);
        setError({});
        return await deleteUserDetails(userData)
            .then(onSuccess)
            .catch(error => {
                setError({ error });
                return false;
            }).finally(() => setIsLoading(false));
    };

    const onSuccess = async (response: any) => {
        return setUserDetailsResponse(response);
    };

    return {
        isLoading,
        error,
        userDetailsResponse,
        deleteUserData,
    };
};

export default useDeleteUserDetails;