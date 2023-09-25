import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import Nav from "./Nav/Nav";
import Settings from "../Pages/Settings/Settings";
import NewQuote from "../Pages/NewQuote/NewQuote";
import ViewQuote from "../Pages/View Quote/ViewQuote";
import QuotesMenu from "../Pages/QuotesMenu/QuotesMenu";

function App() {
    return(
        <div className="main">
            <Nav />
            <div className="view-panel">
                <Routes>
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/logistics/quotes" element={<QuotesMenu />} />
                    <Route path="/logistics/new-quote" element={<NewQuote />} />
                    <Route path="/logistics/view-quote/:id" element={<ViewQuote />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
