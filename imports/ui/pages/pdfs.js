import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { AddPDF } from '../components/add-pdf'
import { PDFsList } from '../components/pdfs-list'

export const PDFs = () => (
  <Row>
    <Col xs={ 12 }>
      <h4 className="page-header">PDFs</h4>
      <AddPDF />
      <PDFsList />
    </Col>
  </Row>
)
