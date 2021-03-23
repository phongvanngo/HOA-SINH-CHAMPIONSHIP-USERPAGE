import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import React, { useRef, useState } from 'react';
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

    const [findUserCode, setFindUserCode] = useState({
        code: '',
        typing: false,
        typingTimeout: 0,
    });

    const handleSearch = (e) => {

        if (findUserCode.typingTimeout) {
            clearTimeout(findUserCode.typingTimeout);
        };

        setFindUserCode({
            code: e.target.value,
            typing: false,
            typingTimeout: setTimeout(() => {
                // dispatch(fetchRankSingleRequest({ reloadAll: true, searchValue: e.target.value }));
                dispatch(searchUserRequest({ userCode: e.target.value }));
            }, 500)
        })



    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.headerArea}>
                    <h3 style={{ display: 'inline', verticalAlign: 'bottom', }}>Tìm kiếm</h3>
                    {/* <Button
                        className={classes.buttonCreate}
                        variant="contained"
                        color="default"
                        size='small'
                        startIcon={<SearchIcon />}
                    >
                        Tìm
      </Button> */}
                </div>
                <Divider />
                <FormControl component="fieldset" style={{ marginTop: '10px', width: '100%' }}>
                    <TextField
                        size="small"
                        onChange={handleSearch}
                        id="outlined-basic"
                        style={{ marginTop: '10px' }}
                        variant="outlined" label="Mã dự thi" />
                </FormControl>
            </Paper>
        </div >
    );
}