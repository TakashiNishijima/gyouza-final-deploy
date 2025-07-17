export default {
  name: 'linkCard',
  title: 'Link Card',
  type: 'object',
  fields: [
    { name: 'url',  title: 'URL',  type: 'url',    validation: Rule => Rule.required() },
    { name: 'title',       type: 'string' },
    { name: 'description', type: 'text'   },
    { name: 'image',       type: 'image', options: { hotspot: true } }
  ],
  preview: {
    select: { title: 'title', media: 'image' }
  }
}