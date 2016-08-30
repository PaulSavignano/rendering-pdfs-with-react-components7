import React from 'react'
import InlineCss from 'react-inline-css'
import { Button, ListGroupItem } from 'react-bootstrap'
import fileSaver from 'file-saver'
import { Meteor } from 'meteor/meteor'
import { Bert } from 'meteor/themeteorchef:bert'
import { base64ToBlob } from '../../modules/base64-to-blob'
import { removeDocument } from '../../api/documents/methods'

const downloadPDF = (event) => {
  event.preventDefault()
  const { target } = event
  const pdfId = target.getAttribute('data-id')
  target.innerHTML = '<em>Downloading...</em>'
  target.classList.add('downloading')
  Meteor.call('pdfs.download', { pdfId }, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      const blob = base64ToBlob(response.base64)
      fileSaver.saveAs(blob, response.fileName)
      target.innerHTML = 'Download'
      target.classList.remove('downloading')
    }
  })
}

const removePDF = (event) => {
  event.preventDefault()
  const { target } = event
  const pdfId = target.getAttribute('data-id')
  removeDocument.call({
    _id: pdfId,
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      Bert.alert('Document removed.', 'danger')
    }
  })
}

export const PDF = ({ pdf }) => (
  <InlineCss stylesheet={`
    .PDF {
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    }
    @media print {
    .PDF {
    display: block;
    border: 1px solid blue;
    padding: 20px;
    }
    .btn {
    display: none;
    }
    hr {
    display: none;
    }
    h3 {
    font-size: 28px;
    margin-top: 0px;
    margin-bottom: 0px;
    }
    p {
    margin-top: 10px;
    margin-bottom: 0px;
    font-size: 18px;
    }
    }
  `}>
    <ListGroupItem className="PDF">
      <Button data-id={ pdf._id } bsStyle="success" onClick={ downloadPDF }>Download</Button>
      <Button data-id={ pdf._id } bsStyle="danger" onClick={ removePDF }>Remove</Button>
      <hr/>
      <h3>{ pdf.title }</h3>
      <p>{ pdf.body }</p>
      <img src={ pdf.image }/>
    </ListGroupItem>
  </InlineCss>
)

PDF.propTypes = {
  pdf: React.PropTypes.object.isRequired,
}
