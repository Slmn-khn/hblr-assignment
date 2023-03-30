import React, { useEffect } from 'react';
import 'antd/dist/reset.css';
import styled from "styled-components";
import { Table } from 'antd';
import { TableProps } from "antd/lib/table";
import type { ColumnsType } from 'antd/es/table';
import { UserDetailsTableRow } from '../../api/types/index'

interface CustomTableProps {
    userData: any
}


const StyledTable = styled((props: any) => <Table {...props} />)`
&& tbody > tr:hover > td {
  background: #e6f7ff !important;
}
`;
const CustomTable: React.FC<CustomTableProps> = ({ userData }) => {
    const test: any = [];
    const data: UserDetailsTableRow[] = [];
    const [columns, setColumns] = React.useState<ColumnsType<UserDetailsTableRow>>();
    const [pagination, setPagination] = React.useState({});
    const [datas, setDatas] = React.useState();
    React.useEffect(() => {
        if (userData) {
            userData.map((ele: any, index: number) => {
                if (!ele.label) {
                    ele.label = ele._id
                }
                test.push({
                    title: ele.label,
                    dataIndex: ele._id,
                    width: "20%"
                }
                )
            })
            test.push({
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
            handleData(0)
            setColumns(test)
        }
    }, [userData])

    const handleData = (index: number) => {
        let tests: any = []
        if (userData && userData.length > 0) {
            userData.forEach((element: any, i: number) => {
                tests.push({
                    key: i,
                    first_name: `${element._id} ${i} `,
                    last_name: `${element._id} ${i}`,
                    email: `${element._id} ${i}`,
                    phone: `${element._id} ${i}`,
                    gender: `${element._id} ${i}`
                })
            });
            tests = tests.map((item: any) => item.key === index ? { ...item, actions: ["Like", "Share"] } : item)
        }
        setDatas(tests)
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