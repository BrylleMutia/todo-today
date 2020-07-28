import React, { useState } from "react";

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../actions/itemActions";

const useStyles = makeStyles({
    addBtn: {
        marginBottom: "1rem",
        minWidth: "50%",
    },
    container: {
        display: "flex",
        justifyContent: "center",
    },
});

function AddItemDialog() {
    const classes = useStyles();

    const userId = useSelector(state => state.auth.user._id);
    const dispatch = useDispatch();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [itemName, setItemName] = useState("");

    const handleClickOpen = () => {
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const onFormChange = (e) => {
        setItemName(e.target.value);
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if(itemName) dispatch(addItem(itemName, userId));   // prevent empty input
        setItemName(""); // clear itemname field
        handleClose(); // close dialog
    };

    return (
        <div className={classes.container}>
            <Button className={classes.addBtn} variant="contained" color="primary" startIcon={<AddBoxIcon />} onClick={handleClickOpen}>
                New Todo
            </Button>

            <Dialog open={isDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleAddItem}>
                    <DialogTitle id="form-dialog-title">ADD TO MY TODO LIST</DialogTitle>
                    <DialogContent>
                        <TextField onChange={onFormChange} autoFocus margin="dense" id="item" label="Item" type="text" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} size="small" color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" size="small" onClick={handleAddItem} color="primary">
                            Add Todo
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default AddItemDialog;
