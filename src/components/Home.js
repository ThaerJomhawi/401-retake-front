import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import {Container,Row,Col,Card,Button} from "react-bootstrap"

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      allfruitData:[]
    }
  }

  componentDidMount=()=>{
    const{user,isAuthenticated}=this.props.auth0
    if (isAuthenticated){
      let apiUrl =`${process.env.REACT_APP_BACKEND_URL}/retrieve`
      axios.get(apiUrl).then(result=>{
        this.setState({
          allfruitData:result.data
        })
        console.log(result.data)
      })
    }
  }

  addToFav = (index)=>{
    let data = { name: this.state.allfruitData[index].name,
      image: this.state.allfruitData[index].image,
      price: this.state.allfruitData[index].price,}

      let email = this.props.auth0.user.email
      let addUrl =`${process.env.REACT_APP_BACKEND_URL}/create/${email}`
      axios.post(addUrl,data).then(result=>{
        console.log(result.data)
      })
  }

  render() {
    return (
      <>
        <h1>API Fruits</h1>
        <Container>
        <Row>
        {this.state.allfruitData.length > 0 && this.state.allfruitData.map(element,index)=>{
          return(
            <Col>
            <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={element.image} />
  <Card.Body>
    <Card.Title>{element.name}</Card.Title>
    <Card.Text>
      {element.price}
    </Card.Text>
    <Button onClick={()=>this.addToFav(index)} variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
            </Col>
          
          )
        } }
        </Row>
        </Container>
      </>
    )
  }
}

export default withAuth0(Home);
