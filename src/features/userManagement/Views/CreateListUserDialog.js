import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createListUserRequest } from './../UserSlice';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'left',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        marginTop: '10px',
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

export default function CenteredGrid() {
    const classes = useStyles();
    const dispatch = useDispatch();
    // let listContestSessions = useSelector(state => state.contestSession.listContestSessions) || [];
    let listUniversities = useSelector(state => state.university.listUniversitys);

    // listUniversities = [{ id: 0, university_name: "Thí sinh tự do" }, ...listUniversities]

    const userNameInputRef = useRef(null)
    const prefixInputRef = useRef(null)

    const inititalValidInput = {
        userName: true,
        universityId: true,
    }

    const [validInput, setValidInput] = useState(inititalValidInput);
    // const [choosenSessionID, setChosenSessionID] = useState(null);
    const [chosenUniversityId, setChosenUniversityId] = useState(null);

    const checkValidInput = (dataSubmit) => {
        let valid = true;
        let validInputDetail = inititalValidInput;
        const { name, universityId } = dataSubmit;


        // if (name.trim() === "") {
        //     valid = false;
        //     validInputDetail.userName = false;
        // }
        if (universityId === null) {
            valid = false;
            validInputDetail.universityId = false;
        }


        if (valid === false) {
            setValidInput(validInputDetail);
            return false;
        }
        else
            return true;
    }

    const handleChangeUniversity = (event, newValue) => {
        setChosenUniversityId(newValue);
    }

    const handleSubmit = () => {
        const shortid = Math.random().toString(36).substr(2, 9);
        const userInfo = {
            listNames: userNameInputRef.current.value,
            code: `${prefixInputRef.current.value}${shortid}`,
            // sessionID: choosenSessionID ? choosenSessionID.id : null,
            universityId: chosenUniversityId ? chosenUniversityId.id : null
        }

        if (checkValidInput(userInfo) === false) return;

        const listNames = userInfo.listNames.split("\n");


        dispatch(createListUserRequest(userInfo));

        setValidInput(inititalValidInput);


    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.headerArea}>
                    <h3 style={{ display: 'inline', verticalAlign: 'bottom', }}>Tạo nhanh mã dự thi</h3>
                    <Button
                        className={classes.buttonCreate}
                        variant="contained"
                        color="default"
                        size='small'
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleSubmit}
                    >
                        Tạo
      </Button>
                </div>
                <Divider />
                <FormControl component="fieldset" style={{ marginTop: '10px', width: '100%' }}>
                    <TextField
                        size="small"
                        multiline
                        rows={10}
                        inputRef={userNameInputRef}
                        style={{ marginTop: '10px', width: '100%' }}
                        variant="outlined"
                        label="Danh sách tên thí sinh"
                        error={!validInput.userName}
                        helperText={!validInput.userName ? "Dữ liệu không được để trống" : ""}

                    />
                    <TextField
                        size="small"

                        inputRef={prefixInputRef}
                        style={{ marginTop: '10px' }}
                        variant="outlined"
                        label="Tiền tố" />
                    {/* <Autocomplete
                        options={listContestSessions}
                        onChange={handleChangeSession}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '100%', marginTop: '10px' }}
                        renderInput=
                        {(params) =>
                            <TextField {...params}
                                size="small"
                                variant="outlined"
                                label="Ca thi"
                                error={!validInput.sessionID}
                                helperText={!validInput.sessionID ? "Phải chọn ca thi" : ""}
                            />}
                    /> */}
                    <Autocomplete
                        options={listUniversities}
                        onChange={handleChangeUniversity}
                        getOptionLabel={(option) => option.university_name}
                        style={{ width: '100%', marginTop: '10px' }}
                        renderInput=
                        {(params) =>
                            <TextField {...params}
                                size="small"
                                variant="outlined"
                                label="Đơn vị thi"
                                error={!validInput.universityId}
                                helperText={!validInput.universityId ? "Phải chọn đơn vị thi" : ""}
                            />}
                    />
                </FormControl>
            </Paper>
        </div >
    );
}