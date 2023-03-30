import React, { useEffect } from 'react'
import '@/styles/globals.css'
import 'antd/dist/reset.css';
import styles from '@/styles/Home.module.css'
import { FloatButton } from 'antd';
import { PlusOutlined, CommentOutlined } from '@ant-design/icons';
import { userDetailsAPIParams, drawerPlacement } from 'consts';
import { useUserDetails } from 'api/apiHooks'
import { CustomTable } from 'components/table';
import { CustomDrawer } from 'components/drawer'

const App = () => {
  const { isLoading, error, userData, tableData, getUserList } = useUserDetails();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getUserList(userDetailsAPIParams.getDetails)
    getUserList(userDetailsAPIParams.getTypes)
  }, [])

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.main}>
      {
        userData && tableData && !error && (
          <>
            <CustomTable userData={userData.result} tableKeysData={tableData.result[0].configuration} />
            <FloatButton icon={<PlusOutlined />} onClick={() => showDrawer()} />
            <CustomDrawer placement={drawerPlacement.right} drawerState={open} onClose={onClose} details={tableData.result[0].configuration} />
          </>
        )
      }
      {
        isLoading && (
          <div>Loading</div>
        )
      }
    </div>
  )
}

export default App;