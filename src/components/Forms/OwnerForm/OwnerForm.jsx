import React, { useState, useEffect } from "react";
import "./OwnerForm.css"
import { FormHeading, HeadingSmall } from "../../Heading/Heading";
import { FlexStartRow, SplitPanel } from "../../FlexBox/FlexBox";
import Input from "../../InputElements/Input/Input";
import axios from 'axios';

function OwnerForm(props) {
    const [isReadOnly, setReadOnly] = useState(true);

    const [ownerData, setOwnerData] = useState({
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
        email: ""
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const ENDPOINT = ('/api/defaults');
        axios(ENDPOINT)
            .then(res => {
                setOwnerData({
                    company: res.data.owner.company,
                    attention: res.data.owner.attention,
                    addressOne: res.data.owner.addressOne,
                    addressTwo: res.data.owner.addressTwo,
                    city: res.data.owner.city,
                    state: res.data.owner.state,
                    postal: res.data.owner.postal,
                    country: res.data.owner.country,
                    phone: res.data.owner.phone,
                    fax: res.data.owner.fax,
                    email: res.data.owner.email
                });
            })
            .catch(err => {
                console.log(`An Error Happened: ${err}`);
            })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setOwnerData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function toggleReadOnly() {
        setReadOnly(!isReadOnly);
    }

    return (
        <form id="" action="#" method="post">
            <div className="owner-frame">
                <HeadingSmall
                    title="Owner:"
                    secondaryTitle="Edit"
                    toggleReadOnly={toggleReadOnly}
                />
                <FlexStartRow gap="25px">
                    <SplitPanel class="border-right-grey padding-right-25">
                        <FlexStartRow gap="25px">
                            <Input
                                name="company"
                                placeholder=""
                                label="Company:"
                                size="input-xl"
                                type="text"
                                value={ownerData.company}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                            <Input
                                name="attention"
                                placeholder=""
                                label="Attention:"
                                size="input-xl"
                                type="text"
                                value={ownerData.attention}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                        </FlexStartRow>
                        <FlexStartRow gap="25px">
                            <Input
                                name="addressOne"
                                placeholder=""
                                label="Address 1:"
                                size="input-md"
                                type="text"
                                value={ownerData.addressOne}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                            <Input
                                name="addressTwo"
                                placeholder=""
                                label="Address 2:"
                                size="input-md"
                                type="text"
                                value={ownerData.addressTwo}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                        </FlexStartRow>
                        <FlexStartRow gap="25px">
                            <Input
                                name="city"
                                placeholder=""
                                label="City:"
                                size="input-md"
                                type="text"
                                value={ownerData.city}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                            <Input
                                name="state"
                                placeholder=""
                                label="State:"
                                size="input-sm"
                                type="text"
                                value={ownerData.state}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                            <Input
                                name="postal"
                                placeholder=""
                                label="Postal:"
                                size="input-sm"
                                type="text"
                                value={ownerData.postal}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                            <Input
                                name="country"
                                placeholder=""
                                label="Country:"
                                size="input-sm"
                                type="text"
                                value={ownerData.country}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                        </FlexStartRow>
                        <FlexStartRow gap="25px">
                            <Input
                                name="phone"
                                placeholder=""
                                label="Phone:"
                                size="input-sm"
                                type="text"
                                value={ownerData.phone}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                            <Input
                                name="fax"
                                placeholder=""
                                label="Fax:"
                                size="input-md"
                                type="text"
                                value={ownerData.fax}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                            <Input
                                name="email"
                                placeholder=""
                                label="Email:"
                                size="input-xl"
                                type="text"
                                value={ownerData.email}
                                onChange={handleChange}
                                readOnly={isReadOnly}
                            />
                        </FlexStartRow>
                    </SplitPanel>
                    <SplitPanel class="padding-right-25">
                        <FormHeading
                            title="Taxes"
                        />
                        <Input
                            name="pst"
                            placeholder=""
                            label="PST (%):"
                            size="input-xl"
                            type="text"
                            value=""
                            readOnly={isReadOnly}
                        />
                        <Input
                            name="gst"
                            placeholder=""
                            label="GST (%):"
                            size="input-xl"
                            type="text"
                            value=""
                            readOnly={isReadOnly}
                        />
                    </SplitPanel>
                </FlexStartRow>
            </div>
        </form>
    );
}

export default OwnerForm