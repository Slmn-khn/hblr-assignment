import React, { useEffect } from 'react';
import 'antd/dist/reset.css';
import styled from "styled-components";
import { Table } from 'antd';
import { TableProps } from "antd/lib/table";
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
    const [columns, setColumns] = React.useState<ColumnsType<UserDetailsTableRow>>();
    const [pagination, setPagination] = React.useState({});
    const [datas, setDatas] = React.useState<any>([]);

    React.useEffect(() => {
        const tempKeys: any = [];
        if (tableKeysData) {
            tableKeysData.map((ele: any, index: number) => {
                if (!ele.label) {
                    ele.label = ele._id
                }
                tempKeys.push({
                    title: ele.label,
                    dataIndex: ele._id,
                    width: "20%"
                }
                )
            })
            tempKeys.push({
                title: "",
                dataIndex: "actions",
                render: (actions: any) =>
                    actions &&
                    actions.map((action: any) => (
                        <a className="action" href=''>
                            {action}
                        </a>
                    )),
                className: "actions"
            })
            handleData()
            setColumns(tempKeys)
        }
    }, [tableKeysData])

    const handleData = () => {
        const tempUserData: any = [];
        if (userData && userData.length > 0) {
            userData.forEach((element: any, i: number) => {
                tempUserData.push(
                    {
                        key: i,
                        first_name: `${element.first_name} `,
                        last_name: `${element.last_name}`,
                        email: `${element.email}`,
                        phone: `${element.phone}`,
                        gender: `${element.gender}`
                    }
                )
            });
        }
        setDatas(tempUserData);
    }

    const handleTableChange: TableProps<any>["onChange"] = (
        pagination
    ) => {
        setPagination(pagination);
    };

    return (
        <div>
            <StyledTable columns={columns} dataSource={datas} rowKey="email" onChange={handleTableChange} />
        </div>
    )
}

export default CustomTable;