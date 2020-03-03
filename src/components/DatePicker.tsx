import React from 'react';
import {serviceTypes} from "../constants"
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

export function DatePickers({startDate, endDate, service, handleDateEdit, groupId}: any) {
    const classes = useStyles();

    const handleStartDateChange = (event: any) => {
        handleDateEdit(groupId, "startDate", event.target.value)
    };

    const handleEndDateChange = (event: any) => {
        handleDateEdit(groupId, "endDate", event.target.value)
    };

    return (
        <>
            {
                service === serviceTypes.RESTAURANTS ?
                    <form className={classes.container} noValidate>
                        <TextField
                            id="datetime-local"
                            label="Next appointment"
                            type="datetime-local"
                            value={startDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleStartDateChange}
                        />
                    </form> :
                    <>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="startDate"
                                data-date={"startDate"}
                                label="Birthday"
                                type="date"
                                value={startDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleStartDateChange}
                            />
                        </form>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="endDate"
                                data-date={"endDate"}
                                label="Birthday"
                                type="date"
                                value={endDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleEndDateChange}
                            />
                        </form>
                    </>
            }
        </>
    );
}