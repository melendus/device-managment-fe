import React, { BaseSyntheticEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { OptionsRowButton } from './types/DataTypes';
import { ButtonColors, GeneralColors } from './style/colors';
import {updateClickedUser} from "../../redux/slices/ClickedUserSlice";
import {updateClickedDevice} from "../../redux/slices/ClickedDeviceSlice";
import {useAppDispatch} from "../../hooks/hooks";

type OptionsButtonProps = {
    item: any;
    options: OptionsRowButton[];
    disabled?: boolean;
    isHorizontal?: boolean;
    isUser?: boolean;
};

const menuStyle = {
    '&.MuiList-root-MuiMenu-list': {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: GeneralColors.White,
    },
};

const menuItemStyle = {
    '&.MuiButtonBase-root': {
        padding: '6px 16px',
    },
};

export const OptionsButton: React.FC<OptionsButtonProps> = props => {
    const { options, item, disabled, isHorizontal, isUser } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const dispatch = useAppDispatch();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (isUser) {
            dispatch(updateClickedUser(item));
        } else {
            dispatch(updateClickedDevice(item));
        }
        setAnchorEl(event.currentTarget);
    };

    const handleOptionClick = (event: BaseSyntheticEvent, option: OptionsRowButton) => {
        handleClose(event);
        option.optionOnClick(item);
    };

    const handleClose = (event: BaseSyntheticEvent) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                disabled={disabled ? disabled : false}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                    padding: '11px 16px',
                    height: 'auto',
                }}
            >
                {isHorizontal ? (
                    <MoreHorizIcon sx={{ fontSize: '24px', fill: GeneralColors.Gray5 }} />
                ) : (
                    <MoreVertIcon sx={{ fontSize: '24px', fill: GeneralColors.Gray5 }} />
                )}
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                elevation={1}
                sx={menuStyle}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        maxHeight: 216,
                        border: `1px solid ${ButtonColors.Border}`,
                        width: 'auto',
                    },
                }}
                MenuListProps={{
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: GeneralColors.White,
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option.optionName}
                        sx={menuItemStyle}
                        onClick={event => {
                            handleOptionClick(event, option);
                        }}
                        disabled={option.optionDisabled}
                    >
                        {option.optionLogo && (
                            <ListItemIcon
                                key={`option_icon_${index}`}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: '18px', fill: GeneralColors.Gray5 } }}
                            >
                                {option.optionLogo}
                            </ListItemIcon>
                        )}
                            {option.optionName}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};