import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { PDFs } from '../pdfs'
import { generateComponentAsPDF } from '../../../modules/server/generate-pdf'
import { PDF } from '../../../ui/components/pdf'
import { rateLimit } from '../../../modules/rate-limit'

export const downloadPDF = new ValidatedMethod({
  name: 'pdfs.download',
  validate: new SimpleSchema({
    pdfId: { type: String },
  }).validator(),
  run({ pdfId }) {
    const pdf = PDFs.findOne({ _id: pdfId })
    const fileName = `pdf_${pdf._id}.pdf`
    return generateComponentAsPDF({ component: PDF, props: { pdf }, fileName })
    .then((result) => result)
    .catch((error) => {
      throw new Meteor.Error('500', error)
    })
  }
})

rateLimit({
  methods: [
    downloadPDF,
  ],
  limit: 1,
  timeRange: 1000,
})
