import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface CustomTableProps {
    userData: any
}
const CustomTable: React.FC<CustomTableProps> = ({ userData }) => {
    const test: any = [];
    const [columns, setColumns] = React.useState<ColumnsType<DataType>>([{
        title: 'First Name',
        dataIndex: 'first_name',
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
    }]);

    const data: DataType[] = [];


    React.useEffect(() => {
        if (userData) {
            userData.map((ele: any, index: number) => {
                if (!ele.label) {
                    ele.label = JSON.stringify(ele._id)
                }
                test.push({
                    title: ele.label,
                    dataIndex: ele._id
                })
            })

            setColumns(test)

            handleData();
        }
    }, [userData])

    interface DataType {
        key: React.Key;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        gender: string;
    }

    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            first_name: `Edward King ${i}`,
            last_name: `last_name ${i}`,
            email: `email ${i}`,
            phone: `phone ${i}`,
            gender: `gender ${i}`,
        });
    }

    const handleData = () => {
        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                first_name: `Edward King ${i}`,
                last_name: `last_name ${i}`,
                email: `email ${i}`,
                phone: `phone ${i}`,
                gender: `gender ${i}`,
            });
        }


    }

    console.log(userData);
    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    )
}

export default CustomTable;