import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Card,Button,Modal,Form} from "react-bootstrap"
import { withAuth0 } from '@auth0/auth0-react';

class FavFruit extends React.Component {
  constructor(props){
    super(props)
    this.state={
      favFruitData:[],
      index:0,
      infoModal:[],
      show:false
    }
  }

  componentDidMount= async ()=>{
    let email=this.props.auth0.user.email
    let favUrl =`${process.env.REACT_APP_BACKEND_URL}/fav-list/${email}`
     await axios.get(favUrl).then(result=>{
        this.setState({
          favFruitData:result.data[0]
        })
        console.log(result.data[0])
      })

  }

deleteFav = async (index)=>{
  let id = this.state.favFruitData[index]._id
  let email =this.props.auth0.user.email
  let deleteUrl = `${process.env.REACT_APP_BACKEND_URL}/delete/${email}/${id}`
  await axios.delete(deleteUrl).then(result=>{
    this.setState({
      favFruitData:result.data
    })
    console.log(result.data)

  })
  this.componentDidMount();
  this.forceUpdate();
}

handleShow=(index)=>{
  this.setState({
    show:true,
    infoModal:this.state.favFruitData[index],
    index:index
  })
}

handleClose=()=>{
  this.setState({
    show:false
  })
}


handleupdate= async(e)=>{
  let id = this.state.favFruitData[index]._id
  let email =this.props.auth0.user.email
  let date ={name: e.target.name.value,
      image: e.target.image.value,
      price: e.target.price.value, }

      let updateUrl =`${process.env.REACT_APP_BACKEND_URL}/update/${email}/${id}`

      await axios.put(updateUrl,data).then(result=>{
        this.setState({
          favFruitData:result.data
        })

      })
       this.componentDidMount();
  this.forceUpdate();
}

  render() {
    return(
      <>
        <h1>My Favorite Fruits</h1>

         <Container>
        <Row>
        {this.state.favFruitData.length > 0 && this.state.favFruitData.map(element,index)=>{
          return(
            <Col>
            <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={element.image} />
  <Card.Body>
    <Card.Title>{element.name}</Card.Title>
    <Card.Text>
      {element.price}
    </Card.Text>
    <Button onClick={()=>this.deleteFav(index)} variant="danger">remove</Button>
    <Button onClick={()=>this.handleShow(index)} variant="primary">Update</Button>
  </Card.Body>
</Card>
            </Col>
          
          )
        } }
        </Row>
        </Container>


        {this.state.show && 
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form onSubmit={()=>this.handleupdate(e)}>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>name</Form.Label>
    <Form.Control type="text" name="name" Value={this.state.infoModal.name} />

    <Form.Label>price</Form.Label>
    <Form.Control type="text" name="price" Value={this.state.infoModal.price} />

    <Form.Label>image</Form.Label>
    <Form.Control type="text" name="image" Value={this.state.infoModal.image} />
    <Button type="submit" variant="primary" >
            Save Changes
          </Button>
  </Form.Group>
 
</Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>}



      </>
    )
  }
}

export default withAuth0(FavFruit);
