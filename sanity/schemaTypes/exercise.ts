import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export default defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Exercise Name',
      description: 'The name of the exercise',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Detailed description of how to perform the exercise',
      type: 'text'
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      description: 'The difficulty level of the exercise',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Exercise Image',
      description: 'Image showing the exercise demonstration',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          description: 'Alternative text describing the exercise image for accessibility',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description: 'URL link to the exercise demonstration video',
      type: 'string'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      description: 'Whether this exercise is currently available in the app',
      type: 'boolean',
      initialValue: true
    })
  ]
})