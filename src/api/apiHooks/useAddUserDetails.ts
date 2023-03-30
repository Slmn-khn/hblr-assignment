import { useState } from 'react';
import addUserDetails from '../services/addUserDetails';

const useAddUserDetails = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState({});
    const [userDetailsResponse, setUserDetailsResponse] = useState();

    const addUserData = async (userData: any) => {
        setIsLoading(true);
        setError({});
        return await addUserDetails(userData)
            .then(onSuccess)
            .catch(error => {
                setError({ error });
                return false;
            });
    };

    const onSuccess = async (response: any) => {
        return setUserDetailsResponse(response);
    };

    return {
        isLoading,
        error,
        userDetailsResponse,
        addUserData,
    };
};

export default useAddUserDetails;