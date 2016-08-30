import { composeWithTracker } from 'react-komposer';
import { PDFs } from '../../api/pdfs/pdfs.js';
import { PDFsList } from '../components/pdfs-list.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('pdfs');
  if (subscription.ready()) {
    const pdfs = PDFs.find().fetch();
    onData(null, { pdfs });
  }
};

export default composeWithTracker(composer, Loading)(PDFsList);
