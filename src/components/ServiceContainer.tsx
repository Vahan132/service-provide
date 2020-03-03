import React, {useState} from 'react';
import {Box, Button, Container, createStyles, Theme} from '@material-ui/core';
import {DatePickers} from "./DatePicker";
import {makeStyles} from "@material-ui/core/styles";
import {ServiceTypes} from "./ServiceTypes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        serviceContainer: {
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            flexWrap: "wrap"
        },
        groupNumber: {
            display: "inline",
            lineHeight: 2
        },
        totalPrice: {
            lineHeight: 2,
            paddingRight: 10,
            textAlign: "right"
        }
    }),
);

export function ServiceContainer({group, createService, handleServiceEdit, handleDateEdit}: any) {
    const classes = useStyles();
    const [groupServicesPrice, setGroupServicesPrice] = useState(0);

    const addService = () => {
        createService(group.groupId);
    };

    const calculateGroupServicesPrice = () => {

    };

    return (
        <>
            <Container className={classes.serviceContainer}>
                <Box component="div" className={classes.groupNumber}>Group Number: {group.groupId}</Box>
                <DatePickers
                    startDate={group.startDate}
                    endDate={group.endDate}
                    service={group.serviceType}
                    handleDateEdit={handleDateEdit}
                />
                <Button onClick={addService} variant="outlined" color="primary">Add Service</Button>
            </Container>
            {
                group.services.list.length > 0 &&
                <Container className={classes.serviceContainer}>
                    {
                        group.services.list.map((activeService: any) => {
                            return (
                                <ServiceTypes
                                    key={activeService.serviceId}
                                    serviceList={group.serviceList}
                                    activeService={activeService}
                                    groupId={group.groupId}
                                    handleServiceEdit={handleServiceEdit}
                                />
                            )
                        })
                    }
                </Container>
            }
            <Box component="div" className={classes.totalPrice}>Total Price</Box>
        </>
);
}