import { useState } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import sample from './sample'
import logo from './imgs/logo.png';

const Contacts = ({ contacts, set_contacts }) => {
  const delete_contact = (id) => {
    contacts.splice(id, 1);
    let temp = [...contacts];
    set_contacts(temp);
  }
  return (
    <Accordion defaultActiveKey="">
      {contacts.map((x, index) => {
        return (
          <Card border="info" className='Each' key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
              {x.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>
                <Card.Title>Phone: {x.phone}</Card.Title>
                <Card.Text> Email: {x.email} </Card.Text>
                <Card.Text> Company: {x.company.name} </Card.Text>
                <Card.Text> Website: {x.website} </Card.Text>
                <Button variant="outline-danger" onClick={() => { delete_contact(index) }}>
                  Delete
                </Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )
      })}
    </Accordion>
  )
}

const ShowForm = ({ contacts, set_contacts, handleClose, }) => {
  let new_info = { "name": "", "phone": "", "email": "", "company": { "name": "" }, "website": "" }
  const [info, set_info] = useState(new_info);
  const modify = (name, value, info, set_info) => {
    if (name === "company") info[name]["name"] = value;
    else info[name] = value;
    let temp = { ...info };
    set_info(temp)
  }
  return (
    <>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1" className='Regular'>
            <Form.Label>Name *</Form.Label>
            <Form.Control type="email" placeholder="example" onChange={(e) => {
              modify("name", e.target.value, info, set_info);
            }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1" className='Regular'>
            <Form.Label>Phone Number *</Form.Label>
            <Form.Control type="email" placeholder="1234 567 890" onChange={(e) => {
              modify("phone", e.target.value, info, set_info);
            }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1" className='Regular'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" onChange={(e) => {
              modify("email", e.target.value, info, set_info);
            }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1" className='Regular'>
            <Form.Label>Company</Form.Label>
            <Form.Control type="email" placeholder="example pty ltd" onChange={(e) => {
              modify("company", e.target.value, info, set_info);
            }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1" className='Regular'>
            <Form.Label>Website</Form.Label>
            <Form.Control type="email" placeholder="example.com" onChange={(e) => {
              modify("website", e.target.value, info, set_info);
            }} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-primary" onClick={() => {
          if (info.name === "" || info.phone === "") {
            alert("Name and Phone Number field is mandatory")
          } else {
            contacts.push(info);
            let new_contacts = [...contacts];
            set_contacts(new_contacts)
            handleClose();
          }
        }}>
          Add Contact
        </Button>
      </Modal.Footer>
    </>
  )
}

const App = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [contacts, set_contacts] = useState(sample);
  return (
    <div className="App">
      <div className='Contact_layout'>
            <img src={logo} alt='resonate logo' className='Image' />
        <Jumbotron fluid className='Banner'>
          <Container>
            <h1>Contacts</h1>
          </Container>
        </Jumbotron>
        <Contacts contacts={contacts} set_contacts={set_contacts} />
        <div className="Ontop Add_outer">
          <Button variant="outline-primary Ontop Add"
            onClick={handleShow}
          >+ Add</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className='Regular'>Add Contact</Modal.Title>
            </Modal.Header>
            <ShowForm contacts={contacts} set_contacts={set_contacts}
              handleClose={handleClose}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
