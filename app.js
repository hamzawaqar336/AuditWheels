const express = require("express");
const app = express();
const hogan = require('hogan.js')
var easyinvoice = require('easyinvoice');
var fs = require('fs');
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
// const logo = require("./pdf/invoicelogo")

var imageAsBase64 = fs.readFileSync('./pdf/invoiceUpdatedLogo.png', 'base64');
var watermarkBase64 = fs.readFileSync('./pdf/invoiceUpdatedLogo.png', 'base64');
const forgotEmailTemplate = fs.readFileSync('./middleware/mailTemplate.hjs', 'utf-8');
const forgotPasswordTemplate = hogan.compile(forgotEmailTemplate);

const path = require("path");
const stripe = require('stripe')('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');
// const stripe = require('stripe')('sk_test_51LyuMfCSlraB579D5JY523fT93gMzyJznrdXgkQ7TGrkF6oOEfa9tPQmT7WLSg5zEf5nJnOiusQrdB8pHgjrOVEO00VgRvf4nQ')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json({ extended: false }))
app.use("/uploads", express.static(path.join(__dirname, './pdf')));
require('dotenv').config({ path: __dirname + '/./.env' })

// app.use(express.static(path.join(__dirname, ".", "Client", "dist")));

// var base64str = base64_encode('');
// console.log(`${process.env.STRIPE_Key}`,'woiurwqoie');

// function base64_encode(file) {
//     return "data:image/gif;base64,"+fs.readFileSync(file, 'base64');
// }

// var base64str = base64_encode(logo);



