import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequest } from '../UserSlice';
import UserItem from './UserItem';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function CustomPaginationActionsTable() {
    const classes = useStyles2();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(0);
    const [flag, setFlag] = React.useState(0);

    const totalUsers = useSelector(state => state.user.totalUsers)
    const currentSessionID = useSelector(state => state.user.currentSessionID);
    let listUsers = useSelector(state => state.user.listUsers);

    const count = rowsPerPage > 0 ? rowsPerPage : listUsers.length;
    listUsers = listUsers.slice(0, count + 1);

    useEffect(() => {
        console.log("page change effect");
        if (rowsPerPage === 0) return;
        dispatch(fetchUserRequest({ page: page, pageSize: rowsPerPage !== -1 ? rowsPerPage : totalUsers, sessionID: currentSessionID }));
    }, [rowsPerPage, page, flag])

    useEffect(() => {
        console.log("current ID change");
        setFlag(flag + 1);
        setRowsPerPage(10);
    }, [currentSessionID])

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalUsers - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    console.log("data render");

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '5%' }} align="center" ></TableCell>
                        <TableCell style={{ width: '25%' }} align="center">Mã dự thi</TableCell>
                        <TableCell style={{ width: '35%' }} align="center">Tên thí sinh (tên đội)</TableCell>
                        {/* <TableCell style={{ width: '15%' }} align="center">
Tên ca thi
                        </TableCell> */}
                        <TableCell style={{ width: '15%' }} align="center">Điểm</TableCell>
                        <TableCell style={{ width: '15%' }} align="center">Thời gian</TableCell>
                        <TableCell style={{ width: '5%' }} align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listUsers.map((user, index) => (
                        <UserItem
                            key={user.id}
                            detailedUser={user}
                            index={index + 1}
                        />
                        // <TableRow key={row.id}>
                        //     <TableCell component="th" scope="row">
                        //         { }
                        //     </TableCell>
                        //     <TableCell align="center">
                        //         {row.calories}
                        //     </TableCell>
                        //     <TableCell align="center">
                        //         {row.fat}
                        //     </TableCell>
                        // </TableRow>
                    ))}
                    {/* {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                {row.calories}
                            </TableCell>
                            <TableCell align="center">
                                {row.fat}
                            </TableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={totalUsers}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
