import React, { Component } from 'react'
import Navbar from '../../MainRoutes/components/navbar/Navbar2';
import Footer from '../../MainRoutes/components/footer/Footers';
import { Breadcrumb, Divider, Col, Row, Input, Card, Typography, Button, Modal } from 'antd';
import { PaymentInputsContainer } from 'react-payment-inputs';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import visa from '../../MainRoutes/assets/visa.png';
import master from '../../MainRoutes/assets/master.png';
import paypal from '../../MainRoutes/assets/paypal.png';
import "./checkout.css";
import axios from 'axios';
import Alert from 'react-s-alert';
export class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expiry: '',
      focus: '',
      name: '',
      number: '',
      modalvisible: false,
      cartData: [],
      checkout: false,
      clientSecret: '',
      isLoading: '',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      cardType: '',
      disable: false,
      tabs: 'courses',
      loader: false,
      video: '',
      newsletter: false,
      // subscription: params && params.subscribe || localStorage.getItem('subscribe'),
      visible: false,
      purchaseData: {},
      current: 0,
      minIndex: 0,
      maxIndex: 0,
      email: '',
      fullname: '',
      country: "",
      city: '',
      postalCode: '',
      phone: '',
      vinNumber: '',
      models: false


    }
    const ssRs = localStorage.getItem("PackagePrice");
    console.log(ssRs, 'sadiwi39ru2093u40932wlka')
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log("lkadsjlksajlksajpoq", this.props);
  }
  handleCheckoutPayment = async (e) => {

    const { cardName, cardNumber, expiryDate, cvc, cardType, email, fullname, country, city, postalCode, phone, vinNumber } = this.state;
    const ssR = localStorage.getItem("PackagePrice");
    e.preventDefault();

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (cardName == '' || cardNumber == '' || expiryDate == '' || cvc == '' || cardType == '' || email == '' || fullname == '' || country == '' || city == '' || postalCode == '' || phone == '' || vinNumber == '') {
      Alert.error("Please Fill All Required Fields.")
    }
    else if (!email.match(mailformat)) {
      Alert.error("Email Is Not Correct Please Type Standard Format Email.");

    } else {
      // Alert.success('Successfully Order');

      const obj = {
        cardDetails: {
          cardType,
          name_on_card: cardName,
          number: cardNumber,
          exp_month: expiryDate.slice(0, 2),
          exp_year: expiryDate.slice(5),
          cvc,
        },
        buyingDetails: {
          amount: ssR,
          currency: 'usd'
        },
        userDetails: {
          fullname: fullname,
          email: email,
          country: country,
          city: city,
          phone: phone,
          vinNumber: vinNumber

        }
      }



      const res = await axios.post("/checkout", obj).then((response) => {
        if (response.data.status == true) {

          console.log(response, 'lksajdjq993');
          Alert.success("Payment Accepted.! Congratulations.")
          this.setState({
            models: true
          })


        } else if (response.data.status == false) {

          Alert.error("Payment Rejected");
        }
        else {
          Alert.success("Payment Accepted.! Congratulations.")
          this.setState({
            models: true
          })
        }



      }).catch(error => {

        console.log(error, 'Checkout Api Return Error')
        Alert.error("Invalid Card")

      });


    }

  }


  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });

  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    const { cardName, cardNumber, expiryDate, cvc, cardType, email, fullname, country, city, postalCode, phone, vinNumber } = this.state;
    const ssRT = localStorage.getItem("PackagePrice");

    const { Title, Text } = Typography;
    console.log(this.state.name, 'iuwqeoiqwue8922');
    const handleOk = () => {
      this.setState({
        models: false
      });
      window.location.reload()
    };
    const handleCancel = () => {
      this.setState({
        models: false
      });
      window.location.reload()
    };
    return (
      <div>

        <Navbar />

        <div>
          <div style={{ height: '5vh', marginTop: 10, marginLeft: 2 }}>
            {/* <Breadcrumb

              items={[
                {
                  title: <a href="/">Home</a>,
                },

                {
                  title: 'Pricing',
                },
                {
                  title: 'Checkout',
                },
              ]}
            /> */}
          </div>

        </div>

        <div>
          <Divider plain><h2>Checkout!</h2></Divider>
        </div>

        <div>
          <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

            <Col span={12} lg={12} md={12} sm={24} xs={24} >
             
                {/* <p style={{ textIndent: '-9999px' }}>salkjdalksjdlksajd</p>
                <p style={{ textIndent: '-9999px' }}>salkjdalksjdlksajd</p>
                <p style={{ textIndent: '-9999px' }}>salkjdalksjdlksajd</p> */}

                {/* <div style={{border:'2px solid black',marginLeft:40,height:"15vh",width:"50%"}}>

                </div> */}

            
              <div className="container">
                <div style={{marginLeft:10,height:"10vh",backgroundColor:"#C0C0C0",textAlign:"center"}}>
                  <h2 className='lls' style={{fontSize:40}}>You Have Selected {ssRT==30?'30$ Basic':ssRT==40?'40$ Silver':ssRT==50?'50$ Gold':''} Package</h2>

                </div>
                <form id="contact" action="" method="post">
                  <p style={{ color: "red" }}>* Please Fill Full Form In Order To Proceed This Transaction</p>
                  <h3>Personal Info!</h3>
                  <h4 style={{ color: "green" }}>for checkout purpose</h4>
                  <fieldset>
                    <input placeholder="Full Name" type="text" tabindex="1" required autofocus onChange={(e) => this.setState({ fullname: e.target.value })} value={fullname} />
                  </fieldset>
                  <fieldset>
                    <input placeholder="Email Address" type="email" tabindex="2" required onChange={(e) => this.setState({ email: e.target.value })} value={email} />
                  </fieldset>
                  <fieldset>
                    <input placeholder="Country" type="url" tabindex="3" required onChange={(e) => this.setState({ country: e.target.value })} value={country} />
                  </fieldset>
                  <fieldset>
                    <input placeholder="City" type="url" tabindex="4" required onChange={(e) => this.setState({ city: e.target.value })} value={city} />
                  </fieldset>
                  <fieldset>
                    <input placeholder="Postal Code" type="url" tabindex="5" required onChange={(e) => this.setState({ postalCode: e.target.value })} value={postalCode} />
                  </fieldset>
                  <fieldset>
                    <input placeholder="Phone" type="url" tabindex="6" required onChange={(e) => this.setState({ phone: e.target.value })} value={phone} />
                  </fieldset>
                  <fieldset>
                    <input placeholder="VIN#" type="url" tabindex="7" required onChange={(e) => this.setState({ vinNumber: e.target.value })} value={vinNumber} />
                  </fieldset>
                  {/* <fieldset>
      <textarea placeholder="Type your message here...." tabindex="5" required></textarea>
    </fieldset> */}

                </form>
              </div>

            </Col>


            <Col lg={12} md={12} sm={24} xs={24} className='checkoutCol'>
              {/* <p style={{ color: "#ffff", marginLeft: 10, fontSize: 20, marginBottom: 5 }}>Payment Information!</p> */}
              <div id="PaymentForm">

                <div style={{ marginRight: 200 }}>

                  <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiryDate}
                    focused={this.state.focus}
                    name={this.state.cardName}
                    number={this.state.cardNumber}
                    acceptedCards={['visa', 'mastercard']}
                  />
                </div>


                {/* work test case */}


                <Card title="Payment Info" className='payment-info-panel'>

                  <Card.Grid style={{ paddingBottom: 0 }} hoverable={false}>
                    <h4 style={{ color: 'white', fontWeight: 'bold' }}>Select Payment Method</h4>

                    <div className='flex-Wraper' style={{ marginTop: '16px' }}>

                      <div onClick={() => this.setState({ cardType: 'mastercard' })} style={{ border: cardType == 'mastercard' ? '1.5px solid #ffffff' : null, width: '135px', height: '72px', borderRadius: '8px', marginRight: '10px', background: '#313237', backgroundImage: `url(${master})`, backgroundSize: 'auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>

                      <div onClick={() => this.setState({ cardType: 'visa' })} style={{ border: cardType == 'visa' ? '1.5px solid #ffffff' : null, width: '135px', height: '72px', borderRadius: '8px', marginRight: '10px', background: '#181818', backgroundImage: `url(${visa})`, backgroundSize: 'auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>

                      <div onClick={() => this.setState({ cardType: 'paypal' })} style={{ border: cardType == 'paypal' ? '1.5px solid #ffffff' : null, width: '135px', height: '72px', borderRadius: '8px', background: '#313237', backgroundImage: `url(${paypal})`, backgroundSize: 'auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                    </div>
                  </Card.Grid>

                  <Card.Grid style={{}} hoverable={false}>
                    <h4 style={{ color: 'white', fontWeight: 'bold' }}>Name on Card</h4>

                    <input placeholder="Type your name" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', outline: 0, color: '#ffffff', }} onChange={(e) => { this.setState({ cardName: e.target.value }) }} value={cardName} />
                    <hr style={{ border: '1px solid grey', marginTop: 20 }} />
                  </Card.Grid>



                  <PaymentInputsContainer>
                    {({ meta, getCardNumberProps, getExpiryDateProps, getCVCProps }) => (

                      <div style={{}}>

                        <Card.Grid style={{}} hoverable={false}>

                          <h4 style={{ color: 'white', fontWeight: 'bold' }}>Card Number</h4>

                          <input style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', outline: 0, color: '#ffffff', }} {...getCardNumberProps({ onChange: (e) => { this.setState({ cardNumber: e.target.value }) } })} placeholder="Type your Card" value={cardNumber} />

                          <hr style={{ border: '1px solid grey', marginTop: 20, width: "70%" }} />

                        </Card.Grid>

                        <Card.Grid style={{ display: 'flex', flexDirection: 'row' }} hoverable={false}>
                          <div>
                            <h4 style={{ color: 'white', fontWeight: 'bold' }}>Expiration Date</h4>
                            <input style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', outline: 0, color: '#ffffff', }} {...getExpiryDateProps({ onChange: (e) => { this.setState({ expiryDate: e.target.value }) } })} value={expiryDate} />
                          </div>

                          <div>
                            <h4 style={{ color: 'white', fontWeight: 'bold' }}>CVC</h4>
                            <input style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', outline: 0, color: '#ffffff', }} {...getCVCProps({ onChange: (e) => { console.log(e.target.value, 'e____value'); this.setState({ cvc: e.target.value }) } })} value={cvc} />
                          </div>
                        </Card.Grid>
                        {meta.isTouched && meta.error && <span style={{ paddingLeft: 30, color: 'red' }}>{meta.error}</span>}
                      </div>
                    )}
                  </PaymentInputsContainer>

                  <Card.Grid hoverable={false} style={{ textAlign: 'center' }}>
                    {

                      <Button
                        onClick={this.handleCheckoutPayment}
                        size={'large'}
                        className='checkout-btn'
                        disabled={(cardName && cardType && cardNumber.length >= 19 && expiryDate.length >= 7 && cvc.length >= 3 && email !== '' && fullname !== '' && country !== '' && city !== '' && postalCode !== '' && phone !== '' && vinNumber !== '') ? false : true}
                      >
                        Place Order
                      </Button>
                    }
                    <Text style={{ fontSize: '12px', marginTop: '14px', display: 'block', color: '#87888a' }}>All transactions are made in USD based on the average of the daily exchange rate.</Text>
                  </Card.Grid>

                </Card>
                <br /><br />





              </div>

            </Col>


          </Row>
        </div>

        <div className='footer'>

          <Footer />
        </div>
        <Alert position='bottom-left' effect='slide' stack={{ limit: 3 }} />
        <Modal title="Confirmation Of Transaction." open={this.state.models} onOk={handleOk} onCancel={handleCancel}>
          <p>Congratulations Your Transaction Successfully Made!.</p>


        </Modal>
      </div>
    )
  }
}

export default Checkout
