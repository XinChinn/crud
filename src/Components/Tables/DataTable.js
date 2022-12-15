import React, { Component } from 'react'
import { Table } from 'reactstrap';
import ModalForm from '../Modals/Modal'


class DataTable extends Component {

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.title}</td>
          <td>{item.isbn}</td>
          <td>{item.author}</td>
          <td>{item.publisher}</td>
          <td>{item.year_published}</td>
          <td>{item.category}</td>
          <td>
            <div style={{width:"150px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <ModalForm buttonLabel="Delete" item={item.id} deleteItemFromState={this.props.deleteItemFromState}/>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Hobby</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable