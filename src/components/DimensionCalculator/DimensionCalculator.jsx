import React, { useState } from "react";
import "./DimensionCalculator.css";
import { FormHeading } from "../Heading/Heading";

function DimensionCalculator(props) {
    const [cuft, setCuft] = useState({
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
        totalPieces: "",
        totalWeight: "",
        weightMeasurement: "",
        totalCUFT: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setCuft(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleClick() {
        const totalCUFT = ((cuft.cuft1 + cuft.cuft2 + cuft.cuft3 + cuft.cuft4 + cuft.cuft5 + cuft.cuft6 + cuft.cuft7 + cuft.cuft8 + cuft.cuft9 + cuft.cuft10) / 1728).toFixed(2);

        setCuft(prevValue => {
            return {
                ...prevValue,
                cuft1: cuft.l1 * cuft.w1 * cuft.h1 * cuft.c1,
                cuft2: cuft.l2 * cuft.w2 * cuft.h2 * cuft.c2,
                cuft3: cuft.l3 * cuft.w3 * cuft.h3 * cuft.c3,
                cuft4: cuft.l4 * cuft.w4 * cuft.h4 * cuft.c4,
                cuft5: cuft.l5 * cuft.w5 * cuft.h5 * cuft.c5,
                cuft6: cuft.l6 * cuft.w6 * cuft.h6 * cuft.c6,
                cuft7: cuft.l7 * cuft.w7 * cuft.h7 * cuft.c7,
                cuft8: cuft.l8 * cuft.w8 * cuft.h8 * cuft.c8,
                cuft9: cuft.l9 * cuft.w9 * cuft.h9 * cuft.c9,
                cuft10: cuft.l10 * cuft.w10 * cuft.h10 * cuft.c10,
                totalCUFT: totalCUFT,
            }
        });
    }

    return (
        <div className="dimension-calculator">
            <FormHeading
                title="Shipment Details"
                headingControl="Calculate CUFT"
                onClick={handleClick}
            />
            <div className="flex-start-row gap-5">
                <input
                    name="l1"
                    placeholder="L"
                    value={cuft.l1}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w1"
                    placeholder="W"
                    value={cuft.w1}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h1"
                    placeholder="H"
                    value={cuft.h1}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c1"
                    placeholder="#"
                    value={cuft.c1}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft1"
                    placeholder="CUFT"
                    value={cuft.cuft1}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <input
                    name="l2"
                    placeholder="L"
                    value={cuft.l2}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w2"
                    placeholder="W"
                    value={cuft.w2}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h2"
                    placeholder="H"
                    value={cuft.h2}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c2"
                    placeholder="#"
                    value={cuft.c2}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft2"
                    placeholder="CUFT"
                    value={cuft.cuft2}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <input
                    name="l3"
                    placeholder="L"
                    value={cuft.l3}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w3"
                    placeholder="W"
                    value={cuft.w3}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h3"
                    placeholder="H"
                    value={cuft.h3}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c3"
                    placeholder="#"
                    value={cuft.c3}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft3"
                    placeholder="CUFT"
                    value={cuft.cuft3}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <input
                    name="l4"
                    placeholder="L"
                    value={cuft.l4}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w4"
                    placeholder="W"
                    value={cuft.w4}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h4"
                    placeholder="H"
                    value={cuft.h4}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c4"
                    placeholder="#"
                    value={cuft.c4}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft4"
                    placeholder="CUFT"
                    value={cuft.cuft4}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <input
                    name="l5"
                    placeholder="L"
                    value={cuft.l5}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w5"
                    placeholder="W"
                    value={cuft.w5}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h5"
                    placeholder="H"
                    value={cuft.h5}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c5"
                    placeholder="#"
                    value={cuft.c5}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft5"
                    placeholder="CUFT"
                    value={cuft.cuft5}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <input
                    name="l6"
                    placeholder="L"
                    value={cuft.l6}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w6"
                    placeholder="W"
                    value={cuft.w6}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h6"
                    placeholder="H"
                    value={cuft.h6}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c6"
                    placeholder="#"
                    value={cuft.c6}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft6"
                    placeholder="CUFT"
                    value={cuft.cuft6}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <input
                    name="l7"
                    placeholder="L"
                    value={cuft.l7}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w7"
                    placeholder="W"
                    value={cuft.w7}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h7"
                    placeholder="H"
                    value={cuft.h7}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c7"
                    placeholder="#"
                    value={cuft.c7}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft7"
                    placeholder="CUFT"
                    value={cuft.cuft7}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <input
                    name="l8"
                    placeholder="L"
                    value={cuft.l8}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w8"
                    placeholder="W"
                    value={cuft.w8}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h8"
                    placeholder="H"
                    value={cuft.h8}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c8"
                    placeholder="#"
                    value={cuft.c8}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft8"
                    placeholder="CUFT"
                    value={cuft.cuft8}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <input
                    name="l9"
                    placeholder="L"
                    value={cuft.l9}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w9"
                    placeholder="W"
                    value={cuft.w9}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h9"
                    placeholder="H"
                    value={cuft.h9}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c9"
                    placeholder="#"
                    value={cuft.c9}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft9"
                    placeholder="CUFT"
                    value={cuft.cuft9}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <input
                    name="l10"
                    placeholder="L"
                    value={cuft.l10}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="w10"
                    placeholder="W"
                    value={cuft.w10}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="h10"
                    placeholder="H"
                    value={cuft.h10}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="c10"
                    placeholder="#"
                    value={cuft.c10}
                    className="input-xs"
                    onChange={handleChange}
                />
                <input
                    name="cuft10"
                    placeholder="CUFT"
                    value={cuft.cuft10}
                    className="input-xs"
                    readOnly={true}
                    style={{ "textAlign": "right" }}
                />
            </div>
            <div className="flex-start-row gap-5">
                <div className="input-md">
                    <label>Total Pieces:</label>
                    <input
                        name="totalPieces"
                        placeholder=""
                        value={cuft.totalPieces}
                        readOnly={false}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-md">
                    <label>Total Weight:</label>
                    <input
                        name="totalWeight"
                        placeholder=""
                        value={cuft.totalWeight}
                        readOnly={false}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-sm">
                    <label
                        style={{ "color": "transparent" }}
                    >*</label>
                    <select
                        name="weightMeasurement"
                        placeholder=""
                        value={cuft.weightMeasurement}
                        readOnly={false}
                        onChange={handleChange}
                    >
                        <option value="lbs">lbs.</option>
                        <option value="kgs">kgs.</option>
                    </select>
                </div>
                <div className="input-md">
                    <label>Total CUFT:</label>
                    <input
                        name="totalCUFT"
                        placeholder=""
                        value={cuft.totalCUFT}
                        readOnly={false}
                        onChange={handleChange}
                        style={{ "textAlign": "right" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default DimensionCalculator;
