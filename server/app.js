const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/logistics");

const addressBookSchema = new mongoose.Schema({
    company: String,
    attention: String,
    addressOne: String,
    addressTwo: String,
    city: String,
    state: String,
    postal: String,
    country: String,
    phone: String,
    fax: String,
    email: String,
    salesRep: String,
    customer: Boolean,
    carrier: Boolean,
    shipper: Boolean,
    consignee: Boolean,
    broker: Boolean,
    vendor: Boolean
});

const defaultSettingsSchema = new mongoose.Schema({
    owner: Object,
});

const quoteSchema = new mongoose.Schema({
    name: String,
    quoteNumber: String,
    shipmentSize: String,
    shipmentType: String,
    date: Object,
    client: Object,
    paymentTerms: String,
    thirdPartyBillTo: String,
    serviceLevel: String,
    shipper: Object,
    genericShipper: Object,
    consignee: Object,
    genericConsignee: Object,
    freightReady: String,
    pickupAppointment: String,
    deliveryAppointment: String,
    deliveryEta: String,
    broker: Object,
    quoteNotes: String,
    commodity: String,
    isStackable: Boolean,
    isTarpRequired: Boolean,
    isTailgateRequired: Boolean,
    isTeamRequired: Boolean,
    dangerousGoods: Object,
    referenceNumbers: Object,
    shipmentDims: Object,
    totalPieces: String,
    totalWeight: Object,
    equipmentRequired: Object,
    temp: String,
    temperature: String,
    glPickupCity: String,
    glPickupState: String,
    glPickupCountry: String,
    glDeliveryCity: String,
    glDeliveryState: String,
    glDeliveryCountry: String,

    carrierDetails: Object,
    loadConfirmationSent: Object,
    bolSent: Object,
    commercialInvoiceSent: Object,
    tracingNotes: String,
    customerPricing: Object,
    carrierPricing: Object,
    brokerPricing: Object,
    carrierRates: Array,
});

const AddressBook = new mongoose.model("Address", addressBookSchema);

const Default = new mongoose.model("Default", defaultSettingsSchema);

const Quote = new mongoose.model("Quote", quoteSchema);

const PORT = process.env.PORT || 8080;

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "CAD" });

async function findAddress(id) {
    const address = await AddressBook.findOne({ _id: id });
    return {
        id: address._id,
        company: address.company,
        city: address.city,
        state: address.state,
        country: address.country
    };
}

