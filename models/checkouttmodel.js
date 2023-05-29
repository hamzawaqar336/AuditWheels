'use strict';

//Requiring Cart Model from Model.js
const model = require("../../models").userDir.user;
const modelCart = require("../../models").miscellaneousDir.cart;
const modelPurchaseActivity = require("../../models").miscellaneousDir.purchaseActivity;


const genericProcedure = require('../../utils/util-generic-procedure');
const ObjectID = require("mongodb").ObjectId;
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_Key);

// Requiring Mail Controller
const mailController = require('../mail/mailGeneratorController');
console.log(process.env.STRIPE_Key, 'uiwerywiqdsakjdn91213')

/**
 *  DB Find
 *
 * @param {object} defaultParams Contain default params to be recieved from query
 * @param {object} args
 *   An object containing:
 *      -query:
 *      -parameter:
 *
 */
exports.getCart = async (defaultParams, optionalQueryObject) => {
    let query = optionalQueryObject || {};
    let parameterToGet = optionalQueryObject.parameterToGet || "";

    console.log("query to find: ", query);

    // query = [
    //     {
    //         $match: optionalQueryObject._id ? {
    //             _id: ObjectID(optionalQueryObject._id)
    //         } : {}
    //     },
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: "author",
    //             foreignField: "_id",
    //             as: "author"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "types",
    //             localField: "type",
    //             foreignField: "_id",
    //             as: "type"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "certificates",
    //             localField: "certifiedBy",
    //             foreignField: "_id",
    //             as: "certifiedBy"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "categories",
    //             localField: "category",
    //             foreignField: "_id",
    //             as: "category"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "skilllevels",
    //             localField: "skillLevel",
    //             foreignField: "_id",
    //             as: "skillLevel"
    //         }
    //     },
    //     { $unwind: { "path": "$author", "preserveNullAndEmptyArrays": true } },
    //     { $unwind: { "path": "$type", "preserveNullAndEmptyArrays": true } },
    //     { $unwind: { "path": "$certifiedBy", "preserveNullAndEmptyArrays": true } },
    //     { $unwind: { "path": "$skillLevel", "preserveNullAndEmptyArrays": true } },
    //     { $unwind: { "path": "$category", "preserveNullAndEmptyArrays": true } },
    //     {
    //         $lookup: {
    //             from: "curriculums",
    //             localField: "_id",
    //             foreignField: "courseId",
    //             as: "curriculum"
    //         }
    //     },

    //     { $unwind: { "path": "$curriculum", "preserveNullAndEmptyArrays": true } },

    //     {
    //         $lookup: {
    //             from: "sessions",
    //             localField: "curriculum._id",
    //             foreignField: "series",
    //             as: "curriculum.sessionsObject"
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$_id",
    //             "curriculum": { "$push": "$curriculum" },
    //             detail: { $first: '$$ROOT' }
    //         }
    //     },
    //     {
    //         $replaceRoot: {
    //             newRoot: { $mergeObjects: [{ curriculums: '$curriculum' }, '$detail'] },
    //         },
    //     },
    //     {
    //         "$project": {
    //             "featured": 1,
    //             "validity": 1,
    //             "banner": 1,
    //             "subject": 1,
    //             "releaseDate": 1,
    //             "language": 1,
    //             "price": 1,
    //             "title": 1,
    //             "category._id": 1,
    //             "category.categoryNo": 1,
    //             "category.type": 1,
    //             "category.name": 1,
    //             "author.imgUrl": 1,
    //             "author.name": 1,
    //             "type.typeNo": 1,
    //             "type.name": 1,
    //             "shortDescription": 1,
    //             "curriculums": 1,
    //             "certifiedBy.title": 1,
    //             "certifiedBy.certificationOrganization": 1,
    //             "certifiedBy.logo": 1,
    //             "skillLevel.skillLevelNo": 1,
    //             "skillLevel.name": 1
    //         }
    //     }
    // ]


    const args = {
        query,
        parameterToGet,
        defaultParams
    };

    const response = await genericProcedure._baseFetch(modelCart, args);

    return response;
};

exports.getCartDetails = async (defaultParams, optionalQueryObject) => {
    let query = optionalQueryObject || {};
    let parameterToGet = optionalQueryObject.parameterToGet || "";

    query = [
        {
            $match: optionalQueryObject._id ? {
                userId: ObjectID(optionalQueryObject._id)
            } : {}
        },
        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "detail"
            }
        }
    ]

    console.log("query to find: ", query);

    const args = {
        query,
        parameterToGet,
        defaultParams
    };

    const response = await genericProcedure._baseFetch(modelCart, args, "Aggregate");

    return response;
};

exports.createCart = async (obj) => {
    const response = await genericProcedure._basePost(modelCart, obj);

    let responseUser;

    if (response.status)
        responseUser = await addUserCart(obj)

    return responseUser;
};

