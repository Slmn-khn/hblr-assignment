import React, { useState } from 'react';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import DrawerContents from '../drawer/DrawerContents';

interface CustomDrawerProps {
    placement: DrawerProps['placement'];
    drawerState: boolean;
    onClose: () => void;
    details: any;
    operationType: string;
    title: string;
    onUserOperation: () => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ title, placement, drawerState, onClose, details, operationType, onUserOperation }: CustomDrawerProps) => {
    return (
        <>
            <Drawer
                title={title}
                placement={placement || 'left'}
                closable={false}
                onClose={onClose}
                open={drawerState}
                key={placement}
            >
                <DrawerContents details={details} operationType={operationType} onUserOperation={onUserOperation} onClose={onClose} />
            </Drawer>
        </>
    );
};

export default CustomDrawer;