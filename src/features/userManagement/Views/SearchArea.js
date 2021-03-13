import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { searchUserRequest } from './../UserSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'left',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
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

export default function SearhArea() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);

    const handleSumbit = () => {
        dispatch(searchUserRequest({ userCode: searchInputRef.current.value }));
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.headerArea}>
                    <h3 style={{ display: 'inline', verticalAlign: 'bottom', }}>Tìm kiếm</h3>
                    <Button
                        className={classes.buttonCreate}
                        variant="contained"
                        color="default"
                        size='small'
                        onClick={handleSumbit}
                        startIcon={<SearchIcon />}
                    >
                        Tìm
      </Button>
                </div>
                <Divider />
                <FormControl component="fieldset" style={{ marginTop: '10px', width: '100%' }}>
                    <TextField
                        size="small"
                        inputRef={searchInputRef}
                        id="outlined-basic"
                        style={{ marginTop: '10px' }}
                        variant="outlined" label="Mã dự thi" />
                </FormControl>
            </Paper>
        </div >
    );
}