exports.checkout = async (obj) => {
    const cardResponse = await validateCard(obj.cardDetails);

    var checkoutCart = validateOrder(obj.buyingDetails);

    if (cardResponse === undefined) {
        return {
            status: false,
            message: 'Invalid Card'
        }
    }

   


        const response = await stripe.paymentIntents.create({
            amount: (checkoutCart.amount) * 100,
            currency: checkoutCart.currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

   
    // console.log(response,'ashiewue29r3ur092')

    const checkoutObj = {
        id: response.id
    };

    var dt = new Date();
    var oobbID = new mongoose.Types.ObjectId();
   

        const checkoutPaymentResponse = await checkoutPayment(checkoutObj,cardResponse);

   
   

    const purchaseObj = {
        invoiceNo: `${'INV' + dt.getUTCFullYear() + (dt.getUTCMonth() + 1) + oobbID._id}`,
        purchaseDate: Date.now(),
        amount: checkoutCart.amount,
        currency: checkoutCart.currency,
        cardType: obj.cardDetails.cardType,
        cardNumber: obj.cardDetails.number,
        userId: obj.buyingDetails.user_id,
        courseId: obj.buyingDetails ? obj.buyingDetails.courses ? obj.buyingDetails.courses : [] : [],
        subscriptionId: obj.buyingDetails.subscription !== undefined ? obj.buyingDetails.subscription : [],
        timestamp: Date.now(),
        checkoutKey: checkoutPaymentResponse.client_secret,
        checkoutObj: checkoutPaymentResponse

    };


    const purchaseActivity = await genericProcedure._basePost(modelPurchaseActivity, purchaseObj);

    if (!purchaseActivity.status) {
        return {
            status: false,
            message: 'Error - Updating purchase activity.'
        }
    }

    const userCartResponse = await updateUserCart(obj);



    if (!userCartResponse.status) {
        return {
            status: false,
            message: 'Error - Updating user activity.'
        }
    }


    if (obj.buyingDetails.type == 'subscription') {
        mailController.generateMail({
            _id: obj.buyingDetails.email,
            invoiceNo: purchaseObj.invoiceNo,
            username: obj.cardDetails.name_on_card,
            ordertype: obj.buyingDetails.type,
            ammount: purchaseObj.checkoutObj.amount,
            requestType: 'subscription',

        });
    }
    else if (obj.buyingDetails.type == 'courses') {
        var coursestitles = [];
        for (var i = 0; i < obj.buyingDetails.courses.length; i++) {
            coursestitles.push(obj.buyingDetails.courses[i].title)
        }
        const courseNames = coursestitles.map((items, indx) => items);
        // console.log(courseNames,"iuawhbdbs")
        mailController.generateMail({
            _id: obj.buyingDetails.email,
            username: obj.cardDetails.name_on_card,
            invoiceNo: purchaseObj.invoiceNo,
            ordertype: obj.buyingDetails.type,
            ordername: `${courseNames[0]}`,
            ammount: purchaseObj.checkoutObj.amount,
            requestType: 'courses',

        });

    } else if (obj.buyingDetails.type == 'bundles') {
        var bundletitles = [];
        for (var i = 0; i < obj.buyingDetails.courses.length; i++) {
            bundletitles.push(obj.buyingDetails.courses[i].title)
        }

        const bundlesName = bundletitles.map((items, indx) => items);

        mailController.generateMail({
            _id: obj.buyingDetails.email,
            username: obj.cardDetails.name_on_card,
            invoiceNo: purchaseObj.invoiceNo,
            ordertype: obj.buyingDetails.type,
            ordername: `${bundlesName[0]}`,
            ammount: purchaseObj.checkoutObj.amount,
            requestType: 'bundles',

        });
    }
    else {
        mailController.generateMail({
            _id: obj.buyingDetails.email,
            // username: obj.buyingDetails.name,
            requestType: 'purchase',
            verificationCode: obj.verificationCode,
            _id: obj._id
        });
    }





    return checkoutPaymentResponse;


};

const addUserCart = async (obj) => {
    var args = {
        query: {
            _id: obj.userId
        },
        updateObject: {
            $push: {
                cart: { $each: obj.courseId }
            }
        }
    };

    const response = await genericProcedure._basePut(model, args);

    return response;
}

const updateUserCart = async (obj) => {
    var dates = new Date();
    var currentDate = Date.parse(dates);
    var year = new Date(currentDate).getFullYear();
    var month = new Date(currentDate).getMonth();
    var day = new Date(currentDate).getDate();
    var yearlyDate = new Date(year + 1, month, day);
    var monthlyDate = new Date(year, month + 1, day);
    var currmonthlyDate = new Date(year, month, day);
    var curryearlyDate = new Date(year, month, day);

    var args = {
        query: {
            _id: obj.buyingDetails.user_id
        },
        updateObject: {
            cart: [{
                courseId: obj.buyingDetails ? obj.buyingDetails.courses_id ? obj.buyingDetails.courses_id : '' : '',
                subscriptionType: obj.buyingDetails ? obj.buyingDetails.subscription !== undefined ? obj.buyingDetails.subscription[0].subscriptionType : '' : ''
            }],
            subscription: {
                subscriptionType: obj.buyingDetails ? obj.buyingDetails.subscription !== undefined ? obj.buyingDetails.subscription[0].subscriptionType : '' : '',
                validity: {
                    startsfrom: obj.buyingDetails ? obj.buyingDetails.subscription !== undefined ? obj.buyingDetails.subscription[0].subscriptionType == 'monthly' ? currmonthlyDate : curryearlyDate : '' : '',
                    endsfrom: obj.buyingDetails ? obj.buyingDetails.subscription !== undefined ? obj.buyingDetails.subscription[0].subscriptionType == 'monthly' ? monthlyDate : yearlyDate : '' : '',
                },
                status: true

            },
            name: obj.buyingDetails ? obj.buyingDetails.name !== undefined ? obj.buyingDetails.name : '' : '',
            username: obj.buyingDetails ? obj.buyingDetails.email !== undefined ? obj.buyingDetails.email : '' : '',


        }
    };

    const response = await genericProcedure._basePut(model, args);

    return response;
}

const checkoutPayment = async (obj,pmId) => {
    const response = await stripe.paymentIntents.confirm(
        obj.id,
        {
            payment_method: pmId.id,
            return_url: 'https://learnoda.com'
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
    }


}

const validateOrder = (obj) => {
    return {
        amount: Number(obj.amount),
        currency: obj.currency
    }
}