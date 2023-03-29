import { useState, useEffect } from 'react';
import getUserDetails from '../services/getUserDetails';
import { userDetailsType } from '../types/index'

const useUserDetails = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState();
    const [userData, setuserData] = useState<userDetailsType>();
    const getUserList = () => {
        setIsLoading(true);
        getUserDetails()
            .then(onSuccess)
            .catch((err: any) => setError(err))
            .finally(() => setIsLoading(false));
    };

    const onSuccess = async (userDataResponse: any) => {
        userDataResponse && setuserData(userDataResponse);
    };

    return {
        isLoading,
        userData,
        error,
        getUserList
    };
};

export default useUserDetails;