async function splitQuoteData(dataArray) {
    const ltl_dry = [];
    const carrier_ltl_dry = [];
    const tl_dry = [];
    const carrier_tl_dry = [];

    const ltl_fd = [];
    const carrier_ltl_fd = [];
    const tl_fd = [];
    const carrier_tl_fd = [];

    const ltl_rl = [];
    const carrier_ltl_rl = [];
    const tl_rl = [];
    const carrier_tl_rl = [];

    const LTL_DRY = [];
    const TL_DRY = [];

    const LTL_TC = [];
    const carrier_ltl_tc = [];
    const TL_TC = [];
    const carrier_tl_tc = [];

    const CARRIER_RATES_LTL_DRY = [];

    const CARRIER_RATES_TL_DRY = [];

    dataArray.forEach(data => {
        if (data.shipmentSize === "LTL") {
            if (data.temp === "Dry") {
                CARRIER_RATES_LTL_DRY.push(...data.carrierRates);
                LTL_DRY.push(data);
            } else {
                carrier_ltl_tc.push(...data.carrierRates)
                LTL_TC.push(data);
            }
        } else {
            if (data.temp === "Dry") {
                CARRIER_RATES_TL_DRY.push(...data.carrierRates);
                TL_DRY.push(data);
            } else {
                carrier_tl_tc.push(...data.carrierRates);
                TL_TC.push(data);
            }
        }
    });

    LTL_DRY.forEach(data => {
        if ((data.equipmentRequired.dv || data.equipmentRequired.rf || data.equipmentRequired.du) && (data.equipmentRequired.fd || data.equipmentRequired.sd || data.equipmentRequired.sb || data.equipmentRequired.dd || data.equipmentRequired.fu) && (data.equipmentRequired.rl)) {
            ltl_dry.push(data);
            ltl_fd.push(data);
            ltl_rl.push(data);
        } else if ((data.equipmentRequired.dv || data.equipmentRequired.rf || data.equipmentRequired.du) && (data.equipmentRequired.fd || data.equipmentRequired.sd || data.equipmentRequired.sb || data.equipmentRequired.dd || data.equipmentRequired.fu)) {
            ltl_dry.push(data);
            ltl_fd.push(data);
        } else if (data.equipmentRequired.dv || data.equipmentRequired.rf || data.equipmentRequired.du) {
            ltl_dry.push(data);
        } else if (data.equipmentRequired.fd || data.equipmentRequired.sd || data.equipmentRequired.sb || data.equipmentRequired.dd || data.equipmentRequired.fu) {
            ltl_fd.push(data);
        } else {
            ltl_rl.push(data);
        }
    });

    TL_DRY.forEach(data => {
        if ((data.equipmentRequired.dv || data.equipmentRequired.rf || data.equipmentRequired.du) && (data.equipmentRequired.fd || data.equipmentRequired.sd || data.equipmentRequired.sb || data.equipmentRequired.dd || data.equipmentRequired.fu) && (data.equipmentRequired.rl)) {
            tl_dry.push(data);
            tl_fd.push(data);
            tl_rl.push(data);
        } else if ((data.equipmentRequired.dv || data.equipmentRequired.rf || data.equipmentRequired.du) && (data.equipmentRequired.fd || data.equipmentRequired.sd || data.equipmentRequired.sb || data.equipmentRequired.dd || data.equipmentRequired.fu)) {
            tl_dry.push(data);
            tl_fd.push(data);
        } else if (data.equipmentRequired.dv || data.equipmentRequired.rf || data.equipmentRequired.du) {
            tl_dry.push(data);
        } else if (data.equipmentRequired.fd || data.equipmentRequired.sd || data.equipmentRequired.sb || data.equipmentRequired.dd || data.equipmentRequired.fu) {
            tl_fd.push(data);
        } else {
            tl_rl.push(data);
        }
    });

    CARRIER_RATES_LTL_DRY.forEach(data => {
        if (data.carrierEquipment === "DV" || data.carrierEquipment === "RF" || data.carrierEquipment === "DU") {
            carrier_ltl_dry.push(data);
        } else if (data.carrierEquipment === "FD" || data.carrierEquipment === "SD" || data.carrierEquipment === "SB" || data.carrierEquipment === "DD" || data.carrierEquipment === "FU") {
            carrier_ltl_fd.push(data);
        } else {
            carrier_ltl_rl.push(data);
        }
    });

    CARRIER_RATES_TL_DRY.forEach(data => {
        if (data.carrierEquipment === "DV" || data.carrierEquipment === "RF" || data.carrierEquipment === "DU") {
            carrier_tl_dry.push(data);
        } else if (data.carrierEquipment === "FD" || data.carrierEquipment === "SD" || data.carrierEquipment === "SB" || data.carrierEquipment === "DD" || data.carrierEquipment === "FU") {
            carrier_tl_fd.push(data);
        } else {
            carrier_tl_rl.push(data);
        }
    })

    return {
        ltl_dry: {
            customer: ltl_dry,
            carrier: carrier_ltl_dry,
        },
        tl_dry: {
            customer: tl_dry,
            carrier: carrier_tl_dry
        },
        ltl_tc: {
            customer: LTL_TC,
            carrier: carrier_ltl_tc
        },
        tl_tc: {
            customer: TL_TC,
            carrier: carrier_tl_tc
        },
        ltl_fd: {
            customer: ltl_fd,
            carrier: carrier_ltl_fd
        },
        tl_fd: {
            customer: tl_fd,
            carrier: carrier_tl_fd
        },
        ltl_rl: {
            customer: ltl_rl,
            carrier: carrier_ltl_rl
        },
        tl_rl: {
            customer: tl_rl,
            carrier: carrier_tl_rl
        }
    }
}

app.route("/api/defaults")
    .get(async (req, res) => {
        const defaults = await Default.findOne({});
        res.send(defaults);
    });

app.route("/api/view/address-list")
    .get(async (req, res) => {
        const addressList = await AddressBook.find({}).sort({ company: 1 });
        res.send(addressList);
    });

app.route("/api/addressbook/add-contact")
    .post(async (req, res) => {
        const data = req.body.data;
        const newContact = new AddressBook({
            company: data.company,
            attention: data.attention,
            addressOne: data.addressOne,
            addressTwo: data.addressTwo,
            city: data.city,
            state: data.state,
            postal: data.postal,
            country: data.country,
            phone: data.phone,
            fax: data.fax,
            email: data.email,
        });

        newContact.save();
        res.send("Success");
    });

