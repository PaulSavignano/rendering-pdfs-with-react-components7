import { Meteor } from 'meteor/meteor'
import { PDFs } from '../pdfs'

Meteor.publish('pdfs', () => PDFs.find())