var transport = nodemailer.createTransport(
    // {

    //     host: "smtp-mail.outlook.com", // hostname
    //     secureConnection: false, // TLS requires secureConnection to be false
    //     port: 587, // port for secure SMTP
    //     tls: {
    //         ciphers: 'SSLv3'
    //     },
    //     auth: {
    //         user: 'wheelsauditcanada@outlook.com',
    //         pass: 'Quixlab.786'
    //     }
    // }
    {
        host: "smtpout.secureserver.net",  
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers:'SSLv3'
    },
    requireTLS:true,
    port: 465,
    debug: true,
    auth: {
        user: "support@auditwheels.com",
        pass: "Quixlab.786" 
    }

    }
)
app.post("/checkout", async (req, res) => {
    try {

        var dt = new Date();
        var oobbID = new mongoose.Types.ObjectId();
        var num = Math.floor(Math.random() * 90000) + 10000;

        // console.log(req.body.buyingDetails.amount == 30? 30.81 :req.body.buyingDetails.amount == 40 ? 41.08: req.body.buyingDetails.amount == 50 ? 51.35 : 0)
        const cardResponse = await validateCard(req.body.cardDetails);

        var checkoutCart = validateOrder(req.body.buyingDetails);

        if (cardResponse !== undefined && cardResponse.id && cardResponse.id!==undefined && cardResponse.id !== '' ) {
              
        const response = await stripe.paymentIntents.create({
            amount: checkoutCart.amount == 30 ? (32.81) * 100 : checkoutCart.amount == 40 ? (43.08) * 100 : checkoutCart.amount == 50 ? (53.35) * 100 : 0,
            currency: checkoutCart.currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });



        const checkoutObj = {
            id: response.id
        };

        const checkoutPaymentResponse = await checkoutPayment(checkoutObj, cardResponse);
        console.log("aksld")


        //invoice download work....



        var data = {

            "customize": {
                //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                "logo": `${imageAsBase64}`,
                // The invoice background
                "background": `${watermarkBase64}`
            },
            // Your own data
            "sender": {
                "company": "AuditWheels",
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            // Your recipient
            "client": {
                "company": `${req.body.userDetails.fullname}`,
                "email": `${req.body.userDetails.email}`,
                "city": `${req.body.userDetails.city}`,
                "country": `${req.body.userDetails.country}`
                // "custom1": "custom value 1",
                // "custom2": "custom value 2",
                // "custom3": "custom value 3"
            },
            "information": {
                // Invoice number
                "number": `${'INV' + dt.getUTCFullYear() + (dt.getUTCMonth() + 1) + oobbID._id}`,
                // Invoice data
                "date": `${dt.getDate() + "-" + (dt.getUTCMonth() + 1) + '-' + dt.getUTCFullYear()}`,

            },
            // The products you would like to see on your invoice
            // Total values are being calculated automatically
            "products": [
                {
                    "quantity": 1,
                    "description": `${req.body.buyingDetails.amount == 30 ? 'Basic 30$' : req.body.buyingDetails.amount == 40 ? 'Silver 40$' : req.body.buyingDetails.amount == 50 ? 'Gold 50$' : ''}`,
                    "tax-rate": 2.7,
                    "price": Number(req.body.buyingDetails.amount),
                    // "vat" : `${req.body.buyingDetails.amount == 30 ? '0.81 $' : req.body.buyingDetails.amount == 40 ? '1.08 $' : req.body.buyingDetails.amount == 50 ? '1.35 $' : ''}`

                }

            ],
            //  "vat": `${req.body.buyingDetails.amount == 30 ? '0.81 $' : req.body.buyingDetails.amount == 40 ? '1.08 $' : req.body.buyingDetails.amount == 50 ? '1.35 $' : ''}`,


            // The message you would like to display on the bottom of your invoice
            "bottom-notice": "Note: Stripe Charge 0.067$¢ for one transaction which is include in this invoice, please contact support for further assistance. support@auditwheels.com \n\n © Copyright 2023. auditwheels.com",
            // Settings to customize your invoice
            "settings": {
                "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.

            },
            // Translate your invoice to your preferred language
            "translate": {

            },
        }


        const result = await easyinvoice.createInvoice(data);
        await fs.writeFileSync(`./pdf/${req.body.cardDetails.name_on_card.replaceAll(' ', '') + num}.pdf`, result.pdf, 'base64');

        //sending Email...
        var mailoptionssAd = {
            from: "support@auditwheels.com",
            to: ['quixlabinfo@gmail.com', `${req.body.userDetails.email}`],
            subject: `Invoice Of ${req.body.buyingDetails.amount == 30 ? 'Basic Package' : req.body.buyingDetails.amount == 40 ? 'Silver Package' : req.body.buyingDetails.amount == 50 ? 'Gold Package' : ''}. - AuditWheels`,
            html: forgotPasswordTemplate.render({
                name: req.body.cardDetails.name_on_card,
                invoiceLink: `www.auditwheels.com/uploads/${req.body.cardDetails.name_on_card.replaceAll(' ', '') + num}.pdf`,
                chatLink: "www.auditwheels.com",
                Dates: `${dt.getDate() + "-" + (dt.getUTCMonth() + 1) + '-' + dt.getUTCFullYear()}`,
                FullName: req.body.userDetails.fullname,
                email:req.body.userDetails.email,
                city:req.body.userDetails.city,
                country:req.body.userDetails.country,
                phone:req.body.userDetails.phone,
                vinNo:req.body.userDetails.vinNumber


            })

        }
        transport.sendMail(mailoptionssAd, function (error, info) {
            if (error) {
                console.log(error)
            }
        })
        //email work end here

        res.send({
            status: true
        })
        res.end();

    }
    else{
        res.send({
            status: false,
            message: 'Invalid Card'
        })
        res.end();
    }


    } catch (e) {
        console.log(e);
        res.send({
            status: false
        });
        res.end();
    }
})

const checkoutPayment = async (obj, pmId) => {
    const response = await stripe.paymentIntents.confirm(
        obj.id,
        {
            payment_method: pmId.id,
            // payment_method: 'pm_card_visa',
            return_url: "https://example.com/return_url"
        },
    );

    return response;
};

const validateCard = async (obj) => {



    try {

        const response = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: obj.number,
                exp_month: obj.exp_month,
                exp_year: obj.exp_year,
                cvc: obj.cvc,
            },
        });
        return response;
    } catch (e) {
        console.log(e, "Stripe Error")
        return {
            status: false,
            message: 'Invalid Card'

        }
        
    }


}

const validateOrder = (obj) => {
    return {
        amount: Number(obj.amount),
        currency: obj.currency
    }
}


// if (process.env.NODE_ENV == "production") {

    app.use(express.static(path.resolve(__dirname, 'car-report-project/dist')));
    app.use(express.static("public"));
    app.use((req, res, next) => {
        res.sendFile(path.join(__dirname, ".", "car-report-project", "dist", "index.html"));
    });


// }


const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log("server is running")
})   