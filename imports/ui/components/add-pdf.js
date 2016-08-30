import React, { Component } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import { Bert } from 'meteor/themeteorchef:bert'
import { insertPDF, removePDF } from '../../api/pdfs/methods'

export class AddPDF extends Component {
  constructor(props) {
    super(props)
    this.state = { file: '', imagePreviewUrl: ''}
  }
  handleImageChange(event) {
    event.preventDefault()
    const fileReader = new FileReader()
    const file = event.target.files[0]
    fileReader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: fileReader.result,
      })
    }
    fileReader.readAsDataURL(file)

  }
  handleInsertPDF(event) {
    event.preventDefault()
    const title = document.querySelector('[name=title]')
    const body = document.querySelector('[name=body]')
    const image = document.querySelector('[name=image]')
    if (title.value.trim !== '' && body.value.trim() !== '' && image.value.trim() !== '') {
      insertPDF.call({
        title: title.value,
        body: body.value,
        image: this.state.imagePreviewUrl,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger')
        } else {
          title.value = ''
          body.value = ''
          image.value = ''
          Bert.alert('PDF added!', 'success')
        }
      })
    } else {
      Bert.alert('A title, body, and image are required.', 'danger')
    }
  }
  render() {
    const { imagePreviewUrl } = this.state
    let imagePreview = null
    if (imagePreviewUrl) {
      imagePreview = (
        <img src={ imagePreviewUrl } />
      )
    }
    return (
      <form onSubmit={ this.handleInsertPDF.bind(this) } className="AddPDF">
        <FormGroup>
          <FormControl
            name="title"
            type="text"
            placeholder="Type a title."
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            name="body"
            type="text"
            placeholder="What do you want to say?"
          />
        </FormGroup>
        <FormGroup>
          { imagePreview }
          <FormControl
            onChange={ this.handleImageChange.bind(this) }
            name="image"
            type="file"
          />
        </FormGroup>
        <Button bsStyle="success" type="submit">Add PDF</Button>
      </form>
    )
  }
}
