import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import Paper from '@material-ui/core/Paper';

export default function UniversityItem(props) {
    const { detailedUniversity, handleDeleteUniversity, handleEditUniversity } = props;
    const { id, university_name } = detailedUniversity;

    return (
        <Paper style={{ marginBottom: "20px" }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <SchoolIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={university_name}

                />
                <ListItemSecondaryAction>


                    <Tooltip title="Chỉnh sửa đề thi" placement="top-end">
                        <IconButton
                            onClick={() => { handleEditUniversity(detailedUniversity) }}
                            edge="end"
                            aria-label="delete">
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Xóa đề thi" placement="top-end">
                        <IconButton edge="end" aria-label="delete"
                            onClick={() => { handleDeleteUniversity(id) }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        </Paper>
    )
}
