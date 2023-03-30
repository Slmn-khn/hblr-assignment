import React, { useState } from 'react';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import DrawerContents from '../drawer/DrawerContents';
import { userTableDetailsResultconfiguration } from 'api/types';

interface CustomDrawerProps {
    placement: DrawerProps['placement'];
    drawerState: boolean;
    onClose: () => void;
    details: any
}
const CustomDrawer: React.FC<CustomDrawerProps> = ({ placement, drawerState, onClose, details }: CustomDrawerProps) => {
    return (
        <>
            <Drawer
                title="Enter user details"
                placement={placement || 'left'}
                closable={false}
                onClose={onClose}
                open={drawerState}
                key={placement}
            >
                <DrawerContents details={details} />
            </Drawer>
        </>
    );
};

export default CustomDrawer;