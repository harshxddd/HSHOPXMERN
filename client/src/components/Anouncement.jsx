import styled from "styled-components"

const Container =styled.div`
display: flex;
align-items: center;
justify-content: center;

height:30px;
background-color: teal;
color:white;

font-size: 20px;
font-weight: 500;

`;

const Anouncement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Anouncement;