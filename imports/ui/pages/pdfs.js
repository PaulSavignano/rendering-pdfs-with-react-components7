import React from 'react'
import { Row, Col } from 'react-bootstrap'
import PDFsList from '../components/pdfs-list'
import { AddPDF } from '../components/pfd'

export const PDF = () => (
  <Row>
    <Col xs={ 12 }>
      <h4 className="page-header">PDFs</h4>
      <AddPDF />
      <PDFsList />
    </Col>
  </Row>
)
