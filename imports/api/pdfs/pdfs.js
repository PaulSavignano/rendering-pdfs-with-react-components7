import faker from 'faker'
import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Factory } from 'meteor/dburles:factory'

export const PDFs = new Mongo.Collection('PDFs')

PDFs.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
})

PDFs.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})

PDFs.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the pdf.',
  },
  body: {
    type: String,
    label: 'The body of the pdf.',
  },
  image: {
    type: String,
    label: 'The image of the pdf.',
  },
})

PDFs.attachSchema(PDFs.schema)

Factory.define('pdf', PDFs, {
  title: () => faker.hacker.phrase(),
})