app.route("/api/goodlanes/customer-list")
    .get(async (req, res) => {
        const quotes = await Quote.find({}).sort({ "client.company": 1 });
        const customerList = []
        quotes.forEach(quote => {
            if (!customerList.some(customer => customer.id === quote.client.id)) {
                customerList.push({
                    id: quote.client.id,
                    company: quote.client.company
                });
            }
        });

        res.send(customerList);
    });

app.route("/api/quotes/new-quote")
    .post(async (req, res) => {
        const data = req.body.quoteData;
        const client = await findAddress(data.client);
        const SHIPPER = {
            id: "",
            company: ""
        };

        const CONSIGNEE = {
            id: "",
            company: ""
        };

        const shipper = {};
        if (data.shipper === "" || data.shipper === undefined || data.shipper === null) {
            shipper.city = data.shipperCity;
            shipper.state = data.shipperState;
            shipper.country = data.shipperCountry;
        } else {
            const shippingInformation = await findAddress(data.shipper);

            SHIPPER.id = shippingInformation.id;
            SHIPPER.company = shippingInformation.company;

            shipper.city = shippingInformation.city;
            shipper.state = shippingInformation.state;
            shipper.country = shippingInformation.country;
        }

        const consignee = {};
        if (data.consignee === "" || data.consignee === undefined || data.consignee === null) {
            consignee.city = data.consigneeCity;
            consignee.state = data.consigneeState;
            consignee.country = data.consigneeCountry;
        } else {
            const consigneeInformation = await findAddress(data.consignee);

            CONSIGNEE.id = consigneeInformation.id;
            CONSIGNEE.company = consigneeInformation.company;

            consignee.city = consigneeInformation.city;
            consignee.state = consigneeInformation.state;
            consignee.country = consigneeInformation.country;
        };

        const newQuote = new Quote({
            name: data.name,
            quoteNumber: data.quoteNumber,
            shipmentSize: data.shipmentSize,
            shipmentType: data.shipmentType,
            date: {
                date: data.date,
                time: data.time
            },
            client: {
                id: data.client,
                company: client.company
            },
            paymentTerms: data.paymentTerms,
            thirdPartyBillTo: data.thirdPartyBillTo,
            serviceLevel: data.serviceLevel,
            shipper: SHIPPER,
            genericShipper: shipper,
            consignee: CONSIGNEE,
            genericConsignee: consignee,
            freightReady: data.freightReady,
            pickupAppointment: data.pickupAppointment,
            deliveryAppointment: data.deliveryAppointment,
            deliveryEta: data.deliveryEta,
            broker: {
                nbBroker: data.nbBroker,
                sbBroker: data.sbBroker
            },
            quoteNotes: data.quoteNotes,
            commodity: data.commodity,
            isStackable: data.isStackable,
            isTarpRequired: data.isTailgateRequired,
            isTailgateRequired: data.isTailgateRequired,
            isTeamRequired: data.isTeamRequired,
            dangerousGoods: {
                un: data.un,
                class: data.class,
                pg: data.pg,
                emergencyContact: data.emergencyContact,
                dgDescription: data.dgDescription
            },
            referenceNumbers: {
                poNumber: data.poNumber,
                soNumber: data.soNumber,
                referenceNumber: data.referenceNumber,
                invoiceNumber: data.invoiceNumber,
            },
            shipmentDims: {
                l1: data.l1,
                w1: data.w1,
                h1: data.h1,
                c1: data.c1,
                cuft1: data.cuft1,
                l2: data.l2,
                w2: data.w2,
                h2: data.h2,
                c2: data.c2,
                cuft2: data.cuft2,
                l3: data.l3,
                w3: data.w3,
                h3: data.h3,
                c3: data.c3,
                cuft3: data.cuft3,
                l4: data.l4,
                w4: data.w4,
                h4: data.h4,
                c4: data.c4,
                cuft4: data.cuft4,
                l5: data.l5,
                w5: data.w5,
                h5: data.h5,
                c5: data.c5,
                cuft5: data.cuft5,
                l6: data.l6,
                w6: data.w6,
                h6: data.h6,
                c6: data.c6,
                cuft6: data.cuft6,
                l7: data.l7,
                w7: data.w7,
                h7: data.h7,
                c7: data.c7,
                cuft7: data.cuft7,
                l8: data.l8,
                w8: data.w8,
                h8: data.h8,
                c8: data.c8,
                cuft8: data.cuft8,
                l9: data.l9,
                w9: data.w9,
                h9: data.h9,
                c9: data.c9,
                cuft9: data.cuft9,
                l10: data.l10,
                w10: data.w10,
                h10: data.h10,
                c10: data.c10,
                cuft10: data.cuft10,
                totalCUFT: data.totalCUFT,
            },
            totalPieces: data.totalPieces,
            totalWeight: {
                weight: data.totalWeight,
                measurement: data.weightMeasurement
            },
            equipmentRequired: {
                dv: data.dv,
                rf: data.rf,
                du: data.du,
                fd: data.fd,
                sd: data.sd,
                sb: data.sb,
                dd: data.dd,
                fu: data.fu,
                rl: data.rl
            },
            temp: data.temp,
            temperature: data.temperature,
            temperature: data.temperature,
            glPickupCity: data.glPickupCity,
            glPickupState: data.glPickupState,
            glPickupCountry: data.glPickupCountry,
            glDeliveryCity: data.glDeliveryCity,
            glDeliveryState: data.glDeliveryState,
            glDeliveryCountry: data.glDeliveryCountry,
        });
        newQuote.save();
        res.send(newQuote._id);
    });

