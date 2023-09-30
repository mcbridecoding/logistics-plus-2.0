import React from "react";
import { useParams } from "react-router-dom";
import Heading from '../../components/Heading/Heading'
import QuoteForm from "../../components/Forms/QuoteForm/QuoteForm";

function QuotePage(props) {
    const { title, img, post, carrierCosting, saveAndExit, ToggleAddressModal } = props;
    const { id } = useParams();

    return (
        <>
            <Heading
                title={title}
                img={img}
            />
            <div className="content">
                <div className="report-frame">
                    <QuoteForm
                        post={post === "new" ? "/api/quotes/new-quote" : `/api/quotes/update-quote/${id}`}
                        params={id}
                        carrierCosting={carrierCosting}
                        saveAndExit={saveAndExit}
                        toggleAddressModal={ToggleAddressModal}
                    />
                </div>
            </div>
        </>
    )
}

export default QuotePage;