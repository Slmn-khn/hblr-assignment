import React from 'react';
import styles from 'styles/Home.module.css'
import { Button, Form, Input, Select, Spin } from 'antd';
import { useAddUserDetails, useUpdateUserDetails } from 'api/apiHooks';
import { userFormLabels, operationType as userOperation, genderOptions } from 'consts';
import { ResetButtonText, SubmitButtonText, ResponseSuccess, GenderPlaceHolder } from 'lang'

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

interface DrawerContentsProps {
    details: any
    operationType: string;
    onUserOperation: () => void;
};
const DrawerContents: React.FC<DrawerContentsProps> = ({ details, operationType, onUserOperation }: DrawerContentsProps) => {
    const [form] = Form.useForm();
    const { isLoading, error, userDetailsResponse, addUserData } = useAddUserDetails();
    const { isLoading: isUpdateLoading, error: isUpdateError, userUpdatedDetailsResponse, updateUserData } = useUpdateUserDetails();

    React.useEffect(() => {
        handleInitialFormValues()
    }, []);

    React.useEffect(() => {
        onUserOperation()
    }, [userUpdatedDetailsResponse, userDetailsResponse]);

    const handleInitialFormValues = () => {
        details.forEach((ele: any) => {
            switch (ele._id) {
                case userFormLabels.first_name:
                    form.setFieldsValue({
                        first_name: ele.value
                    });
                    break;
                case userFormLabels.last_name:
                    form.setFieldsValue({
                        last_name: ele.value
                    });
                    break;
                case userFormLabels.email:
                    form.setFieldsValue({
                        email: ele.value
                    });
                    break;
                case userFormLabels.gender:
                    form.setFieldsValue({
                        gender: ele.value
                    });
                    break;
                case userFormLabels.phone:
                    form.setFieldsValue({
                        phone: ele.value
                    });
                    break;
                default:
                    break
            }
        })
    }

    const onFinish = (values: any) => {
        switch (operationType) {
            case userOperation.create:
                addUserData(values);
                break;
            case userOperation.update:
                updateUserData(values, details[0].userId)
                break;
            default:
                break;
        }
    };
    const onReset = () => {
        form.resetFields();
        if (operationType === userOperation.update) {
            handleInitialFormValues();
        }
    };

    const handleContents = (details: any, index: number) => {
        switch (details._id) {
            case userFormLabels.first_name:
                return <Form.Item name={details._id} rules={[{ required: true }]} key={index}>
                    <Input type={details.type} placeholder={details.label} size="large" />
                </Form.Item>
            case userFormLabels.last_name:
                return <Form.Item name={details._id} rules={[{ required: true }]} key={index}>
                    <Input type={details.type} placeholder={details.label} size="large" />
                </Form.Item>
            case userFormLabels.email:
                return <Form.Item name={details._id} rules={[{ required: true }]} key={index}>
                    <Input type={details.type} placeholder={details.label} size="large" />
                </Form.Item>
            case userFormLabels.phone:
                return <Form.Item name={details._id} rules={[{ required: true, max: 10, min: 10 }]} key={index}>
                    <Input type={details.type} placeholder={details.label} size="large" />
                </Form.Item>
            case userFormLabels.gender:
                return (
                    <>
                        <Form.Item name={details._id} rules={[{ required: true }]} key={index}>
                            <Select
                                placeholder={GenderPlaceHolder}
                                allowClear
                                size="large"
                            >
                                <Option value={genderOptions.male}>{genderOptions.male}</Option>
                                <Option value={genderOptions.male}>{genderOptions.male}</Option>
                                <Option value={genderOptions.other}>{genderOptions.other}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('gender') === 'other' ? (
                                    <Form.Item name={details._id} rules={[{ required: true }]}>
                                        <Input placeholder={details.label} size="large" />
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
            {
                !isLoading && !isUpdateLoading && (
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        {
                            details.map((elements: any, index: number) => {
                                return handleContents(elements, index)
                            })
                        }
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" size="large" style={{ marginRight: "12px" }}>
                                {SubmitButtonText}
                            </Button>
                            <Button htmlType="button" size="large" onClick={onReset}>
                                {ResetButtonText}
                            </Button>
                        </Form.Item>
                    </Form>
                )
            }
            {
                !isLoading && !error && !isUpdateLoading && !isUpdateError && (
                    <div>{ResponseSuccess} {operationType} </div>
                )
            }
            {
                isLoading || isUpdateLoading && (
                    <Spin style={{ color: 'red' }} />
                )
            }
        </div>
    )
};

export default DrawerContents;