app.route("/api/quotes/update-quote/:id")
    .post(async (req, res) => {
        const id = req.params.id;
        const data = req.body.quoteData;
        const client = await findAddress(data.client);
        console.log(data);
        const SHIPPER = {
            id: "",
            company: ""
        };

        const CONSIGNEE = {
            id: "",
            company: ""
        };

        const shipper = {};
        if (data.shipper === "" || data.shipper === undefined || data.shipper === null) {
            shipper.city = data.shipperCity;
            shipper.state = data.shipperState;
            shipper.country = data.shipperCountry;
        } else {
            const shippingInformation = await findAddress(data.shipper);

            SHIPPER.id = shippingInformation.id;
            SHIPPER.company = shippingInformation.company;

            shipper.city = shippingInformation.city;
            shipper.state = shippingInformation.state;
            shipper.country = shippingInformation.country;
        }

        const consignee = {};
        if (data.consignee === "" || data.consignee === undefined || data.consignee === null) {
            consignee.city = data.consigneeCity;
            consignee.state = data.consigneeState;
            consignee.country = data.consigneeCountry;
        } else {
            const consigneeInformation = await findAddress(data.consignee);

            CONSIGNEE.id = consigneeInformation.id;
            CONSIGNEE.company = consigneeInformation.company;

            consignee.city = consigneeInformation.city;
            consignee.state = consigneeInformation.state;
            consignee.country = consigneeInformation.country;
        };

        Quote.findByIdAndUpdate(id, {
            name: data.name,
            quoteNumber: data.quoteNumber,
            shipmentSize: data.shipmentSize,
            shipmentType: data.shipmentType,
            date: {
                date: data.date,
                time: data.time
            },
            client: {
                id: data.client,
                company: client.company
            },
            paymentTerms: data.paymentTerms,
            thirdPartyBillTo: data.thirdPartyBillTo,
            serviceLevel: data.serviceLevel,
            shipper: SHIPPER,
            genericShipper: shipper,
            consignee: CONSIGNEE,
            genericConsignee: consignee,
            freightReady: data.freightReady,
            pickupAppointment: data.pickupAppointment,
            deliveryAppointment: data.deliveryAppointment,
            deliveryEta: data.deliveryEta,
            broker: {
                nbBroker: data.nbBroker,
                sbBroker: data.sbBroker
            },
            quoteNotes: data.quoteNotes,
            commodity: data.commodity,
            isStackable: data.isStackable,
            isTarpRequired: data.isTailgateRequired,
            isTailgateRequired: data.isTailgateRequired,
            isTeamRequired: data.isTeamRequired,
            dangerousGoods: {
                un: data.un,
                class: data.class,
                pg: data.pg,
                emergencyContact: data.emergencyContact,
                dgDescription: data.dgDescription
            },
            referenceNumbers: {
                poNumber: data.poNumber,
                soNumber: data.soNumber,
                referenceNumber: data.referenceNumber,
                invoiceNumber: data.invoiceNumber,
            },
            shipmentDims: {
                l1: data.l1,
                w1: data.w1,
                h1: data.h1,
                c1: data.c1,
                cuft1: data.cuft1,
                l2: data.l2,
                w2: data.w2,
                h2: data.h2,
                c2: data.c2,
                cuft2: data.cuft2,
                l3: data.l3,
                w3: data.w3,
                h3: data.h3,
                c3: data.c3,
                cuft3: data.cuft3,
                l4: data.l4,
                w4: data.w4,
                h4: data.h4,
                c4: data.c4,
                cuft4: data.cuft4,
                l5: data.l5,
                w5: data.w5,
                h5: data.h5,
                c5: data.c5,
                cuft5: data.cuft5,
                l6: data.l6,
                w6: data.w6,
                h6: data.h6,
                c6: data.c6,
                cuft6: data.cuft6,
                l7: data.l7,
                w7: data.w7,
                h7: data.h7,
                c7: data.c7,
                cuft7: data.cuft7,
                l8: data.l8,
                w8: data.w8,
                h8: data.h8,
                c8: data.c8,
                cuft8: data.cuft8,
                l9: data.l9,
                w9: data.w9,
                h9: data.h9,
                c9: data.c9,
                cuft9: data.cuft9,
                l10: data.l10,
                w10: data.w10,
                h10: data.h10,
                c10: data.c10,
                cuft10: data.cuft10,
                totalCUFT: data.totalCUFT,
            },
            totalPieces: data.totalPieces,
            totalWeight: {
                weight: data.totalWeight,
                measurement: data.weightMeasurement
            },
            equipmentRequired: {
                dv: data.dv,
                rf: data.rf,
                du: data.du,
                fd: data.fd,
                sd: data.sd,
                sb: data.sb,
                dd: data.dd,
                fu: data.fu,
                rl: data.rl
            },
            temp: data.temp,
            temperature: data.temperature,
            temperature: data.temperature,
            glPickupCity: data.glPickupCity,
            glPickupState: data.glPickupState,
            glPickupCountry: data.glPickupCountry,
            glDeliveryCity: data.glDeliveryCity,
            glDeliveryState: data.glDeliveryState,
            glDeliveryCountry: data.glDeliveryCountry,
        }, (err, docs) => {
            if (err) {
                console.log(`Error: ${err}`);
            } else {
                console.log(docs);
                res.send(id);
            }
        });
    });

