import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { millisToMinutesAndSeconds } from './../../../app/utilities';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserRequest, updateUser } from './../UserSlice';

const ITEM_HEIGHT = 48;

export default function UserItem({ detailedUser, index }) {
    const { id, code, name, score, time, historyQues, sessionName, universityName } = detailedUser;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditUser = () => {
        handleClose();
        dispatch(updateUser(detailedUser));
    }

    const handleDeleteUser = () => {
        handleClose();
        dispatch(deleteUserRequest(id));

    }

    return (
        <React.Fragment>
            <TableRow key={id} hover style={{ height: '14px' }}>
                <TableCell component="th" scope="row">
                    {index}
                </TableCell>
                <TableCell align="center">
                    {code}
                </TableCell>
                <TableCell align="center">
                    {name}
                </TableCell>
                <TableCell align="center">
                    {sessionName}
                </TableCell>
                <TableCell align="center">
                    {universityName}
                </TableCell>
                <TableCell align="center">
                    {
                        score === null && historyQues ? (<span style={{ color: 'green' }}>chưa nộp bài</span>) :
                            score === null && time === null ? (<span style={{ color: 'red' }}>chưa thi</span>) : score
                    }
                </TableCell>
                <TableCell align="center">
                    {time === null && historyQues ? (<span style={{ color: 'green' }}>chưa nộp bài</span>) :
                        time === null && time === null ? (<span style={{ color: 'red' }}>chưa thi</span>) : millisToMinutesAndSeconds(time)
                    }
                </TableCell>
                <TableCell align="center">
                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem onClick={handleEditUser}>
                                Sửa
                            </MenuItem>
                            <MenuItem onClick={handleDeleteUser}>
                                Xóa
                            </MenuItem>
                        </Menu>
                    </div>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
