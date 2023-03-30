import React, { useEffect } from 'react'
import '@/styles/globals.css'
import 'antd/dist/reset.css';
import styles from '@/styles/Home.module.css'
import { FloatButton } from 'antd';
import { PlusOutlined, CommentOutlined } from '@ant-design/icons';

import useUserDetails from '../api/apiHooks/useUserDetails'
import CustomTable from '../components/table/CustomTable';
import CustomDrawer from '../components/drawer/CustomDrawer'

const App = () => {
  const { isLoading, error, userData, getUserList } = useUserDetails();
  const [open, setOpen] = React.useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.main}>
      <button onClick={() => getUserList()}>Click Me</button>
      {
        userData && userData.result && userData.result.length > 0 && (
          <>
            <CustomTable userData={userData.result[0].configuration} />
            <FloatButton icon={<PlusOutlined />} onClick={() => showDrawer()} />
            <CustomDrawer placement='right' drawerState={open} onClose={onClose} details={userData.result[0].configuration} />
          </>
        )
      }
    </div>
  )
}

export default App;