import React from 'react';
import { Formik } from 'formik';
import styles from '@/styles/Home.module.css'
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { userDetailsResultconfiguration } from '../../api/types/index';
import { userFormLabels } from '../../consts/index';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface DrawerContentsProps {
    details: Array<userDetailsResultconfiguration>
};
const DrawerContents: React.FC<DrawerContentsProps> = ({ details }: DrawerContentsProps) => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log(values);
    };

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' });
                break;
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' });
                break;
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' });
                break;
            default:
        }
    };
    const onReset = () => {
        form.resetFields();
    };

    const handleContents = (details: any) => {
        console.log(details, 'details')
        switch (details._id) {
            case userFormLabels.first_name:
                return <Form.Item name={details._id} label={details.label} rules={[{ required: true }]}>
                    <Input type={details.type} />
                </Form.Item>
            case userFormLabels.last_name:
                return <Form.Item name={details._id} label={details.label} rules={[{ required: true }]}>
                    <Input type={details.type} />
                </Form.Item>
            case userFormLabels.email:
                return <Form.Item name={details._id} label={details.label} rules={[{ required: true }]}>
                    <Input type={details.type} />
                </Form.Item>
            case userFormLabels.phone:
                return <Form.Item name={details._id} label={details.label} rules={[{ required: true, max: 10, min: 10 }]}>
                    <Input type={details.type} />
                </Form.Item>
            case userFormLabels.gender:
                return (
                    <>
                        <Form.Item name={details._id} label={details.label} rules={[{ required: true }]}>
                            <Select
                                placeholder="Select a option and change input text above"
                                onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                                <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('gender') === 'other' ? (
                                    <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                    </>
                )
            default:
                break;
        }
        return
    }
    
    return (
        <div className={styles.drawerContentsList}>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                {
                    details.map((elements: any) => {
                        return handleContents(elements)
                    })
                }
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
};

export default DrawerContents;