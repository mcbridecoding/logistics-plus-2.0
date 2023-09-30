import React, { useEffect, useState } from "react";
import "./QuotesMenu.css";
import Heading from "../../components/Heading/Heading";
import Tabs from "../../components/Tabs/Tabs";
import QuotesCustomerTable, { QuotesCarrierTable } from "../../components/Table/Table";
import { FlexStartColumn, FlexStartRow } from "../../components/FlexBox/FlexBox";
import FolderPanel from "../../components/FolderPanel/FolderPanel";
import FolderButton from "../../components/Buttons/FolderButton/FolderButton";
import Input from "../../components/InputElements/Input/Input";
import Select from "../../components/InputElements/Select/Select";
import { UtilityButtonSmall } from "../../components/Buttons/UtilityButton/UtilityButton";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import { ErrorModal } from "../../components/Modal/Modal";
import axios from "axios";

function QuotesMenu() {
    const [data, setData] = useState(
        JSON.parse(window.localStorage.getItem("QUOTES_MENU")) !== null ? JSON.parse(window.localStorage.getItem("QUOTES_MENU")).data : []
    );

    const [customerData, setCustomerData] = useState(
        JSON.parse(window.localStorage.getItem("QUOTES_MENU")) !== null ? JSON.parse(window.localStorage.getItem("QUOTES_MENU")).customerData : []
    );

    const [carrierData, setCarrierData] = useState(
        JSON.parse(window.localStorage.getItem("QUOTES_MENU")) !== null ? JSON.parse(window.localStorage.getItem("QUOTES_MENU")).carrierData : []
    );

    const [menu, toggleMenu] = useState(
        JSON.parse(window.localStorage.getItem("QUOTES_MENU")) !== null ? JSON.parse(window.localStorage.getItem("QUOTES_MENU")).menu : true
    );

    const [customerList, setCustomerList] = useState([]);

    const [menuTabs, toggleMenuTabs] = useState(
        JSON.parse(window.localStorage.getItem("QUOTES_MENU")) !== null ? JSON.parse(window.localStorage.getItem("QUOTES_MENU")).menuTabs : {
            ltl_dry: false,
            tl_dry: false,
            ltl_tc: false,
            tl_tc: false,
            ltl_fd: false,
            tl_fd: false,
            ltl_rl: false,
            tl_rl: false
        });

    const [tabLock, toggleTabLock] = useState(
        JSON.parse(window.localStorage.getItem("QUOTES_MENU")) !== null ? JSON.parse(window.localStorage.getItem("QUOTES_MENU")).tabLock : true
    );

    const [searchData, setSearchData] = useState({
        customer: "",
        fromCity: "",
        fromState: "",
        toCity: "",
        toState: "",
        query: "Search by Customer:",
    });

    const [errorMessage, toggleErrorMessage] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setSearchData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const [searchFrame, toggleSearchFrame] = useState({
        customer: false,
        filter: false
    });

    function searchFrameClick(query, frame) {
        hideSearchFrame();
        toggleSearchFrame(prevValue => {
            return {
                ...prevValue,
                [frame]: true
            }
        });
        toggleErrorMessage(false);
        setSearchData({
            query: query
        })
    }

    function toggleMenuTab(key) {
        for (let key in menuTabs) {
            if (menuTabs.hasOwnProperty(key)) {
                menuTabs[key] = false;
            }
        }
        toggleMenuTabs(prevValue => {
            return {
                ...prevValue,
                [key]: true
            }
        });
        setCustomerData(data[key].customer);
        setCarrierData(data[key].carrier);
    }

    function handleToggleMenu() {
        toggleMenu(!menu);
    }

    function hideSearchFrame() {
        for (let key in searchFrame) {
            if (searchFrame.hasOwnProperty(key)) {
                searchFrame[key] = false;
            }
        }
    }

    function searchCustomerClick() {
        const ENDPOINT = (searchData.customer);
        axios(ENDPOINT)
            .then(res => {
                setData(res.data);
                hideSearchFrame();
                toggleTabLock(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function closeErrorModal() {
        toggleErrorMessage(!errorMessage);
    }

    function searchFilterClick() {
        const ENDPOINT = (`/api/quotes/search-by-filter/${searchData.fromCity},${searchData.fromState}/${searchData.toCity},${searchData.toState}`);
        axios(ENDPOINT)
            .then(res => {
                if (res.data.length !== 0) {
                    setData(res.data);
                    hideSearchFrame();
                    toggleTabLock(false);
                } else {
                    setData([]);
                    setCarrierData([]);
                    setCustomerData([]);
                    toggleTabLock(true);
                    hideSearchFrame();
                    toggleMenuTabs({
                        ltl_dry: false,
                        tl_dry: false,
                        ltl_tc: false,
                        tl_tc: false,
                        ltl_fd: false,
                        tl_fd: false,
                        ltl_rl: false,
                        tl_rl: false
                    });
                    toggleErrorMessage(!errorMessage);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getCustomerList();
    }, []);

    useEffect(() => {
        window.localStorage.setItem("QUOTES_MENU", JSON.stringify({
            data: data,
            customerData: customerData,
            carrierData: carrierData,
            menu: menu,
            menuTabs: menuTabs,
            tabLock: tabLock,
            searchData: searchData
        }));
    }, [data, customerData, carrierData, menuTabs, tabLock, searchData, menu]);

    const getCustomerList = () => {
        const ENDPOINT = ("/api/goodlanes/customer-list");
        axios(ENDPOINT)
            .then(res => {
                const data = res.data;
                setCustomerList(data);
            })
            .catch(err => {
                console.log(err);
            });
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
            {errorMessage &&
                <ErrorModal
                    title="Error!"
                    message="The search entered returned no results. Please try again ..."
                    closeModal={closeErrorModal}
                >
                    <h2>The filter options selected returned no results. </h2>
                    <h2>Please try again.</h2>
                </ErrorModal>
            }
            {searchFrame.filter &&
                <SearchPanel
                    title={searchData.query}
                >
                    <FlexStartRow gap="20px">
                        <FlexStartRow gap="15px">
                            <Input
                                name="fromCity"
                                placeholder=""
                                label="City:"
                                size="input-lg"
                                type="text"
                                value={searchData.fromCity}
                                readOnly=""
                                onChange={handleChange}
                                required={true}
                            />
                            <Input
                                name="fromState"
                                placeholder=""
                                label="State:"
                                size="input-sm"
                                type="text"
                                value={searchData.fromState}
                                readOnly=""
                                onChange={handleChange}
                                required={true}
                            />
                        </FlexStartRow>
                        <h2>TO</h2>
                        <FlexStartRow gap="15px">
                            <Input
                                name="toCity"
                                placeholder=""
                                label="City:"
                                size="input-lg"
                                type="text"
                                value={searchData.toCity}
                                readOnly=""
                                onChange={handleChange}
                                required={true}
                            />
                            <Input
                                name="toState"
                                placeholder=""
                                label="State:"
                                size="input-sm"
                                type="text"
                                value={searchData.toState}
                                readOnly=""
                                onChange={handleChange}
                                required={true}
                            />
                        </FlexStartRow>
                        <UtilityButtonSmall
                            type="button"
                            onClick={searchFilterClick}
                            label="Search"
                            img=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        />
                    </FlexStartRow>
                </SearchPanel>
            }
            {searchFrame.customer &&
                <SearchPanel
                    title={searchData.query}
                >
                    <Select
                        name="customer"
                        label="Customer:"
                        size="input-md"
                        onChange={handleChange}
                        value={searchData.customer}
                    >
                        <option value=""></option>
                        {customerList.map(customer => {
                            return <option
                                id={customer.id}
                                key={customer.id}
                                value={`/api/quotes/search-by-customer/${customer.id}`}
                            >
                                {customer.company}
                            </option>
                        })}
                    </Select>
                    <UtilityButtonSmall
                        type="button"
                        onClick={searchCustomerClick}
                        label="Search"
                        img=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    />
                </SearchPanel>
            }
            <div className="content">
                <div className="report-frame">
                    <div className="quote-form">
                        <div className="quote-body">
                            <div className="folder-tabs">
                                <Tabs
                                    label="LTL Dry"
                                    class={menuTabs.ltl_dry ? "tab-active" : "tab"}
                                    onClick={() => toggleMenuTab("ltl_dry")}
                                    disabled={tabLock}
                                />
                                <Tabs
                                    label="TL Dry"
                                    class={menuTabs.tl_dry ? "tab-active" : "tab"}
                                    onClick={() => toggleMenuTab("tl_dry")}
                                    disabled={tabLock}
                                />
                                <Tabs
                                    label="LTL TC"
                                    class={menuTabs.ltl_tc ? "tab-active" : "tab"}
                                    onClick={() => toggleMenuTab("ltl_tc")}
                                    disabled={tabLock}
                                />
                                <Tabs
                                    label="TL TC"
                                    class={menuTabs.tl_tc ? "tab-active" : "tab"}
                                    onClick={() => toggleMenuTab("tl_tc")}
                                    disabled={tabLock}
                                />
                                <Tabs
                                    label="LTL FD"
                                    class={menuTabs.ltl_fd ? "tab-active" : "tab"}
                                    onClick={() => toggleMenuTab("ltl_fd")}
                                    disabled={tabLock}
                                />
                                <Tabs
                                    label="TL FD"
                                    class={menuTabs.tl_fd ? "tab-active" : "tab"}
                                    onClick={() => toggleMenuTab("tl_fd")}
                                    disabled={tabLock}
                                />
                                <Tabs
                                    label="LTL Intermodal"
                                    class={menuTabs.ltl_rl ? "tab-active" : "tab"}
                                    onClick={() => toggleMenuTab("ltl_rl")}
                                    disabled={tabLock}
                                />
                                <Tabs
                                    label="TL Intermodal"
                                    class={menuTabs.tl_rl ? "tab-active" : "tab"}
                                    onClick={() => toggleMenuTab("tl_rl")}
                                    disabled={tabLock}
                                />
                            </div>
                            <div className="table-frame">
                                <QuotesCustomerTable
                                    data={customerData}
                                />
                            </div>
                            <div className="table-frame">
                                <QuotesCarrierTable
                                    data={carrierData}
                                />
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
                                    onClick={() => searchFrameClick("Search by Customer:", "customer")}
                                    label="Search by Customer"
                                />
                                <FolderButton
                                    class={menu ? "folder-button" : "folder-button-hidden"}
                                    type="button"
                                    onClick={() => searchFrameClick("Search by Filter:", "filter")}
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