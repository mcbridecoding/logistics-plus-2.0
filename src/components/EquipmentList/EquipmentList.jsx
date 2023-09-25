import React, { useState } from "react";
import "./EquipmentList.css";
import { FormHeading } from "../Heading/Heading";

function EquipmentList(props) {
    const [checked, toggleChecked] = useState({
        dv: false,
        rf: false,
        du: false,
        fd: false,
        sd: false,
        sb: false,
        dd: false,
        fu: false,
        rl: false
    });

    function handleChange(event) {
        const { name, checked } = event.target;

        toggleChecked((prevValue) => {
            return {
                ...prevValue,
                [name]: checked
            }          
        });
    }
    
    return (
        <div className="equipment-list border-bottom-grey">
            <FormHeading
                title="Equipment Required:"
            />
            <div className="flex-start-row">
                <div className="flex-start-column gap-15">
                    <div className="checkbox-container">
                        <input
                            name="dv"
                            readOnly=""
                            type="checkbox"
                            onChange={handleChange}
                            checked={checked.dv}
                        />
                        <label>DV - Dry Van</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            name="fd"
                            readOnly=""
                            type="checkbox"
                            onChange={handleChange}
                            checked={checked.fd}
                        />
                        <label>FD - Flat Deck</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            name="dd"
                            readOnly=""
                            type="checkbox"
                            onChange={handleChange}
                            checked={checked.dd}
                        />
                        <label>DD - Dbl Drop</label>
                    </div>
                </div>
                <div className="flex-start-column gap-15">
                    <div className="checkbox-container">
                        <input
                            name="rf"
                            readOnly=""
                            type="checkbox"
                            onChange={handleChange}
                            checked={checked.rf}
                        />
                        <label>RF - Reefer Unit</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            name="sd"
                            readOnly=""
                            type="checkbox"
                            onChange={handleChange}
                            checked={checked.sd}
                        />
                        <label>SD - Step Deck</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            name="fu"
                            readOnly=""
                            type="checkbox"
                            onChange={handleChange}
                            checked={checked.fu}
                        />
                        <label>FU - Flat Unit</label>
                    </div>
                </div>
                <div className="flex-start-column gap-15">
                    <div className="checkbox-container">
                        <input
                            name="du"
                            readOnly=""
                            type="checkbox"
                            onChange={handleChange}
                            checked={checked.du}
                        />
                        <label>DU - Dry Unit</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            name="sb"
                            readOnly=""
                            type="checkbox"
                            onChange={handleChange}
                            checked={checked.sb}
                        />
                        <label>SB - Super B</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            name="rl"
                            readOnly=""
                            type="checkbox"
                            onChange={handleChange}
                            checked={checked.rl}
                        />
                        <label>RL - Rail</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EquipmentList;
