import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuoteForm.css";
import { FormHeading } from "../../Heading/Heading";
import UtilityButton, { SubmitButton } from "../../Buttons/UtilityButton/UtilityButton";
import { CarrierRateTable } from "../../Table/Table";
import AddCarrierRatesModal, { DeleteModal, AddAddressModal, CarrierRatesModal } from "../../Modal/Modal";
import Input from "../../InputElements/Input/Input";
import Select from "../../InputElements/Select/Select";
import Checkbox from "../../InputElements/Checkbox/Checkbox";
import FlexBox, { FlexStartRow, SplitPanel, FlexStartColumn } from "../../FlexBox/FlexBox";
import axios from "axios";
import TextArea from "../../InputElements/TextArea/TextArea";
import FolderPanel from "../../FolderPanel/FolderPanel";
import FolderButton from "../../Buttons/FolderButton/FolderButton";

function dateStringFormat(format) {
    if (format <= 9) {
        return '0' + format
    } else return format
}

const date = new Date();

const todayDate = `${date.getFullYear()}-${dateStringFormat(date.getUTCMonth() + 1)}-${dateStringFormat(date.getUTCDate())}`;

function QuoteForm(props) {
    const navigate = useNavigate();

    const [quoteData, setQuoteData] = useState({
        name: "",
        quoteNumber: "",
        shipmentSize: "",
        shipmentType: "",
        date: todayDate,
        time: "",
        client: "",
        paymentTerms: "",
        thirdPartyBillTo: "",
        serviceLevel: "",
        shipper: "",
        shipperCity: "",
        shipperState: "",
        shipperCountry: "",
        consignee: "",
        consigneeCity: "",
        consigneeState: "",
        consigneeCountry: "",
        freightReady: "",
        pickupAppointment: "",
        deliveryAppointment: "",
        deliveryEta: "",
        sbBroker: "",
        nbBroker: "",
        quoteNotes: "",
        commodity: "",
        isStackable: true,
        isTarpRequired: false,
        isPowerTailgateRequired: false,
        isTeamRequired: false,
        un: "",
        class: "",
        pg: "",
        emergencyContact: "",
        dgDescription: "",
        poNumber: "",
        soNumber: "",
        referenceNumber: "",
        invoiceNumber: "",
        l1: "",
        w1: "",
        h1: "",
        c1: "",
        cuft1: "",
        l2: "",
        w2: "",
        h2: "",
        c2: "",
        cuft2: "",
        l3: "",
        w3: "",
        h3: "",
        c3: "",
        cuft3: "",
        l4: "",
        w4: "",
        h4: "",
        c4: "",
        cuft4: "",
        l5: "",
        w5: "",
        h5: "",
        c5: "",
        cuft5: "",
        l6: "",
        w6: "",
        h6: "",
        c6: "",
        cuft6: "",
        l7: "",
        w7: "",
        h7: "",
        c7: "",
        cuft7: "",
        l8: "",
        w8: "",
        h8: "",
        c8: "",
        cuft8: "",
        l9: "",
        w9: "",
        h9: "",
        c9: "",
        cuft9: "",
        l10: "",
        w10: "",
        h10: "",
        c10: "",
        cuft10: "",
        totalCUFT: "",
        totalPieces: "",
        totalWeight: "",
        weightMeasurement: "",
        dv: false,
        rf: false,
        du: false,
        fd: false,
        sd: false,
        sb: false,
        dd: false,
        fu: false,
        rl: false,
        temp: "Dry",
        temperature: "",
        glPickupCity: "",
        glPickupState: "",
        glPickupCountry: "",
        glDeliveryCity: "",
        glDeiveryState: "",
        glDeliveryCountry: "",

    });

    const [carrierQuoteDefaults, setCarrierQuoteDefaults] = useState({
        name: "",
        quoteNumber: "",
        date: "",
        fromCity: "",
        fromState: "",
        toCity: "",
        toState: "",
        dispatchName: "",
        carrierName: "",
        carrierPhoneNumber: "",
        carrierEquipment: "",
        asked: "",
        quoted: "",
        quoteCurrency: "",
        carrierQuoteNumber: "",
        carrierTruckNumber: "",
        carrierTrailerNumber: "",
        pickupDate: "",
        deliveryDate: "",
        parsPaps: "",
        crossing: "",
        notes: ""
    });

    const [carrierQuoteData, setCarrierQuoteData] = useState([]);

    const [isCarrierRatesModalVisible, toggleCarrierRatesModal] = useState(false);

    const [isViewCarrierRatesModalVisible, toggleViewCarrierRatesModal] = useState(false);

    const [isDeleteModalVisible, toggleDeleteModal] = useState(false);

    const [isAddAddressModalVisible, toggleAddAddressModal] = useState(false);

    const [shipmentHeader, toggleShipmentHeader] = useState(true);

    const [isScreenLocked, toggleScreenLock] = useState(false);

    const [deleteModalData, setDeleteModalData] = useState({
        quoteId: "",
        lineId: ""
    });

    function openAddAddressModal() {
        toggleAddAddressModal(!isAddAddressModalVisible);
        toggleScreenLock(!isScreenLocked);
    }

    function closeAddAddressModal() {
        toggleAddAddressModal(!isAddAddressModalVisible);
        toggleScreenLock(!isScreenLocked);
    }

    function openDeleteModal(event) {
        toggleDeleteModal(!isDeleteModalVisible);
        setDeleteModalData({ quoteId: props.params, lineId: event });
        toggleScreenLock(!isScreenLocked);
    }

    function closeDeleteModal() {
        toggleDeleteModal(!isDeleteModalVisible);
        toggleScreenLock(!isScreenLocked);
    }

    function openCarrierRatesModal(event) {
        const data = carrierQuoteData.find(x => x._id == event);
        setCarrierQuoteDefaults({
            name: data.name,
            quoteNumber: data.quoteNumber,
            date: data.date,
            fromCity: data.fromCity,
            fromState: data.fromState,
            toCity: data.toCity,
            toState: data.toState,
            dispatchName: data.dispatchName,
            carrierName: data.carrierName,
            carrierPhoneNumber: data.carrierPhoneNumber,
            carrierEquipment: data.carrierEquipment,
            asked: data.asked,
            quoted: data.quoted,
            quoteCurrency: data.quoteCurrency,
            carrierQuoteNumber: data.carrierQuoteNumber,
            carrierTruckNumber: data.carrierTruckNumber,
            carrierTrailerNumber: data.carrierTrailerNumber,
            pickupDate: data.pickupDate,
            deliveryDate: data.deliveryDate,
            parsPaps: data.parsPaps,
            crossing: data.crossing,
            notes: data.notes
        });
        toggleViewCarrierRatesModal(!isViewCarrierRatesModalVisible);
        toggleScreenLock(!isScreenLocked);
    }

    function closeCarrierRatesModal() {
        toggleViewCarrierRatesModal(!isViewCarrierRatesModalVisible);
        toggleScreenLock(!isScreenLocked);
    }

    function deleteCarrierRateRecord() {
        const ENDPOINT = (`/api/quotes/delete-carrier-rates/quoteId=${deleteModalData.quoteId}/lineId=${deleteModalData.lineId}`);
        axios(ENDPOINT)
            .then(res => {
                console.log(res.data);
                getQuoteData();
                closeDeleteModal();
            })
            .catch(err => {
                console.log(err);
            });
    }

    function toggleCarrierRates() {
        toggleCarrierRatesModal(!isCarrierRatesModalVisible);
        toggleScreenLock(!isScreenLocked);
    }

    function shipmentHeaderClick() {
        toggleShipmentHeader(true);
        toggleShipmentsDetails(false);
        toggleCostingDetails(false);
        toggleCarrierCosting(false);
    }

    const [shipmentDetails, toggleShipmentsDetails] = useState(false);

    function shipmentDetailsClick() {
        toggleShipmentHeader(false);
        toggleShipmentsDetails(true);
        toggleCostingDetails(false);
        toggleCarrierCosting(false);
    }

    const [costingDetails, toggleCostingDetails] = useState(false);

    function costingDetailsClick() {
        toggleShipmentHeader(false);
        toggleShipmentsDetails(false);
        toggleCostingDetails(true);
        toggleCarrierCosting(false);
    }

    const [carrierCosting, toggleCarrierCosting] = useState(false);

    function carrierCostingClick() {
        toggleShipmentHeader(false);
        toggleShipmentsDetails(false);
        toggleCostingDetails(false);
        toggleCarrierCosting(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setQuoteData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleCheckbox(event) {
        const { name, checked } = event.target;

        setQuoteData(prevValue => {
            return {
                ...prevValue,
                [name]: checked
            }
        })
    }

    function calculateCUFT() {
        const totalCUFT = ((quoteData.cuft1 + quoteData.cuft2 + quoteData.cuft3 + quoteData.cuft4 + quoteData.cuft5 + quoteData.cuft6 + quoteData.cuft7 + quoteData.cuft8 + quoteData.cuft9 + quoteData.cuft10) / 1728).toFixed(2);

        setQuoteData(prevValue => {
            return {
                ...prevValue,
                cuft1: quoteData.l1 * quoteData.w1 * quoteData.h1 * quoteData.c1,
                cuft2: quoteData.l2 * quoteData.w2 * quoteData.h2 * quoteData.c2,
                cuft3: quoteData.l3 * quoteData.w3 * quoteData.h3 * quoteData.c3,
                cuft4: quoteData.l4 * quoteData.w4 * quoteData.h4 * quoteData.c4,
                cuft5: quoteData.l5 * quoteData.w5 * quoteData.h5 * quoteData.c5,
                cuft6: quoteData.l6 * quoteData.w6 * quoteData.h6 * quoteData.c6,
                cuft7: quoteData.l7 * quoteData.w7 * quoteData.h7 * quoteData.c7,
                cuft8: quoteData.l8 * quoteData.w8 * quoteData.h8 * quoteData.c8,
                cuft9: quoteData.l9 * quoteData.w9 * quoteData.h9 * quoteData.c9,
                cuft10: quoteData.l10 * quoteData.w10 * quoteData.h10 * quoteData.c10,
                totalCUFT: totalCUFT,
            }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(props.post, { quoteData })
            .then(res => { navigate(`/logistics/view-quote/${res.data}`); })
            .catch(err => { console.log(err); });
    }

    const [addressData, setAddressData] = useState([]);

    useEffect(() => {
        getAddressData();
        if (props.params !== undefined) { getQuoteData(); }
    }, []);

    const getAddressData = () => {
        const ENDPOINT = ('/api/view/address-list');
        axios(ENDPOINT)
            .then(res => { setAddressData(res.data) })
            .catch(err => { console.log(err) });
    }

    const getQuoteData = () => {
        const ENDPOINT = (`/api/quotes/view-quote/${props.params}`);
        axios(ENDPOINT)
            .then(res => {
                const data = res.data;
                setQuoteData({
                    name: data.name,
                    quoteNumber: data.quoteNumber,
                    shipmentSize: data.shipmentSize,
                    shipmentType: data.shipmentType,
                    date: data.date.date,
                    time: data.date.time,
                    client: data.client.id,
                    paymentTerms: data.paymentTerms,
                    thirdPartyBillTo: data.thirdPartyBillTo,
                    serviceLevel: data.serviceLevel,
                    shipper: data.shipper.id,
                    shipperCity: data.genericShipper.city,
                    shipperState: data.genericShipper.state,
                    shipperCountry: data.genericShipper.country,
                    consignee: data.consignee.id,
                    consigneeCity: data.genericConsignee.city,
                    consigneeState: data.genericConsignee.state,
                    consigneeCountry: data.genericConsignee.country,
                    freightReady: data.freightReady,
                    pickupAppointment: data.pickupAppointment,
                    deliveryAppointment: data.deliveryAppointment,
                    deliveryEta: data.deliveryEta,
                    sbBroker: data.broker.sbBroker,
                    nbBroker: data.broker.nbBroker,
                    quoteNotes: data.quoteNotes,
                    commodity: data.commodity,
                    isStackable: data.isStackable,
                    isTarpRequired: data.isTarpRequired,
                    isPowerTailgateRequired: data.isPowerTailgateRequired,
                    isTeamRequired: data.isTeamRequired,
                    un: data.dangerousGoods.un,
                    class: data.dangerousGoods.class,
                    pg: data.dangerousGoods.pg,
                    emergencyContact: data.dangerousGoods.emergencyContact,
                    dgDescription: data.dangerousGoods.dgDescription,
                    poNumber: data.referenceNumbers.poNumber,
                    soNumber: data.referenceNumbers.soNumber,
                    referenceNumber: data.referenceNumbers.referenceNumber,
                    invoiceNumber: data.referenceNumbers.invoiceNumber,
                    l1: data.shipmentDims.l1,
                    w1: data.shipmentDims.w1,
                    h1: data.shipmentDims.h1,
                    c1: data.shipmentDims.c1,
                    cuft1: data.shipmentDims.cuft1,
                    l2: data.shipmentDims.l2,
                    w2: data.shipmentDims.w2,
                    h2: data.shipmentDims.h2,
                    c2: data.shipmentDims.c2,
                    cuft2: data.shipmentDims.cuft2,
                    l3: data.shipmentDims.l3,
                    w3: data.shipmentDims.w3,
                    h3: data.shipmentDims.h3,
                    c3: data.shipmentDims.c3,
                    cuft3: data.shipmentDims.cuft3,
                    l4: data.shipmentDims.l4,
                    w4: data.shipmentDims.w4,
                    h4: data.shipmentDims.h4,
                    c4: data.shipmentDims.c4,
                    cuft4: data.shipmentDims.cuft4,
                    l5: data.shipmentDims.l5,
                    w5: data.shipmentDims.w5,
                    h5: data.shipmentDims.h5,
                    c5: data.shipmentDims.c5,
                    cuft5: data.shipmentDims.cuft5,
                    l6: data.shipmentDims.l6,
                    w6: data.shipmentDims.w6,
                    h6: data.shipmentDims.h6,
                    c6: data.shipmentDims.c6,
                    cuft6: data.shipmentDims.cuft6,
                    l7: data.shipmentDims.l7,
                    w7: data.shipmentDims.w7,
                    h7: data.shipmentDims.h7,
                    c7: data.shipmentDims.c7,
                    cuft7: data.shipmentDims.cuft7,
                    l8: data.shipmentDims.l8,
                    w8: data.shipmentDims.w8,
                    h8: data.shipmentDims.h8,
                    c8: data.shipmentDims.c8,
                    cuft8: data.shipmentDims.cuft8,
                    l9: data.shipmentDims.l9,
                    w9: data.shipmentDims.w9,
                    h9: data.shipmentDims.h9,
                    c9: data.shipmentDims.c9,
                    cuft9: data.shipmentDims.cuft9,
                    l10: data.shipmentDims.l10,
                    w10: data.shipmentDims.w10,
                    h10: data.shipmentDims.h10,
                    c10: data.shipmentDims.c10,
                    cuft10: data.shipmentDims.cuft10,
                    totalCUFT: data.shipmentDims.totalCUFT,
                    totalPieces: data.totalPieces,
                    totalWeight: data.totalWeight.weight,
                    weightMeasurement: data.totalWeight.weightMeasurement,
                    dv: data.equipmentRequired.dv,
                    rf: data.equipmentRequired.rf,
                    du: data.equipmentRequired.du,
                    fd: data.equipmentRequired.fd,
                    sd: data.equipmentRequired.sd,
                    sb: data.equipmentRequired.sb,
                    dd: data.equipmentRequired.dd,
                    fu: data.equipmentRequired.fu,
                    rl: data.equipmentRequired.rl,
                    temp: data.temp,
                    temperature: data.temperature,
                    glPickupCity: data.glPickupCity,
                    glPickupState: data.glPickupState,
                    glPickupCountry: data.glPickupCountry,
                    glDeliveryCity: data.glDeliveryCity,
                    glDeiveryState: data.glDeiveryState,
                    glDeliveryCountry: data.glDeliveryCountry,
                });
                setCarrierQuoteData(res.data.carrierRates);
                setCarrierQuoteDefaults({
                    name: "",
                    quoteNumber: data.quoteNumber,
                    date: data.date.date,
                    fromCity: data.glPickupCity,
                    fromState: data.glPickupState,
                    toCity: data.glDeliveryCity,
                    toState: data.glDeliveryCountry,
                    dispatchName: "",
                    carrierName: "",
                    carrierPhoneNumber: "",
                    carrierEquipment: "",
                    asked: "",
                    quoted: "",
                    quoteCurrency: "CDN",
                    carrierQuoteNumber: "",
                    carrierTruckNumber: "",
                    carrierTrailerNumber: "",
                    pickupDate: "",
                    deliveryDate: "",
                    parsPaps: "",
                    crossing: "",
                    notes: ""
                });
            })
            .catch(err => {
                console.log(err);
                setQuoteData({
                    name: "",
                    quoteNumber: "",
                    shipmentSize: "",
                    shipmentType: "",
                    date: todayDate,
                    time: "",
                    client: "",
                    paymentTerms: "",
                    thirdPartyBillTo: "",
                    serviceLevel: "",
                    shipper: "",
                    shipperCity: "",
                    shipperState: "",
                    shipperCountry: "",
                    consignee: "",
                    consigneeCity: "",
                    consigneeState: "",
                    consigneeCountry: "",
                    freightReady: "",
                    pickupAppointment: "",
                    deliveryAppointment: "",
                    deliveryEta: "",
                    sbBroker: "",
                    nbBroker: "",
                    quoteNotes: "",
                    commodity: "",
                    isStackable: true,
                    isTarpRequired: false,
                    isPowerTailgateRequired: false,
                    isTeamRequired: false,
                    un: "",
                    class: "",
                    pg: "",
                    emergencyContact: "",
                    dgDescription: "",
                    poNumber: "",
                    soNumber: "",
                    referenceNumber: "",
                    invoiceNumber: "",
                    l1: "",
                    w1: "",
                    h1: "",
                    c1: "",
                    cuft1: "",
                    l2: "",
                    w2: "",
                    h2: "",
                    c2: "",
                    cuft2: "",
                    l3: "",
                    w3: "",
                    h3: "",
                    c3: "",
                    cuft3: "",
                    l4: "",
                    w4: "",
                    h4: "",
                    c4: "",
                    cuft4: "",
                    l5: "",
                    w5: "",
                    h5: "",
                    c5: "",
                    cuft5: "",
                    l6: "",
                    w6: "",
                    h6: "",
                    c6: "",
                    cuft6: "",
                    l7: "",
                    w7: "",
                    h7: "",
                    c7: "",
                    cuft7: "",
                    l8: "",
                    w8: "",
                    h8: "",
                    c8: "",
                    cuft8: "",
                    l9: "",
                    w9: "",
                    h9: "",
                    c9: "",
                    cuft9: "",
                    l10: "",
                    w10: "",
                    h10: "",
                    c10: "",
                    cuft10: "",
                    totalCUFT: "",
                    totalPieces: "",
                    totalWeight: "",
                    weightMeasurement: "",
                    dv: false,
                    rf: false,
                    du: false,
                    fd: false,
                    sd: false,
                    sb: false,
                    dd: false,
                    fu: false,
                    rl: false,
                    temp: "Dry",
                    temperature: "",
                    glPickupCity: "",
                    glPickupState: "",
                    glPickupCountry: "",
                    glDeliveryCity: "",
                    glDeiveryState: "",
                    glDeliveryCountry: "",
                })
            });
    }

    function saveAndExitClick() {
        axios.post(props.post, { quoteData })
            .then(res => {
                navigate(`/`);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            {isViewCarrierRatesModalVisible &&
                <CarrierRatesModal data={carrierQuoteDefaults} closeModal={closeCarrierRatesModal} />
            }
            {isAddAddressModalVisible &&
                <AddAddressModal closeModal={closeAddAddressModal} refreshData={getAddressData} />
            }
            {isDeleteModalVisible &&
                <DeleteModal closeModal={closeDeleteModal} submitClick={deleteCarrierRateRecord} />
            }
            {isCarrierRatesModalVisible &&
                <AddCarrierRatesModal
                    post={`/api/quotes/add-carrier-rates/${props.params}`}
                    onClick={getQuoteData}
                    data={carrierQuoteDefaults}
                    closeModal={toggleCarrierRates}
                />
            }
            <form onSubmit={handleSubmit}>
                <div className={isScreenLocked ? "quote-form locked" : "quote-form"}>
                    <div className={shipmentHeader ? "quote-body" : "quote-body quote-body-hidden"}>
                        <FlexStartRow gap="15px">
                            <Input
                                name="name"
                                placeholder=""
                                label="Name:"
                                size="input-sm"
                                type="text"
                                value={quoteData.name}
                                readOnly=""
                                onChange={handleChange}
                                required={true}
                            />
                            <Select
                                name="shipmentSize"
                                label="Shipment Size:"
                                size="input-sm"
                                onChange={handleChange}
                                value={quoteData.shipmentSize}
                                required={true}
                            >
                                <option value=""></option>
                                <option value="LTL">LTL</option>
                                <option value="FTL">FTL</option>
                            </Select>
                            <Select
                                name="shipmentType"
                                label="Shipment Type"
                                size="input-sm"
                                onChange={handleChange}
                                value={quoteData.shipmentType}
                                required={true}
                            >
                                <option value=""></option>
                                <option value="Domestic">Domestic</option>
                                <option value="International">International</option>
                                <option value="TransBorder">TransBorder</option>
                                <option value="InterState">InterState</option>
                                <option value="IntraState">IntraState</option>
                            </Select>
                            <Input
                                name="date"
                                placeholder=""
                                label="Date:"
                                size="input-sm"
                                type="date"
                                value={quoteData.date}
                                readOnly=""
                                onChange={handleChange}
                            />
                            <Input
                                name="time"
                                placeholder=""
                                label="Time"
                                size="input-sm"
                                type="time"
                                value={quoteData.time}
                                readOnly=""
                                onChange={handleChange}
                            />
                        </FlexStartRow>
                        <FlexStartRow gap="15px" class="border-bottom-grey">
                            <Select
                                name="client"
                                label="Client:"
                                size="input-lg"
                                onChange={handleChange}
                                value={quoteData.client}
                                required={true}
                            >
                                <option value=""></option>
                                {addressData.map(address => {
                                    return (
                                        <option
                                            id={address._id}
                                            key={address._id}
                                            value={address._id}
                                        >
                                            {address.company} - {address.addressOne}. {address.city}. {address.state}
                                        </option>
                                    )
                                })}
                            </Select>
                            <Input
                                name="quoteNumber"
                                placeholder=""
                                label="Quote #:"
                                size="input-sm"
                                type="text"
                                value={quoteData.quoteNumber}
                                readOnly=""
                                onChange={handleChange}
                                required={true}
                            />
                            <Select
                                name="paymentTerms"
                                label="Payment Terms:"
                                size="input-sm"
                                onChange={handleChange}
                                value={quoteData.paymentTerms}
                                required={true}
                            >
                                <option value=""></option>
                                <option value="Prepaid">Prepaid</option>
                                <option value="Collect">Collect</option>
                                <option value="Third Party">Third Party</option>
                            </Select>
                            <Input
                                name="thirdPartyBillTo"
                                placeholder=""
                                label="Third-Party Bill To:"
                                size="input-sm"
                                type="text"
                                value={quoteData.thirdPartyBillTo}
                                readOnly=""
                                onChange={handleChange}
                            />
                            <Input
                                name="serviceLevel"
                                placeholder=""
                                label="Service Level"
                                size="input-sm"
                                type="text"
                                value={quoteData.serviceLevel}
                                readOnly=""
                                onChange={handleChange}
                                required={true}
                            />
                        </FlexStartRow>
                        <FlexStartRow class="border-bottom-grey">
                            <SplitPanel class="border-right-grey padding-right-25">
                                <FlexStartColumn gap="10px">
                                    <Select
                                        name="shipper"
                                        label="Shipper:"
                                        size="input-lg"
                                        onChange={handleChange}
                                        value={quoteData.shipper}
                                    >
                                        <option value=""></option>
                                        {addressData.map(address => {
                                            return (
                                                <option
                                                    id={address._id}
                                                    key={address._id}
                                                    value={address._id}
                                                >
                                                    {address.company} - {address.addressOne}. {address.city}. {address.state}
                                                </option>
                                            )
                                        })}
                                    </Select>
                                    <FlexStartRow gap="15px" class="border-bottom-grey">
                                        <Input
                                            name="shipperCity"
                                            placeholder=""
                                            label="City:"
                                            size="input-lg"
                                            type="text"
                                            value={quoteData.shipperCity}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="shipperState"
                                            placeholder=""
                                            label="State:"
                                            size="input-sm"
                                            type="text"
                                            value={quoteData.shipperState}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="shipperCountry"
                                            placeholder=""
                                            label="Country:"
                                            size="input-md"
                                            type="text"
                                            value={quoteData.shipperCountry}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                    </FlexStartRow>
                                </FlexStartColumn>
                                <FlexStartColumn gap="10px">
                                    <Select
                                        name="consignee"
                                        label="Consignee:"
                                        size="input-lg"
                                        onChange={handleChange}
                                        value={quoteData.consignee}
                                    >
                                        <option value=""></option>
                                        {addressData.map(address => {
                                            return (
                                                <option
                                                    id={address._id}
                                                    key={address._id}
                                                    value={address._id}
                                                >
                                                    {address.company} - {address.addressOne}. {address.city}. {address.state}
                                                </option>
                                            )
                                        })}
                                    </Select>
                                    <FlexStartRow gap="15px">
                                        <Input
                                            name="consigneeCity"
                                            placeholder=""
                                            label="City:"
                                            size="input-lg"
                                            type="text"
                                            value={quoteData.consigneeCity}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="consigneeState"
                                            placeholder=""
                                            label="State:"
                                            size="input-sm"
                                            type="text"
                                            value={quoteData.consigneeState}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="consigneeCountry"
                                            placeholder=""
                                            label="Country"
                                            size="input-md"
                                            type="text"
                                            value={quoteData.consigneeCountry}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                    </FlexStartRow>
                                </FlexStartColumn>
                            </SplitPanel>
                            <SplitPanel>
                                <FormHeading
                                    title="Equipment Required:"
                                />
                                <FlexStartRow gap="25px">
                                    <FlexStartColumn gap="15px">
                                        <Checkbox
                                            name="dv"
                                            label="DV - Dry Van"
                                            readOnly=""
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={quoteData.dv}
                                        />
                                        <Checkbox
                                            name="fd"
                                            label=" FD - Flat Deck"
                                            readOnly=""
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={quoteData.fd}
                                        />
                                        <Checkbox
                                            name="dd"
                                            label="DD - Double Drop"
                                            readOnly=""
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={quoteData.dd}
                                        />
                                    </FlexStartColumn>
                                    <FlexStartColumn gap="15px">
                                        <Checkbox
                                            name="rf"
                                            label="RF - Reefer Unit"
                                            readOnly=""
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={quoteData.rf}
                                        />
                                        <Checkbox
                                            name="sd"
                                            label="SD - Step Deck"
                                            readOnly=""
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={quoteData.sd}
                                        />
                                        <Checkbox
                                            name="fu"
                                            label="FU - Flat Unit"
                                            readOnly=""
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={quoteData.fu}
                                        />
                                    </FlexStartColumn>
                                    <FlexStartColumn gap="15px">
                                        <Checkbox
                                            name="du"
                                            label="DU - Dry Unit"
                                            readOnly=""
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={quoteData.du}
                                        />
                                        <Checkbox
                                            name="sb"
                                            label="SB - Super B"
                                            readOnly=""
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={quoteData.sb}
                                        />
                                        <Checkbox
                                            name="rl"
                                            label="RL - Rail"
                                            readOnly=""
                                            type="checkbox"
                                            onChange={handleCheckbox}
                                            checked={quoteData.rl}
                                        />
                                    </FlexStartColumn>
                                </FlexStartRow>
                            </SplitPanel>
                        </FlexStartRow>
                        <FlexStartRow>
                            <SplitPanel class="border-right-grey padding-right-25">
                                <FlexStartRow>
                                    <SplitPanel class="border-right-grey padding-right-25">
                                        <FlexStartColumn gap="5px">
                                            <Input
                                                name="freightReady"
                                                placeholder=""
                                                label="Ready Date / Time:"
                                                size="input-md"
                                                type="text"
                                                value={quoteData.freightReady}
                                                readOnly=""
                                                onChange={handleChange}
                                            />
                                            <Input
                                                name="pickupAppointment"
                                                placeholder=""
                                                label="Pick-up Appointment:"
                                                size="input-md"
                                                type="text"
                                                value={quoteData.pickupAppointment}
                                                readOnly=""
                                                onChange={handleChange}
                                            />
                                            <Input
                                                name="deliveryAppointment"
                                                placeholder=""
                                                label="Delivery Appointment:"
                                                size="input-md"
                                                type="text"
                                                value={quoteData.deliveryAppointment}
                                                readOnly=""
                                                onChange={handleChange}
                                            />
                                        </FlexStartColumn>
                                    </SplitPanel>
                                    <SplitPanel>
                                        <FlexStartColumn gap="5px">
                                            <Input
                                                name="deliveryEta"
                                                placeholder=""
                                                label="ETA:"
                                                size="input-md"
                                                type="text"
                                                value={quoteData.deliveryEta}
                                                readOnly=""
                                                onChange={handleChange}
                                            />
                                            <Input
                                                name="sbBroker"
                                                placeholder=""
                                                label="SB Broker:"
                                                size="input-md"
                                                type="text"
                                                value={quoteData.sbBroker}
                                                readOnly=""
                                                onChange={handleChange}
                                            />
                                            <Input
                                                name="nbBroker"
                                                placeholder=""
                                                label="NB Broker:"
                                                size="input-md"
                                                type="text"
                                                value={quoteData.nbBroker}
                                                readOnly=""
                                                onChange={handleChange}
                                            />
                                        </FlexStartColumn>
                                    </SplitPanel>
                                </FlexStartRow>
                            </SplitPanel>
                            <SplitPanel>
                                <FormHeading
                                    title="Special Notes"
                                />
                                <TextArea
                                    name="quoteNotes"
                                    size="input-lg"
                                    value={quoteData.quoteNotes}
                                    onChange={handleChange}
                                />
                            </SplitPanel>
                        </FlexStartRow>
                    </div>
                    <div className={shipmentDetails ? "quote-body" : "quote-body quote-body-hidden"}>
                        <FlexStartRow class="border-bottom-grey">
                            <SplitPanel class="border-right-grey padding-right-25">
                                <div className="dimension-calculator">
                                    <FormHeading
                                        title="Shipment Details"
                                        headingControl="Calculate CUFT"
                                        onClick={calculateCUFT}
                                    />
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l1"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l1}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w1"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w1}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h1"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h1}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c1"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c1}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft1"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft1}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l2"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l2}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w2"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w2}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h2"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h2}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c2"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c2}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft2"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft2}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l3"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l3}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w3"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w3}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h3"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h3}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c3"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c3}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft3"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft3}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l4"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l4}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w4"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w4}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h4"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h4}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c4"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c4}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft4"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft4}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l5"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l5}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w5"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w5}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h5"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h5}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c5"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c5}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft5"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft5}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l6"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l6}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w6"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w6}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h6"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h6}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c6"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c6}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft6"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft6}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l7"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l7}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w7"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w7}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h7"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h7}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c7"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c7}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft7"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft7}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l8"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l8}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w8"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w8}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h8"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h8}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c8"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c8}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft8"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft8}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l9"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l9}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w9"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w9}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h9"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h9}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c9"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c9}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft9"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft9}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px">
                                        <Input
                                            name="l10"
                                            placeholder="L"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.l10}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="w10"
                                            placeholder="W"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.w10}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="h10"
                                            placeholder="H"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.h10}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="c10"
                                            placeholder="#"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.c10}
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="cuft10"
                                            placeholder="CUFT"
                                            label=""
                                            size="input-xs"
                                            value={quoteData.cuft10}
                                            readOnly={true}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="10px">
                                        <Input
                                            name="totalPieces"
                                            placeholder=""
                                            label="Total Pieces:"
                                            size="input-sm"
                                            value={quoteData.totalPieces}
                                            readOnly={false}
                                            onChange={handleChange}
                                            required={true}
                                        />
                                        <Input
                                            name="totalWeight"
                                            placeholder=""
                                            label="Total Weight:"
                                            size="input-sm"
                                            value={quoteData.totalWeight}
                                            readOnly={false}
                                            onChange={handleChange}
                                            required={true}
                                        />
                                        <Select
                                            name="weightMeasurement"
                                            placeholder=""
                                            label="-"
                                            size="input-sm"
                                            value={quoteData.weightMeasurement}
                                            readOnly={false}
                                            onChange={handleChange}
                                            style={{
                                                color: "transparent",
                                                fontSize: "0.65rem",
                                                marginLeft: "5px",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            <option value="lbs">lbs.</option>
                                            <option value="kgs">kgs.</option>
                                        </Select>
                                        <Input
                                            name="totalCUFT"
                                            placeholder=""
                                            label="Total CUFT:"
                                            size="input-sm"
                                            value={quoteData.totalCUFT}
                                            readOnly={true}
                                            onChange={handleChange}
                                            style={{ "textAlign": "right" }}
                                        />
                                    </FlexStartRow>
                                </div>
                            </SplitPanel>
                            <SplitPanel class="padding-right-25">
                                <FlexStartColumn gap="15px">
                                    <FlexStartRow gap="15px">
                                        <Input
                                            name="commodity"
                                            placeholder=""
                                            label="Commodity:"
                                            size="input-lg"
                                            type="text"
                                            value={quoteData.commodity}
                                            readOnly=""
                                            onChange={handleChange}
                                            required={true}
                                        />
                                        <Select
                                            name="temp"
                                            label="Temp / Dry:"
                                            size="input-md"
                                            onChange={handleChange}
                                            value={quoteData.temp}
                                        >
                                            <option value="Dry">Dry</option>
                                            <option value="Temp-Controlled">Temp-Controlled</option>
                                        </Select>
                                        <Input
                                            name="temperature"
                                            placeholder=""
                                            label="Temp:"
                                            size="input-sm"
                                            type="text"
                                            value={quoteData.temperature}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="5px" class="border-bottom-black">
                                        <Select
                                            name="isStackable"
                                            label="Stackable?:"
                                            size="input-md"
                                            onChange={handleChange}
                                            value={quoteData.isStackable}
                                        >
                                            <option value={true}>Stackable</option>
                                            <option value={false}>Non-Stackable</option>
                                        </Select>
                                        <Select
                                            name="isTarpRequired"
                                            label="Tarp?:"
                                            size="input-md"
                                            onChange={handleChange}
                                            value={quoteData.isTarpRequired}
                                        >
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Select>
                                        <Select
                                            name="isPowerTailgateRequired"
                                            label="Power Tailgate?:"
                                            size="input-md"
                                            onChange={handleChange}
                                            value={quoteData.isPowerTailgateRequired}
                                        >
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Select>
                                        <Select
                                            name="isTeamRequired"
                                            label="Team Required?:"
                                            size="input-md"
                                            onChange={handleChange}
                                            value={quoteData.isTeamRequired}
                                        >
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </Select>
                                    </FlexStartRow>
                                    <FormHeading
                                        title="Dangerous Goods:"
                                    />
                                    <FlexStartRow gap="15px">
                                        <Input
                                            name="un"
                                            placeholder=""
                                            label="UN#:"
                                            size="input-sm"
                                            type="text"
                                            value={quoteData.un}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="class"
                                            placeholder=""
                                            label="Class:"
                                            size="input-sm"
                                            type="text"
                                            value={quoteData.class}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="pg"
                                            placeholder=""
                                            label="PG:"
                                            size="input-sm"
                                            type="text"
                                            value={quoteData.pg}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                    </FlexStartRow>
                                    <FlexStartRow gap="15px" class="border-bottom-black">
                                        <Input
                                            name="dgDescription"
                                            placeholder=""
                                            label="Description:"
                                            size="input-md"
                                            type="text"
                                            value={quoteData.dgDescription}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="emergencyContact"
                                            placeholder=""
                                            label="Emergency Contact"
                                            size="input-md"
                                            type="text"
                                            value={quoteData.emergencyContact}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                    </FlexStartRow>
                                    <FormHeading
                                        title="PO & Reference Numbers:"
                                    />
                                    <FlexStartRow gap="15px">
                                        <Input
                                            name="poNumber"
                                            placeholder=""
                                            label="PO #:"
                                            size="input-md"
                                            type="text"
                                            value={quoteData.poNumber}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="soNumber"
                                            placeholder=""
                                            label="SO #:"
                                            size="input-md"
                                            type="text"
                                            value={quoteData.soNumber}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="referenceNumber"
                                            placeholder=""
                                            label="Ref #:"
                                            size="input-md"
                                            type="text"
                                            value={quoteData.referenceNumber}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                        <Input
                                            name="invoiceNumber"
                                            placeholder=""
                                            label="Inv#:"
                                            size="input-md"
                                            type="text"
                                            value={quoteData.invoiceNumber}
                                            readOnly=""
                                            onChange={handleChange}
                                        />
                                    </FlexStartRow>
                                </FlexStartColumn>
                            </SplitPanel>
                        </FlexStartRow>
                    </div>
                    <div className={costingDetails ? "quote-body" : "quote-body quote-body-hidden"}>
                        <FormHeading
                            title="GoodLanes Filters"
                        />
                        <FlexStartRow class="border-bottom-black">
                            <SplitPanel class="border-right-grey padding-right-25">
                                <FormHeading
                                    title="Pick-up"
                                />
                                <FlexStartRow gap="15px">
                                    <Input
                                        name="glPickupCity"
                                        placeholder=""
                                        label="City:"
                                        size="input-lg"
                                        type="text"
                                        value={quoteData.glPickupCity}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name="glPickupState"
                                        placeholder=""
                                        label="State:"
                                        size="input-sm"
                                        type="text"
                                        value={quoteData.glPickupState}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name="glPickupCountry"
                                        placeholder=""
                                        label="Country:"
                                        size="input-md"
                                        type="text"
                                        value={quoteData.glPickupCountry}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                </FlexStartRow>
                            </SplitPanel>
                            <SplitPanel class="padding-right-25">
                                <FormHeading
                                    title="Delivery"
                                />
                                <FlexStartRow gap="15px">
                                    <Input
                                        name="glDeliveryCity"
                                        placeholder=""
                                        label="City:"
                                        size="input-lg"
                                        type="text"
                                        value={quoteData.glDeliveryCity}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name="glDeliveryState"
                                        placeholder=""
                                        label="State:"
                                        size="input-sm"
                                        type="text"
                                        value={quoteData.glDeliveryState}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name="glDeliveryCountry"
                                        placeholder=""
                                        label="Country:"
                                        size="input-md"
                                        type="text"
                                        value={quoteData.glDeliveryCountry}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                </FlexStartRow>
                            </SplitPanel>
                        </FlexStartRow>
                    </div>
                    <div className={carrierCosting ? "quote-body" : "quote-body quote-body-hidden"}>
                        <FormHeading
                            title="Carrier Rates"
                            headingControl="Add Rates"
                            onClick={toggleCarrierRates}
                        />
                        <CarrierRateTable
                            data={carrierQuoteData}
                            deleteClick={openDeleteModal}
                            searchClick={openCarrierRatesModal}
                        />
                    </div>
                    <FolderPanel class="folder-panel">
                        <FlexStartColumn>
                            <FolderButton
                                class={shipmentHeader ? "folder-button folder-button-active" : "folder-button"}
                                onClick={shipmentHeaderClick}
                                label="Shipment Header"
                            />
                            <FolderButton
                                class={shipmentDetails ? "folder-button folder-button-active" : "folder-button"}
                                type="button"
                                onClick={shipmentDetailsClick}
                                label="Shipment Details"
                            />
                            <FolderButton
                                class={carrierCosting ? "folder-button folder-button-active" : "folder-button"}
                                type="button"
                                onClick={carrierCostingClick}
                                label="Carrier Costing"
                                visible={props.carrierCosting ? { "display": "block" } : { "display": "none" }}
                            />
                            <FolderButton
                                class={costingDetails ? "folder-button folder-button-active" : "folder-button"}
                                type="button"
                                onClick={costingDetailsClick}
                                label="Costing Details"
                            />
                        </FlexStartColumn>
                        <FlexBox
                            alignItems="center"
                            gap="5px"
                            direction="column"
                            justify="flex-end"
                        >
                            <UtilityButton
                                type="button"
                                label="Add Address"
                                onClick={openAddAddressModal}
                                img=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                            />
                            {props.saveAndExit &&
                                <UtilityButton
                                    type="button"
                                    label="Save & Exit"
                                    onClick={saveAndExitClick}
                                    img=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy" viewBox="0 0 16 16">
                                        <path d="M11 2H9v3h2V2Z" />
                                        <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z" />
                                    </svg>
                                />
                            }
                            <SubmitButton
                                type="submit"
                                label="Save"
                                img=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy" viewBox="0 0 16 16">
                                    <path d="M11 2H9v3h2V2Z" />
                                    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z" />
                                </svg>
                            />
                        </FlexBox>
                    </FolderPanel>
                </div>
            </form>
        </>
    )
}

export default QuoteForm;
