import React, {useEffect, useState} from 'react'
import {serviceTypes} from "../constants";
import {FormControl, InputLabel, MenuItem, Select, Container, Input, Button, Box, InputBase} from "@material-ui/core";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {getServicesList} from "../requests"


const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            minWidth: 80,
        },
        price: {
            lineHeight: 2
        },
        inputLabel: {
            top: 0,
            left: 0,
            position: "absolute",
            transform: "translate(0, 7px) scale(1)",
        },
        serviceTypesContainer: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "10px 0"
        }
    }),
);

export function ServiceTypes({serviceList, activeService, groupId, handleServiceEdit}: any) {
    const classes = useStyles();

    const selectServiceType = (event: any) => {
        const service = event.target.value;
        handleServiceEdit(groupId, activeService.serviceId, service);
    };

    const addServiceCount = (event: any) => {
        const inputValue: number = event.target.value;
        handleServiceEdit(groupId, activeService.serviceId, "", inputValue);
    };

    return (
        <Container className={classes.serviceTypesContainer}>
            <FormControl className={classes.formControl}>
                <InputLabel id="serviceTypeByCategory">Service</InputLabel>
                <Select
                    labelId="serviceTypeByCategory"
                    id="selectServiceByCategory"
                    value={activeService.name}
                    onChange={selectServiceType}
                >
                    {
                        serviceList.menu && serviceList.menu.length > 0 &&
                        serviceList.menu.map((service: { name: string; perPrice: number }) => {
                            const {name} =  service;
                            return (
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <Input type="number" value={activeService.count} onChange={addServiceCount}/>
            <Box component="div" className={classes.price}>Price: {activeService.servicePrice}</Box>
        </Container>
    );
}