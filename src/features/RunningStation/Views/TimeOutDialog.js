import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeTimeOutDialog, submitUserAnswers } from '../RunningStationSlice';
export default function UserFormDialog() {

    const dispatch = useDispatch();
    const isTimeOutDialogOpen = useSelector(state => state.runningStation.isTimeOutDialogOpen);

    const handleSubmit = () => {
        dispatch(closeTimeOutDialog());
        dispatch(submitUserAnswers());
    }

    return (
        <Dialog open={isTimeOutDialogOpen} aria-labelledby="form-dialog-title">
            <DialogContent style={{ padding: '50px', textAlign: 'center' }}>
                <h1>Thời gian làm bài của bạn đã hết !</h1>
                <div style={{ width: "150px", margin: 'auto' }}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained" color="secondary">
                        Nộp bài
</Button>

                </div>
            </DialogContent>
        </Dialog>
    );
}
