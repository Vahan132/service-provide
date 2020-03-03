import React, {useState} from 'react';
import {Container, FormControl, InputLabel, MenuItem, Select, Box, Button} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {serviceTypes} from "./constants";
import {getPartnersList, getServicesList, getGroupId} from "./requests"
import {ServiceContainer} from "./components/ServiceContainer";
import {number} from "prop-types";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 80,
        },
        startContainer: {
            display: "flex",
            justifyContent: "space-between"
        },
        mainContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            minHeight: 500
        },
        serviceContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        endContainer: {
            display: "flex",
            justifyContent: "flex-end"
        },
        totalPrice: {
            lineHeight: 2,
            paddingRight: 10
        }
    }),
);

function App() {
    const [service, setService] = useState('');
    const [partnersList, setPartners] = useState([]);
    const [partner, setPartner] = useState('');
    const [groups, setGroups] = useState<any>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const classes = useStyles();

    const selectServiceType = (event: any) => {
        const service: string = event.target.value;
        const partners: any = getPartnersList(service);
        setPartners(partners);
        setService(service);
        setPartner("");
    };

    const selectPartner = (event: any) => {
        const partner: string = event.target.value;
        setPartner(partner);
    };

    const createOrder = () => {
        alert("order created")
    };

    const createService = (groupId: number) => {
        const activeGroups: any = [...groups];
        const serviceGroup: any = activeGroups.find((group: { services: any[]; groupId: number }) => {
            return group.groupId === groupId;
        });

        const newService: any = {
            name: "",
            count: 0,
            serviceId: groupId + serviceGroup.services.list.length,
        };

        serviceGroup.services.list.push(newService);
        setGroups(activeGroups)
    };

    const createGroup = () => {
        const serviceList = getServicesList(service);
        const groupId: number = getGroupId();
        const activeGroups: any = [...groups];
        const group: any = {
            groupId: groupId,
            services: {
                list: []
            },
            startDate: "",
            endDate: "",
            serviceList: serviceList,
            serviceType: service,
            partner: partner,
            servicePriceMap: {},
            groupPrice: 0,
        };
        activeGroups.push(group);
        setGroups(activeGroups);
    };

    const handleDateEdit = (groupId: string, dateName: string, value: string) => {
        const activeGroups: any = [...groups];
        const editingGroup: any = activeGroups.find((value: any) => value.groupId === groupId);
        editingGroup[dateName] = value;
        setGroups(activeGroups);
    };

    const handleServiceEdit = (groupId: string, serviceId: string, serviceName: string, serviceCount: number) => {
        const activeGroups: any = [...groups];
        const editingGroup: any = activeGroups.find((value: any) => value.groupId === groupId);

        const editingService: any = editingGroup.services.list.find((value: any) => value.serviceId === serviceId);
        if (serviceName && serviceName !== "") {
            editingService.name = serviceName;
        } else if (serviceCount) {
            editingService.count = serviceCount;
        }

        const servicePrice: number = editingGroup.serviceList.menu.find((value: any) => value.name = serviceName);
        const totalPrice: number = 0;

        for (let group of activeGroups) {
            for (let service of group.services) {

            }
        }
        editingGroup.servicePriceMap[serviceId] = editingService.count * servicePrice;

        setGroups(activeGroups);
    };

    const getServiceContainer = () => {
        let containers: any = [];
        for (let group of groups) {
            containers.push(
                <ServiceContainer
                    createService={createService}
                    group={group}
                    key={group.groupId}
                    handleDateEdit={handleDateEdit}
                    handleServiceEdit={handleServiceEdit}
                />
             )
        }

        return containers
    };

  return (
    <Container className={classes.mainContainer}>
        <Container className={classes.startContainer}>
            <FormControl className={classes.formControl}>
                <InputLabel id="serviceType">Service</InputLabel>
                <Select
                    labelId="serviceType"
                    id="selectService"
                    value={service}
                    onChange={selectServiceType}
                >
                    <MenuItem value={serviceTypes.RESTAURANTS}>Restaurant</MenuItem>
                    <MenuItem value={serviceTypes.HOTELS}>Hotel</MenuItem>
                </Select>
            </FormControl>
            {
                service !== "" && partnersList && partnersList.length > 0 &&
                <FormControl className={classes.formControl}>
                    <InputLabel id="partnersList">Partners</InputLabel>
                    <Select
                        labelId="partnersList"
                        id="selectPartner"
                        value={partner}
                        onChange={selectPartner}
                    >
                        {
                            partnersList.map((partner) => {
                                const {value, name} = partner;
                                return (
                                    <MenuItem key={value} value={value}>{name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            }
            <Button
                onClick={createGroup}
                variant="outlined"
                color="primary"
                disabled={service === "" || partnersList.length === 0}
            >Add Group
            </Button>
        </Container>
        {
            service !== "" && partner !== "" && groups.length > 0 &&
            <Container className={classes.serviceContainer}>
                {

                    getServiceContainer()
                }
            </Container>
        }
        <Container className={classes.endContainer}>
            <Box component="div" className={classes.totalPrice}>Total Price</Box>
            <Button onClick={createOrder} variant="outlined" color="primary">Create Order</Button>
        </Container>
    </Container>
  );
}

export default App;
