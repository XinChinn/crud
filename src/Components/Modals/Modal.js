import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import AddEditForm from '../Forms/FormAddEdit'
import axios from "axios"

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  deleteItem = id => {
    console.log(id);
    axios('http://localhost/crud/api/', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id
      }
    })
      .then(response => response.data)
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
  }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

      const label = this.props.buttonLabel

      let button = ''
      let title = ''
      let body = ''
       
      if(label === 'Edit'){
        button = <Button
                  color="warning"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Edit Item'
      } else if(label === 'Delete') {
        button = <Button
                  color="danger"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Delete Item'
      } else {
        button = <Button
                  color="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Add New Item'
      }

      if(label === 'Delete') {
        body = <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          <div className="alert alert-danger">Delete This Item Forever</div>
        </ModalBody>
        <ModalFooter>
        <Button color="warning" onClick={this.toggle}>
            Cancel
          </Button>
          <Button color="danger" onClick={() => this.deleteItem(this.props.item)}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      } 
      else
      {
        body = <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          <AddEditForm
            addItemToState={this.props.addItemToState}
            updateState={this.props.updateState}
            deleteItemFromState={this.props.deleteItemFromState}
            toggle={this.toggle}
            item={this.props.item} />
        </ModalBody>
      </Modal>
      }

      return (
      <div>
        {button}
        {body}
      </div>
    )
  }
}

export default ModalForm