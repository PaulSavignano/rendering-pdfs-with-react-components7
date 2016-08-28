import { PDFs } from './pdfs';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';

export const insertPDF = new ValidatedMethod({
  name: 'pdfs.insert',
  validate: new SimpleSchema({
    title: { type: String },
    body: { type: String },
    image: { type: String },
  }).validator(),
  run(pdf) {
    PDFs.insert(pdf);
  },
});

export const removePDF = new ValidatedMethod({
  name: 'pdfs.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    PDFs.remove(_id);
  },
});

rateLimit({
  methods: [
    insertPDF,
    removePDF,
  ],
  limit: 5,
  timeRange: 1000,
});
