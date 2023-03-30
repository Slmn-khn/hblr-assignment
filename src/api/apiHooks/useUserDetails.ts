import { useState, useEffect } from 'react';
import getUserDetails from '../services/getUserDetails';
import { userTableDetailsType, userDetails } from '../types/index'
import { userDetailsAPIParams } from 'consts'

const useUserDetails = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState();
    const [userData, setuserData] = useState<userDetails>();
    const [tableData, setTableData] = useState<userTableDetailsType>();

    const getUserList = async (parm: string) => {
        setIsLoading(true);
        getUserDetails(parm)
            .then((response: any) => response && parm === userDetailsAPIParams.getDetails ? setuserData(response) : setTableData(response))
            .catch((err: any) => setError(err))
            .finally(() => setIsLoading(false));
    };

    return {
        isLoading,
        userData,
        tableData,
        error,
        getUserList
    };
};

export default useUserDetails;
