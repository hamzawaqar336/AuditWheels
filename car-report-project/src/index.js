import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from './MainRoutes/App';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import './index.css';
const stripePromise = loadStripe("pk_live_51LyuMfCSlraB579D1E2ykvL7fWlzmjdh9p9qcLRIHNHpeicouaXnBxUUQ7N1oRv6Ne60QRozNs5e0Za7VpPCAj1i00T2n4mbLt");
ReactDOM.render(
<BrowserRouter>
<Elements stripe={stripePromise}>
<App />
</Elements>
</BrowserRouter>

,
 document.getElementById('root'));