app.route("/api/quotes/view-quote/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const data = await Quote.findOne({ _id: id });
        res.send(data);
    });

app.route("/api/quotes/add-carrier-rates/:id")
    .post(async (req, res) => {
        const id = req.params.id;
        const data = req.body.data;
        const asked = currency.format(data.asked).slice(2);
        const quoted = currency.format(data.quoted).slice(2);

        const rates = {
            _id: crypto.randomUUID(),
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
            asked: asked,
            quoted: quoted,
            quoteCurrency: data.quoteCurrency,
            carrierQuoteNumber: data.carrierQuoteNumber,
            carrierTruckNumber: data.carrierTruckNumber,
            carrierTrailerNumber: data.carrierTrailerNumber,
            pickupDate: data.pickupDate,
            deliveryDate: data.deliveryDate,
            parsPaps: data.parsPaps,
            crossing: data.crossing,
            notes: data.notes
        }

        Quote.findOneAndUpdate({ _id: id }, {
            $push: { carrierRates: rates }
        }, (err, success) => {
            if (!err) {
                console.log(`${success}`);
                res.send("Success");
            } else {
                console.log(`Error: ${err}`);
            }
        });
    });

app.route("/api/quotes/delete-carrier-rates/quoteId=:quoteId/lineId=:lineId")
    .get(async (req, res) => {
        const quoteId = req.params.quoteId;
        const lineId = req.params.lineId;

        Quote.findOneAndUpdate({ _id: quoteId }, {
            $pull: {
                carrierRates: {
                    _id: lineId
                }
            }
        }, (err, success) => {
            if (!err) {
                console.log(`${success}`);
                res.send("Successfully Delete Line");
            } else {
                console.log(`Error: ${err}`);
            }
        });
    });

app.route("/api/quotes/search-by-customer/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const data = await Quote.find({ "client.id": id });
        const splitData = await splitQuoteData(data)

        res.send(splitData);
    });

app.route("/api/quotes/search-by-filter/:fCity,:fState/:tCity,:tState")
    .get(async (req, res) => {
        const params = {
            glPickupCity: req.params.fCity,
            glPickupState: req.params.fState,
            glDeliveryCity: req.params.tCity,
            glDeliveryState: req.params.tState
        }
        const data = await Quote.find({
            glPickupCity: req.params.fCity,
            glPickupState: req.params.fState,
            glDeliveryCity: req.params.tCity,
            glDeliveryState: req.params.tState 
        });

        res.send(data.length !== 0 ? await splitQuoteData(data) : []);
    });

app.route("/api/quotes/test")
    .get(async (req, res) => {
        const data = await Quote.find({}).sort({ date: 1 });
        const splitData = await splitQuoteData(data);

        res.send(splitData);
    });

app.route("/api/test")
    .get(async (req, res) => {
        res.render("/home");
    });

app.listen(PORT, () => { console.log(`Server running on ${PORT}`) });