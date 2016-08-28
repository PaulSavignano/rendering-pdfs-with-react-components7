import React from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import { Bert } from 'meteor/themeteorchef:bert'
import { insertPDF, removePDF } from '../../api/pdfs/methods'

const handleInsertPDF = (event) => {
  event.preventDefault()
  const title = document.querySelector('[name=title]')
  const body = document.querySelector('[name=body]')
  const image = document.querySelector('[name=image]')
  if (title.value.trim !== '' && body.value.trim() !== '' && image.value.trim() !== '') {
    insertPDF.call({
      title: title.value,
      body: body.value,
      image: image.value,
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

export const AddPDF = () => (
  <form onSubmit={ handleInsertPDF } className="AddPDF">
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
      <FormControl
        name="image"
        type="file"
      />
    </FormGroup>
  </form>
)
