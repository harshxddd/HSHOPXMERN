import styled from "styled-components";
import Navbar from "../components/Navbar";
import Anouncement from "../components/Anouncement";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout'
import { useState ,useEffect} from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const KEY=import.meta.env.VITE_STRIPE_KEY

const Container = styled.div`
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding:"10px" })}

`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};

`;

const TopTexts = styled.div`
${mobile({ display:"none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection:"Column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
display: flex;
justify-content: space-between;
${mobile({ flexDirection:"Column" })}
`;
const ProductDetail = styled.div`
flex: 2;
display: flex;
margin-top: 50px;

`;
const Image = styled.img`
width: 200px;
`;
const Details = styled.div`
padding: 30px;
display: flex;
flex-direction: column;
justify-content: space-between;



`
const ProductName = styled.div`
margin-bottom: 10px;
`;
const ProductId = styled.div`
margin-bottom: 10px;
`;

const ProductColor=styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color:${props=>props.color};
margin-bottom: 10px;
`
const ProductSize=styled.div``;

const PriceDetail = styled.div`
flex: 1;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

`;
const ProductAmountContainer=styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;


`
const ProductAmount=styled.div`
font-size: 24px;
margin: 5px;
${mobile({ margin:"5px 15px" })}
`
const ProductPrice=styled.div`
font-size: 30px;
font-weight: 200;
${mobile({ marginBottom:"20px" })}

`;

const Hr=styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  `;
  const SummaryTitle=styled.h1`
  font-weight: 200;


  `
  const SummaryItem=styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props=>props.type==="total"&&"500"};
  font-size: ${props=>props.type==="total"&&"24px"};
  
  `
  const SummaryItemText=styled.span``
  const SummaryItemPrice=styled.span``
  const Button=styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  
  `

const Cart = () => {
  const cart = useSelector(state=>state.cart)
  const [stripeToken,setStripeToken]=useState(null)
  const navigate = useNavigate()
  const ontoken=(token)=>{
    setStripeToken(token)

  }
 useEffect(()=>{
const makeRequest =async ()=>{
  try{
const res= await userRequest.post('/checkout/payment',{
  tokenId:stripeToken.id,
  amount : 500,

})

navigate('/success',{data:res.data})
  }

  catch(err){
    console.log(err)
    console.log('error aagya')

  }
}
stripeToken && makeRequest()


 },[stripeToken,cart.total,navigate])
  return (
    <Container>
      <Navbar />
      <Anouncement />

      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your WishList(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
           {cart.products.map(product=>(<Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product</b>{product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b>{product._id}
                  </ProductId>
                  <ProductColor color={product.color}/>
                  <ProductSize>
                    <b>Size: </b>{product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
            <ProductAmountContainer>
                <Add/>
                <ProductAmount>{product.quantity}</ProductAmount>
                <Remove/>
            </ProductAmountContainer>
            <ProductPrice>{product.price * product.quantity}</ProductPrice>

              </PriceDetail>
            </Product>))}
            <Hr/> 
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>{cart.total}</SummaryItemPrice>

            </SummaryItem>
            <SummaryItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>100</SummaryItemPrice>

            </SummaryItem>
            <SummaryItem>
            <SummaryItemText>Shipping Discount</SummaryItemText>
            <SummaryItemPrice>-100</SummaryItemPrice>

            </SummaryItem>
            <SummaryItem type ="total">
            <SummaryItemText >Total</SummaryItemText>
            <SummaryItemPrice>{cart.total}</SummaryItemPrice>

            </SummaryItem>
            <StripeCheckout name ="HSHOPX" image="https://avatars.githubusercontent.com/u/1486366?v=4" 
            billingAddress
            shippingAddress
            description={`Your total is ${cart.total}`}
            amount={cart.total*100}
            token={ontoken}
            stripeKey={KEY}>

              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>

             </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
