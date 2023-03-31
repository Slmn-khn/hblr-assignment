import React from 'react';
import styles from 'styles/Home.module.css'
import 'antd/dist/reset.css';
import styled from "styled-components";
import { Table, Modal, Spin, Form } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useDeleteUserDetails } from 'api/apiHooks';
import { CustomDrawer } from 'components/drawer'
import { UserDetailsTableRow, userDetailsResult, userTableDetailsResultconfiguration } from 'api/types'
import { drawerPlacement, userFormLabels, operationType } from 'consts';
import { DrawerTitleUpdateUser } from 'lang'

interface CustomTableProps {
    userData: any;
    tableKeysData: any;
    onUserOperation: () => void;
    onClose: () => void;
}

const StyledTable = styled((props: any) => <Table {...props} />)`
&& tbody > tr:hover > td {
  background: #e6f7ff !important;
}
`;

const CustomTable: React.FC<CustomTableProps> = ({ userData, tableKeysData, onUserOperation }) => {
    const { isLoading, error, userDetailsResponse, deleteUserData } = useDeleteUserDetails()
    const [form] = Form.useForm();
    const [columns, setColumns] = React.useState<ColumnsType<UserDetailsTableRow>>([]);
    const [dataToDelete, setDataToDelete] = React.useState<userDetailsResult>()
    const [dataSource, setDataSource] = React.useState<Array<UserDetailsTableRow>>([]);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [editingRow, setEditingRow] = React.useState<Array<userTableDetailsResultconfiguration>>([])
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        handleTableRows();
        handleData();
    }, [tableKeysData, userData])

    React.useEffect(() => {
        if (userDetailsResponse) {
            onUserOperation();
            setIsModalOpen(false);
        }
    }, [userDetailsResponse])

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        onUserOperation();
    };

    const handleTableRows = () => {
        setColumns([])
        tableKeysData.forEach((element: userTableDetailsResultconfiguration, index: number) => {
            if (!element.label) {
                element.label = element._id
            }
            setColumns((old: any) => {
                return [...old, {
                    key: index,
                    title: element.label,
                    dataIndex: element._id,
                    width: '10%',
                }]
            })
        });

        setColumns((old: any) => {
            return [...old,
            {
                key: columns.length + 1,
                title: "",
                dataIndex: "actions",
                width: '10%',
                render: (record) => {
                    return (
                        <>
                            {
                                record &&
                                <>
                                    <EditOutlined style={{ margin: '0 10px' }} onClick={() => editUserDetails(record)} />
                                    <DeleteOutlined style={{ margin: '0 10px' }} onClick={() => deleteUserDetails(record)} />
                                </>
                            }
                        </>
                    )
                },
            }]
        })
    }

    const handleData = (addAction?: UserDetailsTableRow) => {
        setDataSource([])
        userData.forEach((element: UserDetailsTableRow, i: number) => {
            setDataSource((old: Array<UserDetailsTableRow>) => {
                return [...old, {
                    key: i,
                    first_name: `${element.first_name} `,
                    last_name: `${element.last_name}`,
                    email: `${element.email}`,
                    phone: `${element.phone}`,
                    gender: `${element.gender}`,
                    actions: addAction && i === addAction.key ? element : ''
                }]
            })
        });
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        dataToDelete && deleteUserData(dataToDelete._id)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const deleteUserDetails = (userDetailsRow: userDetailsResult) => {
        setDataToDelete(userDetailsRow)
        showModal()
    }

    const editUserDetails = (record: any) => {
        let tempTableKeys: Array<userTableDetailsResultconfiguration> = []
        tableKeysData.map((elements: any) => {
            switch (elements._id) {
                case userFormLabels.first_name:
                    elements = { ...elements, value: record.first_name, userId: record._id }
                    tempTableKeys.push(elements)
                    break;
                case userFormLabels.last_name:
                    elements = { ...elements, value: record.last_name, userId: record._id }
                    tempTableKeys.push(elements)
                    break;
                case userFormLabels.gender:
                    elements = { ...elements, value: record.gender, userId: record._id }
                    tempTableKeys.push(elements)
                    break;
                case userFormLabels.phone:
                    elements = { ...elements, value: record.phone, userId: record._id }
                    tempTableKeys.push(elements)
                    break;
                case userFormLabels.email:
                    elements = { ...elements, value: record.email, userId: record._id }
                    tempTableKeys.push(elements)
                    break;
            }
        })
        showDrawer()
        setEditingRow(tempTableKeys)
    }

    const ModalHandler = () => {
        return (
            <Modal title={""} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {
                    dataToDelete && (
                        <>
                            <div className={styles.modalHeader}>
                                <InfoCircleFilled style={{ fontSize: '20px', color: '#08c' }} /> <h2 style={{ marginBottom: 0 }}>Are you sure ?</h2>
                            </div>
                            <p style={{ marginTop: '12px' }}>Want to delete {dataToDelete.first_name} {dataToDelete.last_name} details</p>
                        </>
                    )
                }
            </Modal>
        )
    }

    return (
        <div>
            <Form form={form}>
                <StyledTable columns={columns} dataSource={dataSource} rowKey="email" onRow={(r: any) => ({
                    onMouseEnter: () => handleData(r)
                })}
                />
            </Form>
            <CustomDrawer title={DrawerTitleUpdateUser} placement={drawerPlacement.left} drawerState={open} onClose={onClose} details={editingRow} operationType={operationType.update} onUserOperation={onUserOperation} />
            {ModalHandler()}
            {
                isLoading && !error && (
                    <Spin />
                )
            }
        </div>
    )
}

export default CustomTable;