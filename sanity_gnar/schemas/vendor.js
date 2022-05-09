import {MdSell} from 'react-icons/md'

export default {
    name: "vendor",
    title: "Vendor",
    type: "document",
    icon: MdSell,
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        name: "logo",
        title: "logo",
        type: 'array',
      of: [{ type: 'image' }],
        },
      {
        name: "description",
        title: "Description",
        type: "blockContent",
      },
    ],
    preview: {
      select: {
        title: "title",
        media: "logo",
      },
    },
  };