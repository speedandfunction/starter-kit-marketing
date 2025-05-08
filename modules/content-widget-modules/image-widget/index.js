import aosSchema from '../../../lib/aosSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    icon: 'image-icon',
    label: 'Image',
    description: 'Display an image on your page',
    previewImage: 'jpg',
    className: 'img-fluid'
  },
  fields: {
    _image: {
      type: 'relationship',
      label: 'apostrophe:image',
      max: 1,
      required: true,
      withType: '@apostrophecms/image'
    },
    width: {
      type: 'range',
      label: 'apostrophe:imageWidth',
      help: 'apostrophe:imageWidthHelp',
      min: 5,
      max: 100,
      step: 5,
      def: 100
    },
    ...aosSchema
  }
};
