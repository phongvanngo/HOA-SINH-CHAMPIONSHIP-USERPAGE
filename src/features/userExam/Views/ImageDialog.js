import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeImageDialog } from './../UserExamSlice';
export default function UserFormDialog() {

    const dispatch = useDispatch();
    const openingImage = useSelector(state => state.userExam.openingImage);


    const handleClose = () => {
        dispatch(closeImageDialog());
    }

    return (
        <Dialog maxWidth='xl' open={openingImage === null ? false : true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <img src={openingImage} alt="hinhanh" />
            </DialogContent>
        </Dialog>
    );
}
