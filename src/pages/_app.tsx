import React, { useEffect } from 'react'
import '@/styles/globals.css'
import 'antd/dist/reset.css';
import styles from 'styles/Home.module.css'
import { FloatButton, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUserDetails } from 'api/apiHooks'
import { CustomTable } from 'components/table';
import { CustomDrawer } from 'components/drawer';
import { userDetailsAPIParams, drawerPlacement, operationType as userOperation } from 'consts';
import { DrawerTitleAddUser } from 'lang';

const App = () => {
  const { isLoading, error, userData, tableData, getUserList } = useUserDetails();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    getUserList(userDetailsAPIParams.getDetails)
    getUserList(userDetailsAPIParams.getTypes)
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onUserOperation = () => {
    loadData()
  }

  return (
    <div className={styles.main}>
      {
        userData && tableData && !error && tableData.result.length > 0 && (
          <>
            <CustomTable userData={userData.result} tableKeysData={tableData.result[0].configuration} onClose={onClose} onUserOperation={onUserOperation} />
            <FloatButton icon={<PlusOutlined />} onClick={() => showDrawer()} />
            <CustomDrawer title={DrawerTitleAddUser} placement={drawerPlacement.right} drawerState={open} onClose={onClose} details={tableData.result[0].configuration} operationType={userOperation.create} onUserOperation={onUserOperation} />
          </>
        )
      }
      {
        isLoading && (
          <Spin />
        )
      }
    </div>
  )
}

export default App;