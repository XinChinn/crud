import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios"

class AddEditForm extends React.Component {
  state = {
    id: 0,
    title: '',
    isbn: '',
    author: '',
    publisher: '',
    year_published: '',
    category: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    axios('http://localhost/crud/api/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        title: this.state.title,
        isbn: this.state.isbn,
        author: this.state.author,
        publisher: this.state.publisher,
        year_published: this.state.year_published,
        category: this.state.category
      }
    })
      .then(response => response.data)
      .then(item => {
        if(item['status']) {

          this.props.addItemToState(item['data'])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    axios('http://localhost/crud/api/', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: this.state.id,
        title: this.state.title,
        isbn: this.state.isbn,
        author: this.state.author,
        publisher: this.state.publisher,
        year_published: this.state.year_published,
        category: this.state.category
      }
    })
      .then(response => response.data)
      .then(item => {
        if(item['status']) {
  
          this.props.updateState(item['data'])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, title, isbn, author, publisher, year_published, category } = this.props.item
      this.setState({ id, title, isbn, author, publisher, year_published, category })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" onChange={this.onChange} value={this.state.title === null ? '' : this.state.title} />
        </FormGroup>
        <FormGroup>
          <Label for="isbn">ISBN</Label>
          <Input type="text" name="isbn" id="isbn" onChange={this.onChange} value={this.state.isbn === null ? '' : this.state.isbn}  />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input type="text" name="author" id="author" onChange={this.onChange} value={this.state.author === null ? '' : this.state.author}  />
        </FormGroup>
        <FormGroup>
          <Label for="publisher">Publisher</Label>
          <Input type="text" name="publisher" id="publisher" onChange={this.onChange} value={this.state.publisher === null ? '' : this.state.publisher} />
        </FormGroup>
        <FormGroup>
          <Label for="year_published">Year Published</Label>
          <Input type="text" name="year_published" id="year_published" onChange={this.onChange} value={this.state.year_published === null ? '' : this.state.year_published} />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input type="text" name="category" id="category" onChange={this.onChange} value={this.state.category}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm