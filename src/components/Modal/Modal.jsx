import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import UtilityButton, { SubmitButton } from "../Buttons/UtilityButton/UtilityButton";
import Input from "../InputElements/Input/Input";
import Select from "../InputElements/Select/Select";
import TextArea from "../InputElements/TextArea/TextArea";
import { FormHeading } from "../Heading/Heading";
import FlexBox, { FlexStartColumn, FlexStartRow, FlexEndRow, SplitPanel } from "../FlexBox/FlexBox";
import axios from "axios";
import "./Modal.css"

function AddAddressModal(props) {
    const [data, setData] = useState({
        company: "",
        attention: "",
        addressOne: "",
        addressTwo: "",
        city: "",
        state: "",
        postal: "",
        country: "",
        phone: "",
        fax: "",
        email: "",
    });

    const [isHidden, toggleHidden] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const refreshData = () => props.refreshData();
        const closeModal = () => props.closeModal();

        const ENDPOINT = ("/api/addressbook/add-contact")
        axios.post(ENDPOINT, { data })
            .then(res => {
                toggleHidden(!isHidden);
                refreshData();
                setInterval(() => { closeModal() }, 3000);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="add-address-modal">
                {isHidden &&
                    <FlexBox
                        alignItems="center"
                        direction="row"
                        gap="1rem"
                        justify="space-evenly"
                        padding="1rem"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                        </svg>
                        <h2>Successfully added contact!</h2>
                    </FlexBox>
                }
                {!isHidden &&
                    <FlexStartColumn gap="15px">
                        <FormHeading
                            title="Add Contact Information"
                            headingControl=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            onClick={props.closeModal}
                        />
                        {props.children}
                        <FlexStartRow gap="15px">
                            <Input
                                name="company"
                                placeholder=""
                                label="Company:"
                                size="input-lg"
                                type="text"
                                value={data.company}
                                onChange={handleChange}
                                required={true}
                            />
                            <Input
                                name="attention"
                                placeholder=""
                                label="Attention:"
                                size="input-md"
                                type="text"
                                value={data.attention}
                                onChange={handleChange}
                                required={true}
                            />
                        </FlexStartRow>
                        <FlexStartRow gap="15px">
                            <Input
                                name="addressOne"
                                placeholder=""
                                label="Address: 1"
                                size="input-lg"
                                type="text"
                                value={data.addressOne}
                                onChange={handleChange}
                                required={true}
                            />
                            <Input
                                name="addressTwo"
                                placeholder=""
                                label="Address 2:"
                                size="input-lg"
                                type="text"
                                value={data.addressTwo}
                                onChange={handleChange}
                                required={true}
                            />
                        </FlexStartRow>
                        <FlexStartRow gap="15px">
                            <Input
                                name="city"
                                placeholder=""
                                label="City:"
                                size="input-md"
                                type="text"
                                value={data.city}
                                onChange={handleChange}
                                required={true}
                            />
                            <Input
                                name="state"
                                placeholder=""
                                label="State:"
                                size="input-sm"
                                type="text"
                                value={data.state}
                                onChange={handleChange}
                                required={true}
                            />
                            <Input
                                name="postal"
                                placeholder=""
                                label="Postal:"
                                size="input-sm"
                                type="text"
                                value={data.postal}
                                onChange={handleChange}
                                required={true}
                            />
                            <Input
                                name="country"
                                placeholder=""
                                label="Country:"
                                size="input-sm"
                                type="text"
                                value={data.country}
                                onChange={handleChange}
                                required={true}
                            />
                        </FlexStartRow>
                        <FlexStartRow gap="15px" class="border-bottom-grey">
                            <Input
                                name="phone"
                                placeholder=""
                                label="Phone:"
                                size="input-sm"
                                type="text"
                                value={data.phone}
                                onChange={handleChange}
                                required={true}
                            />
                            <Input
                                name="fax"
                                placeholder=""
                                label="Fax:"
                                size="input-sm"
                                type="text"
                                value={data.fax}
                                onChange={handleChange}
                                required={true}
                            />
                            <Input
                                name="email"
                                placeholder=""
                                label="Email:"
                                size="input-sm"
                                type="text"
                                value={data.email}
                                onChange={handleChange}
                                required={true}
                            />
                        </FlexStartRow>
                        <FlexEndRow gap="15px">
                            <SubmitButton
                                label="Submit"
                            />
                            <UtilityButton
                                type="button"
                                label="Cancel"
                                onClick={props.closeModal}
                            />
                        </FlexEndRow>
                    </FlexStartColumn>
                }

            </div>
        </form>
    )
}

function AddCarrierRatesModal(props) {
    const [data, setData] = useState({
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

    useEffect(() => {
        setData(props.data);
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const onClick = () => props.onClick()

        axios.post(props.post, { data })
            .then(res => {
                console.log(res);
                onClick();
                setData(prevValue => {
                    return {
                        ...prevValue,
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
                    }
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Draggable>
            <form onSubmit={handleSubmit}>
                <div className="modal-moveable">
                    <FlexStartColumn gap="5px">
                        <FormHeading
                            title="Add Carrier Rates"
                            headingControl=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            onClick={props.closeModal}
                        />
                        <FlexStartRow class="border-bottom-grey">
                            <SplitPanel class="padding-right-25 border-right-grey">
                                <FlexStartRow gap="15px">
                                    <Input
                                        name="name"
                                        label="Name:"
                                        size="input-md"
                                        placeholder=""
                                        type="text"
                                        value={data.name}
                                        readOnly=""
                                        onChange={handleChange}
                                        required={true}
                                    />
                                    <Input
                                        name="quoteNumber"
                                        label="Quote #:"
                                        size="input-md"
                                        placeholder=""
                                        type="text"
                                        value={data.quoteNumber}
                                        readOnly={true}
                                        onChange={handleChange}
                                        required={false}
                                    />
                                    <Input
                                        name="date"
                                        label="Date:"
                                        size="input-md"
                                        placeholder=""
                                        type="date"
                                        value={data.date}
                                        readOnly=""
                                        onChange={handleChange}
                                        required={false}
                                    />
                                </FlexStartRow>
                            </SplitPanel>
                            <SplitPanel>
                                <FlexStartRow gap="15px">
                                    <Input
                                        name="fromCity"
                                        label="From City:"
                                        size="input-md"
                                        placeholder=""
                                        type="text"
                                        value={data.fromCity}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name="fromState"
                                        label="From State:"
                                        size="input-sm"
                                        placeholder=""
                                        type="text"
                                        value={data.fromState}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name="toCity"
                                        label="To City:"
                                        size="input-md"
                                        placeholder=""
                                        type="text"
                                        value={data.toCity}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name="toState"
                                        label="To State:"
                                        size="input-sm"
                                        placeholder=""
                                        type="text"
                                        value={data.toState}
                                        readOnly=""
                                        onChange={handleChange}
                                    />
                                </FlexStartRow>
                            </SplitPanel>
                        </FlexStartRow>
                        <FlexStartRow gap="15px">
                            <Input
                                name="dispatchName"
                                label="Dispatch Name:"
                                size="input-md"
                                placeholder=""
                                type="text"
                                value={data.dispatchName}
                                readOnly=""
                                onChange={handleChange}
                            />
                            <Input
                                name="carrierName"
                                label="Carrier Name:"
                                size="input-md"
                                placeholder=""
                                type="text"
                                value={data.carrierName}
                                readOnly=""
                                onChange={handleChange}
                            />
                            <Input
                                name="carrierPhoneNumber"
                                placeholder=""
                                label="Phone #:"
                                size="input-sm"
                                type="text"
                                value={data.carrierPhoneNumber}
                                readOnly=""
                                onChange={handleChange}
                            />
                            <Select
                                name="carrierEquipment"
                                label="Equipment"
                                size="input-sm"
                                onChange={handleChange}
                                value={data.carrierEquipment}
                            >
                                <option value=""></option>
                                <option value="DV">DV - Dry Van</option>
                                <option value="RF">RF - Reefer Unit</option>
                                <option value="DU">DU - Dry Unit</option>
                                <option value="FD">FD - Flat Deck</option>
                                <option value="SD">SD - Step Deck</option>
                                <option value="SB">SB - Super B</option>
                                <option value="DD">DD - Double Drop</option>
                                <option value="FU">FU - Flat Unit</option>
                                <option value="RL">RL - Intermodal Unit</option>
                            </Select>
                        </FlexStartRow>
                        <FlexStartRow class="border-bottom-grey" gap="15px">
                            <Input
                                name="asked"
                                placeholder=""
                                label="Asked:"
                                size="input-md"
                                type="text"
                                value={data.asked}
                                readOnly=""
                                onChange={handleChange}
                            />
                            <Input name="quoted"
                                placeholder=""
                                label="Quoted:"
                                size="input-md"
                                type="text"
                                value={data.quoted}
                                readOnly=""
                                onChange={handleChange} />
                            <Select
                                name="quoteCurrency"
                                label="Currency:"
                                size="input-sm"
                                onChange={handleChange}
                                value={data.quoteCurrency}
                            >
                                <option value="CDN">CDN</option>
                                <option value="USD">USD</option>
                            </Select>
                            <Input
                                name="carrierQuoteNumber"
                                placeholder=""
                                label="Quote #:"
                                size="input-sm"
                                type="text"
                                value={data.carrierQuoteNumber}
                                readOnly=""
                                onChange={handleChange}
                            />
                        </FlexStartRow>
                        <FlexStartRow gap="15px">
                            <Input
                                name="carrierTruckNumber"
                                placeholder=""
                                label="Truck #:"
                                size="input-sm"
                                type="text"
                                value={data.carrierTruckNumber}
                                readOnly=""
                                onChange={handleChange} />
                            <Input
                                name="carrierTrailerNumber"
                                placeholder=""
                                label="Trailer #:"
                                size="input-sm"
                                type="text"
                                value={data.carrierTrailerNumber}
                                readOnly=""
                                onChange={handleChange} />
                            <Input
                                name="pickupDate"
                                placeholder=""
                                label="Pick-up Date:"
                                size="input-sm"
                                type="text"
                                value={data.pickupDate}
                                readOnly=""
                                onChange={handleChange} />
                            <Input
                                name="deliveryDate"
                                placeholder=""
                                label="Delivery Date:"
                                size="input-sm"
                                type="text"
                                value={data.deliveryDate}
                                readOnly=""
                                onChange={handleChange} />
                            <Input
                                name="parsPaps"
                                placeholder=""
                                label="PAPS / PARS:"
                                size="input-sm"
                                type="text"
                                value={data.parsPaps}
                                readOnly=""
                                onChange={handleChange}
                            />
                            <Input
                                name="crossing"
                                placeholder=""
                                label="Crossing:"
                                size="input-sm"
                                type="text"
                                value={data.crossing}
                                readOnly=""
                                onChange={handleChange}
                            />
                        </FlexStartRow>
                        <FlexStartRow gap="15px" class="border-bottom-grey">
                            <TextArea
                                name="notes"
                                label="Notes"
                                size="input-lg"
                                value={data.notes}
                                onChange={handleChange}
                            />
                        </FlexStartRow>
                        <FlexEndRow gap="15px">
                            <SubmitButton
                                label="Submit"
                            />
                            <UtilityButton
                                type="button"
                                label="Cancel"
                                onClick={props.closeModal}
                            />
                        </FlexEndRow>
                    </FlexStartColumn>
                </div>
            </form>
        </Draggable>
    )
}

function DeleteModal(props) {
    return (
        <div className="delete-modal">
            <FlexStartColumn gap="15px">
                <FormHeading
                    title="Delete Record?"
                    headingControl=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    onClick={props.closeModal}
                />
                <FlexStartRow class="border-bottom-grey">
                    <h3>Are you sure you would like to delete this record?</h3>
                </FlexStartRow>
                <FlexEndRow gap="10px">
                    <UtilityButton
                        type="button"
                        label="Yes"
                        onClick={props.submitClick}
                    />
                    <UtilityButton
                        type="button"
                        label="No"
                        onClick={props.closeModal}
                    />
                </FlexEndRow>
            </FlexStartColumn>
        </div>
    )
}

function CarrierRatesModal(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.data);
    })

    return (
        <div className="modal">
            <FlexStartColumn gap="5px">
                <FormHeading
                    title="View Carrier Rate"
                    headingControl=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    onClick={props.closeModal}
                />
                <FlexStartRow class="border-bottom-grey">
                    <SplitPanel class="padding-right-25 border-right-grey">
                        <FlexStartRow gap="15px">
                            <Input
                                name="name"
                                label="Name:"
                                size="input-md"
                                placeholder=""
                                type="text"
                                value={data.name}
                                readOnly={true}
                            />
                            <Input
                                name="quoteNumber"
                                label="Quote #:"
                                size="input-md"
                                placeholder=""
                                type="text"
                                value={data.quoteNumber}
                                readOnly={true}
                            />
                            <Input
                                name="date"
                                label="Date:"
                                size="input-md"
                                placeholder=""
                                type="date"
                                value={data.date}
                                readOnly={true}
                            />
                        </FlexStartRow>
                    </SplitPanel>
                    <SplitPanel>
                        <FlexStartRow gap="15px">
                            <Input
                                name="fromCity"
                                label="From City:"
                                size="input-md"
                                placeholder=""
                                type="text"
                                value={data.fromCity}
                                readOnly={true}
                            />
                            <Input
                                name="fromState"
                                label="From State:"
                                size="input-sm"
                                placeholder=""
                                type="text"
                                value={data.fromState}
                                readOnly={true}
                            />
                            <Input
                                name="toCity"
                                label="To City:"
                                size="input-md"
                                placeholder=""
                                type="text"
                                value={data.toCity}
                                readOnly={true}
                            />
                            <Input
                                name="toState"
                                label="To State:"
                                size="input-sm"
                                placeholder=""
                                type="text"
                                value={data.toState}
                                readOnly={true}
                            />
                        </FlexStartRow>
                    </SplitPanel>
                </FlexStartRow>
                <FlexStartRow gap="15px">
                    <Input
                        name="dispatchName"
                        label="Dispatch Name:"
                        size="input-md"
                        placeholder=""
                        type="text"
                        value={data.dispatchName}
                        readOnly={true}
                    />
                    <Input
                        name="carrierName"
                        label="Carrier Name:"
                        size="input-md"
                        placeholder=""
                        type="text"
                        value={data.carrierName}
                        readOnly={true}
                    />
                    <Input
                        name="carrierPhoneNumber"
                        placeholder=""
                        label="Phone #:"
                        size="input-sm"
                        type="text"
                        value={data.carrierPhoneNumber}
                        readOnly={true}
                    />
                    <Select
                        name="carrierEquipment"
                        label="Equipment"
                        size="input-sm"
                        value={data.carrierEquipment}
                        disabled={true}
                    >
                        <option value=""></option>
                        <option value="DV">DV - Dry Van</option>
                        <option value="RF">RF - Reefer Unit</option>
                        <option value="DU">DU - Dry Unit</option>
                        <option value="FD">FD - Flat Deck</option>
                        <option value="SD">SD - Step Deck</option>
                        <option value="SB">SB - Super B</option>
                        <option value="DD">DD - Double Drop</option>
                        <option value="FU">FU - Flat Unit</option>
                        <option value="RL">RL - Intermodal Unit</option>
                    </Select>
                </FlexStartRow>
                <FlexStartRow class="border-bottom-grey" gap="15px">
                    <Input
                        name="asked"
                        placeholder=""
                        label="Asked:"
                        size="input-md"
                        type="text"
                        value={data.asked}
                        readOnly={true}
                    />
                    <Input name="quoted"
                        placeholder=""
                        label="Quoted:"
                        size="input-md"
                        type="text"
                        value={data.quoted}
                        readOnly={true}
                    />
                    <Select
                        name="quoteCurrency"
                        label="Currency:"
                        size="input-sm"
                        value={data.quoteCurrency}
                        disabled={true}
                    >
                        <option value="CDN">CDN</option>
                        <option value="USD">USD</option>
                    </Select>
                    <Input
                        name="carrierQuoteNumber"
                        placeholder=""
                        label="Quote #:"
                        size="input-sm"
                        type="text"
                        value={data.carrierQuoteNumber}
                        readOnly={true}
                    />
                </FlexStartRow>
                <FlexStartRow gap="15px">
                    <Input
                        name="carrierTruckNumber"
                        placeholder=""
                        label="Truck #:"
                        size="input-sm"
                        type="text"
                        value={data.carrierTruckNumber}
                        readOnly={true}
                    />
                    <Input
                        name="carrierTrailerNumber"
                        placeholder=""
                        label="Trailer #:"
                        size="input-sm"
                        type="text"
                        value={data.carrierTrailerNumber}
                        readOnly={true}

                    />
                    <Input
                        name="pickupDate"
                        placeholder=""
                        label="Pick-up Date:"
                        size="input-sm"
                        type="text"
                        value={data.pickupDate}
                        readOnly={true}

                    />
                    <Input
                        name="deliveryDate"
                        placeholder=""
                        label="Delivery Date:"
                        size="input-sm"
                        type="text"
                        value={data.deliveryDate}
                        readOnly={true}
                    />
                    <Input
                        name="parsPaps"
                        placeholder=""
                        label="PAPS / PARS:"
                        size="input-sm"
                        type="text"
                        value={data.parsPaps}
                        readOnly={true}
                    />
                    <Input
                        name="crossing"
                        placeholder=""
                        label="Crossing:"
                        size="input-sm"
                        type="text"
                        value={data.crossing}
                        readOnly={true}
                    />
                </FlexStartRow>
                <FlexStartRow gap="15px" class="border-bottom-grey">
                    <TextArea
                        name="notes"
                        label="Notes"
                        size="input-lg"
                        value={data.notes}
                        readOnly={true}
                    />
                </FlexStartRow>
                <FlexEndRow gap="15px">
                    <UtilityButton
                        type="button"
                        label="Close"
                        onClick={props.closeModal}
                    />
                </FlexEndRow>
            </FlexStartColumn>
        </div>
    )
}

function ErrorModal(props) {
    return (
        <div className="error-modal">
            <div className="error-modal-header">{props.title}</div>
            <div className="error-modal-message">
                {props.message}
            </div>
            <svg onClick={props.closeModal} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </div>
    )
}

export default AddCarrierRatesModal;
export { DeleteModal, AddAddressModal, CarrierRatesModal, ErrorModal }