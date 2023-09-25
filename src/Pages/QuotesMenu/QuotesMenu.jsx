import React, { useEffect, useState } from "react";
import "./QuotesMenu.css";
import Heading from "../../components/Heading/Heading";
import Tabs from "../../components/Tabs/Tabs";
import QuotesCustomerTable from "../../components/Table/Table";
import axios from "axios";
import { FlexStartColumn } from "../../components/FlexBox/FlexBox";
import FolderPanel from "../../components/FolderPanel/FolderPanel";
import FolderButton from "../../components/Buttons/FolderButton/FolderButton";

function QuotesMenu() {
    const [data, setData] = useState([]);

    const [menu, toggleMenu] = useState(true);

    function handleToggleMenu() {
        toggleMenu(!menu);
    }

    useEffect(() => {
        getQuoteData();
    }, []);

    const getQuoteData = () => {
        const ENDPOINT = ('/api/quotes/test');
        axios(ENDPOINT)
            .then(res => {
                setData(res.data);
            }
            )
            .catch(err => {
                console.log(err);
            })
    }

    function testClick() {
        getQuoteData();
    }

    return (
        <>
            <Heading
                title="Quotes Menu"
                img=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-menu-button-wide" viewBox="0 0 16 16">
                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-13z" />
                    <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                </svg>
            />
            <div className="content">
                <div className="report-frame">
                    <div className="quote-form">
                        <div className="quote-body">
                            <div className="folder-tabs">
                                <Tabs
                                    label="LTL Dry"
                                    onClick={null}
                                />
                                <Tabs
                                    label="TL Dry"
                                    onClick={null}
                                />
                                <Tabs
                                    label="LTL TC"
                                    onClick={null}
                                />
                                <Tabs
                                    label="TL TC"
                                    onClick={null}
                                />
                                <Tabs
                                    label="LTL FD"
                                    onClick={null}
                                />
                                <Tabs
                                    label="TL FD"
                                    onClick={null}
                                />
                                <Tabs
                                    label="LTL Intermodal"
                                    onClick={null}
                                />
                                <Tabs
                                    label="TL Intermodal"
                                    onClick={null}
                                />
                            </div>
                            <div className="table-frame">
                                <QuotesCustomerTable
                                    data={data}
                                />
                            </div>
                            <div className="table-frame">

                            </div>
                        </div>
                        <FolderPanel class={menu ? "folder-panel" : "folder-panel folder-panel-small"}>
                            <FlexStartColumn>
                                <div>
                                    <button
                                        className={menu ? "expand-button" : "expand-button expand-button-hidden"}
                                        type="button"
                                        onClick={handleToggleMenu}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z" />
                                        </svg>
                                    </button>
                                </div>
                                <FolderButton
                                    class={menu ? "folder-button" : "folder-button-hidden"}
                                    type="button"
                                    onClick={testClick}
                                    label="Search by Customer"
                                />
                                <FolderButton
                                    class={menu ? "folder-button" : "folder-button-hidden"}
                                    type="button"
                                    onClick={null}
                                    label="Search by Carrier"
                                />
                                <FolderButton 
                                    class={menu ? "folder-button" : "folder-button-hidden"}
                                    type="button"
                                    onClick={null}
                                    label="Search by Filter"
                                />
                            </FlexStartColumn>
                        </FolderPanel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuotesMenu;