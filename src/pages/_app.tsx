import React, { useEffect } from 'react'
import '@/styles/globals.css'
import styles from '@/styles/Home.module.css'
import useUserDetails from '../api/apiHooks/useUserDetails'
import CustomTable from '../components/table/CustomTable';
const App = () => {
  const { isLoading, error, userData, getUserList } = useUserDetails();


  useEffect(() => {
    if (userData) {
      console.log(userData.result[0].configuration, 'inside')
      console.log(userData.success, '1')
    }
  }, [userData, isLoading, error])
  return (
    <div className={styles.main}>
      <button onClick={() => getUserList()}>clck me</button>
      <CustomTable userData={userData && userData.result[0].configuration}/>
    </div>

  )
}

export default App;