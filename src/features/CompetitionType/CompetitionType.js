import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompetitionTypeRequest, updateCompetitionTypeRequest } from './CompetitionTypeSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'left',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        maxWidth: '300px',
        marginBottom: '10px'
    },
    headerArea: {
        marginBottom: '10px',
    },
    buttonCreate: {
        '&:after': {
            clear: 'both',
            content: '',
            display: 'Block',
        },
        float: 'right'
    }
}));



export default function CompetitionType() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const timeSingleTypeInputRef = useRef(null)
    const timeTeamTypeInputRef = useRef(null)

    const handleUpdate = (info) => {
        dispatch(updateCompetitionTypeRequest(info));
    }

    let listCompetitionTypes = useSelector(state => state.competitionType.listCompetitionTypes);
    useEffect(() => {
        dispatch(fetchCompetitionTypeRequest({}));
    }, [dispatch])

    useEffect(() => {
        if (listCompetitionTypes !== null) {
            timeSingleTypeInputRef.current.value = listCompetitionTypes[0] ? listCompetitionTypes[0].time : '';
            timeTeamTypeInputRef.current.value = listCompetitionTypes[1] ? listCompetitionTypes[1].time : '';
        }
    }, [listCompetitionTypes])

    return (
        <div className={classes.root}>
            <h2>Chỉnh sửa thời gian làm bài</h2>
            <Paper className={classes.paper}>
                <div className={classes.headerArea}>
                    <h3 style={{ display: 'inline', verticalAlign: 'bottom', }}>Bảng cá nhân</h3>
                    <Button
                        className={classes.buttonCreate}
                        variant="contained"
                        color="default"
                        size='small'
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => { handleUpdate({ id: 1, time: timeSingleTypeInputRef.current.value }) }}
                    >
                        Cập nhật
      </Button>
                </div>
                <Divider />
                <FormControl component="fieldset" style={{ marginTop: '10px', width: '100%' }}>
                    <TextField
                        size="small"
                        inputRef={timeSingleTypeInputRef}
                        style={{ marginTop: '10px', width: '100%' }}
                        variant="outlined"
                        label="Thời gian (phút)"

                    />
                </FormControl>
            </Paper>
            <Paper className={classes.paper}>
                <div className={classes.headerArea}>
                    <h3 style={{ display: 'inline', verticalAlign: 'bottom', }}>Bảng đội</h3>
                    <Button
                        className={classes.buttonCreate}
                        variant="contained"
                        color="default"
                        size='small'
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => { handleUpdate({ id: 2, time: timeTeamTypeInputRef.current.value }) }}

                    >
                        Cập nhật
      </Button>
                </div>
                <Divider />
                <FormControl component="fieldset" style={{ marginTop: '10px', width: '100%' }}>
                    <TextField
                        size="small"
                        inputRef={timeTeamTypeInputRef}
                        style={{ marginTop: '10px', width: '100%' }}
                        variant="outlined"
                        label="Thời gian (phút)"

                    />

                </FormControl>
            </Paper>
        </div >
    );
}