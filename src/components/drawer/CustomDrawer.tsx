import React, { useState } from 'react';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import DrawerContents from '../drawer/DrawerContents';
import { userDetailsResultconfiguration } from '../../api/types/index';

interface CustomDrawerProps {
    placement: DrawerProps['placement'];
    drawerState: boolean;
    onClose: () => void;
    details: Array<userDetailsResultconfiguration>
}
const CustomDrawer: React.FC<CustomDrawerProps> = ({ placement, drawerState, onClose, details }: CustomDrawerProps) => {
    return (
        <>
            <Drawer
                title="Basic Drawer"
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