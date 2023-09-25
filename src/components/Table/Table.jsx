import React from "react";
import "./Table.css"

function QuotesCustomerTable(props) {
    function equipmentList(data) {
        const equipmentList = [];

        if (data.dv) {
            equipmentList.push("DV \t");
        }
        if (data.rf) {
            equipmentList.push("RF \t");
        }
        if (data.du) {
            equipmentList.push("DU \t");
        }
        if (data.fd) {
            equipmentList.push("FD \t");
        }
        if (data.sd) {
            equipmentList.push("SD \t");
        }
        if (data.sb) {
            equipmentList.push("SB \t");
        }
        if (data.dd) {
            equipmentList.push("DD \t");
        }
        if (data.fu) {
            equipmentList.push("FU \t");
        }
        if (data.rl) {
            equipmentList.push("RL \t");
        }

        return equipmentList
    }

    function shipmentDims(data) {
        const shipmentDims = []
        for (let i = 1; i < 10; i++) {
            let l = data[`l${i}`]
            let w = data[`w${i}`]
            let h = data[`h${i}`]
            let c = data[`c${i}`]
            if (data[`l${i}`] === '') {

            } else {
                shipmentDims.push(`${l}" x ${w}" x ${h}" @ ${c}`);
            }
        }

        return shipmentDims
    }

    return (
        <table className="table">
            <thead>
                <tr className="col-align-center">
                    <th className="col-index">#</th>
                    <th className="col-sm">Date</th>
                    <th>Company</th>
                    <th className="col-sm">Quoted</th>
                    <th className="col-sm">Equip.</th>
                    <th className="col-sm">Skids</th>
                    <th className="col-sm">Dims/Feet</th>
                    <th className="col-sm">ST/RK</th>
                    <th className="col-sm">CUFT</th>
                    <th className="col-sm">Lbs.</th>
                    <th className="col-sm">Quote #</th>
                    <th>Carrier</th>
                    <th>Notes</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((data, index) => {
                    return (
                        <tr
                            key={data._id}
                            className=""
                        >
                            <td className="col-index">{index + 1}</td>
                            <td className="col-sm">{data.date.date}</td>
                            <td className="col-lg col-overflow-none">{data.client.company}</td>
                            <td></td>
                            <td className="col-sm col-overflow-none">{equipmentList(data.equipmentRequired)}</td>
                            <td className="col-sm">{data.totalPieces}</td>
                            <td className="col-md col-overflow-none">{shipmentDims(data.shipmentDims)}</td>
                            <td className="col-sm">{data.isStackable ? "ST" : "NS"}</td>
                            <td className="col-sm">{data.shipmentDims.totalCUFT}</td>
                            <td className="col-sm">{data.totalWeight.weight}</td>
                            <td className="col-md col-overflow">
                                <a href={`/logistics/view-quote/${data._id}`}>
                                    {data.quoteNumber || "N/A"}
                                </a>
                            </td>
                            <td className="col-sm"></td>
                            <td></td>
                            <td>Test</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

function CarrierRateTable(props) {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Carrier</th>
                        <th>Phone#</th>
                        <th>Date</th>
                        <th>Notes</th>
                        <th>TR/TRLR</th>
                        <th>Asked</th>
                        <th>Quote</th>
                        <th>Equip</th>
                        <th>Currency</th>
                        <th colSpan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((data, index) => {
                        return (
                            <tr
                                key={data._id}
                            >
                                <td className="col-index">{index + 1}</td>
                                <td className="col-sm">{data.name}</td>
                                <td className="col-sm col-overflow-none">{data.carrierName}</td>
                                <td className="col-sm">{data.carrierPhoneNumber}</td>
                                <td className="col-sm">{data.date}</td>
                                <td className="col-lg col-overflow-none">{data.notes}</td>
                                <td className="col-sm">{data.carrierTruckNumber} <br /> {data.carrierTrailerNumber}</td>
                                <td className="col-sm">{data.asked}</td>
                                <td className="col-sm">{data.quoted}</td>
                                <td className="col-sm">{data.carrierEquipment}</td>
                                <td className="col-sm">{data.quoteCurrency}</td>
                                <td className="col-options">
                                    <svg onClick={() => {props.searchClick(data._id)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </td>
                                <td className="col-options">
                                    <svg onClick={() => {props.deleteClick(data._id)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default QuotesCustomerTable;

export { CarrierRateTable }