import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {serviceTypes} from "../constants"
import {
    DatePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export function DatePickers({startDate, endDate, service, handleDateEdit}: any) {

    const handleDateChange = (event: any) => {
        if (event.target.id === "startDate") {

        }
        handleDateEdit()
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {
                service === serviceTypes.RESTAURANTS ?
                    <DateTimePicker id="startDate" value={startDate} onChange={handleDateChange} /> :
                    <>
                        <DatePicker id="start" value={startDate} onChange={handleDateChange} />
                        <DatePicker id="end" value={endDate} onChange={handleDateChange} />
                    </>
            }
        </MuiPickersUtilsProvider>
    );
}