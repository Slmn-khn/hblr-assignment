import React, { useEffect } from 'react';
import 'antd/dist/reset.css';
import styled from "styled-components";
import { Table } from 'antd';
import { TableProps } from "antd/lib/table";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { UserDetailsTableRow } from 'api/types'

interface CustomTableProps {
    userData: any
    tableKeysData: any
}

const StyledTable = styled((props: any) => <Table {...props} />)`
&& tbody > tr:hover > td {
  background: #e6f7ff !important;
}
`;
const CustomTable: React.FC<CustomTableProps> = ({ userData, tableKeysData }) => {
    const data: UserDetailsTableRow[] = [];
    const [columns, setColumns] = React.useState<ColumnsType<UserDetailsTableRow>>([]);
    const [pagination, setPagination] = React.useState({});
    const [dataSource, setDataSource] = React.useState<any>([]);

    React.useEffect(() => {
        setColumns([])
        tableKeysData.forEach((element: any, index: number) => {
            if (!element.label) {
                element.label = element._id
            }
            setColumns((old: any) => {
                return [...old, {
                    key: { index },
                    title: element.label,
                    dataIndex: element._id
                }]
            })
        });

        setColumns((old: any) => {
            return [...old, {
                title: "",
                dataIndex: "actions",
                render: (actions) => {
                    // console.log(actions, 'eer')
                    return (
                        <>
                            {
                                actions &&
                                actions.map((action: any) => (
                                    <a className="action" href=''>
                                        {action}
                                    </a>
                                ))
                            }
                        </>
                    )
                },
                className: "actions"
            }]
        })
        handleData();

    }, [tableKeysData, userData])


    const handleData = () => {
        setDataSource([])
        userData.forEach((element: any, i: number) => {
            setDataSource((old: any) => {
                return [...old, {
                    key: i,
                    first_name: `${element.first_name} `,
                    last_name: `${element.last_name}`,
                    email: `${element.email}`,
                    phone: `${element.phone}`,
                    gender: `${element.gender}`
                }]
            })
        });
    }


    const deleteUserDetails = (userDetailsRow: any) => {
        console.log(userDetailsRow, 'hello')
    }

    const editUserDetails = (userDetailsRow: any) => {

    }

    const handleAction = (data: any, type: string) => {
        let test = dataSource.filter((ele: any) => ele.key === data.key)
        test = { ...test[0], actions: ["Like", "Share"] }
        console.log(test, 't1')
        let test2 = dataSource.filter((ele: any) => ele.key !== data.key)
        test2.push(test)
        console.log(test2, 't2')
        setDataSource(test2)
    }

    return (
        <div>
            <StyledTable columns={columns} dataSource={dataSource} rowKey="email" onRow={(r: any) => ({
                onMouseEnter: () => handleAction(r, 'enter'),
                onMouseLeave: () => handleAction(r, 'leave')
            })}
            />
        </div>
    )
}

export default CustomTable;