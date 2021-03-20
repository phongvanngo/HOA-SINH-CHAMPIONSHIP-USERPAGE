import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUniversity, deleteUniversityRequest, editUniversity, fetchUniversityRequest } from '../UniversitySlice';
import UniversityItem from './UniversityItem';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        margin: 'auto'
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(0, 0, 0),
    },
    buttonCreateUniversity: {
        opacity: 0.4,
        '&:hover': {
            opacity: 1
        }
    }
}));

export default function InteractiveList() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const universitys = useSelector(state => state.university.listUniversitys);

    React.useEffect(() => {
        dispatch(fetchUniversityRequest({}));
    }, [dispatch])

    const handleDeleteUniversity = (question_id) => {
        if (window.confirm(`Bạn có chắc chắn xóa`)) {
            dispatch(deleteUniversityRequest(question_id));
        }
    }

    const handleCreateUniversity = () => {
        dispatch(createUniversity());
    }

    const handleEditUniversity = (universityInfo) => {
        dispatch(editUniversity(universityInfo));
    }



    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography
                        variant="h6" className={classes.title}>
                        Danh sách các đơn vị thi
                    <IconButton
                            className={classes.buttonCreateUniversity}
                            onClick={handleCreateUniversity}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Typography>
                    <div className={classes.demo}>
                        <List style={{ background: "#f2f2f2" }}>
                            {universitys.map((university, index) =>
                                <UniversityItem
                                    key={index}
                                    detailedUniversity={university}
                                    handleDeleteUniversity={handleDeleteUniversity}
                                    handleEditUniversity={handleEditUniversity}
                                />)}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}