import React from 'react'
import { ListGroup, Alert } from 'react-bootstrap'
import { PDF } from './pdf.js'

export const PDFsList = ({ pdfs }) => (
  pdfs.length > 0 ? <ListGroup className="documents-list">
    {pdfs.map((pdf) => (
      <PDF key={ pdf._id } pdf={ pdf } />
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No PDFs yet.</Alert>
)

PDFsList.propTypes = {
  pdfs: React.PropTypes.array,
}
