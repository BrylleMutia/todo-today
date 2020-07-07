import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addItem } from "../../actions/actions";

function AddItemDialog() {
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
        dispatch(addItem(itemName));
        setItemName(""); // clear itemname field
        handleClose(); // close dialog
    };

    return (
        <div>
            <Button style={{ marginTop: "1rem", marginLeft: "2%" }} variant="contained" color="primary" onClick={handleClickOpen}>
                Add Item
            </Button>

            <Dialog open={isDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleAddItem}>
                    <DialogTitle id="form-dialog-title">ADD ITEM TO SHOPPING LIST</DialogTitle>
                    <DialogContent>
                        <TextField onChange={onFormChange} autoFocus margin="dense" id="name" label="Item" type="email" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                         <Button type="submit" onClick={handleAddItem} color="primary">
                            Add Item
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default AddItemDialog;
