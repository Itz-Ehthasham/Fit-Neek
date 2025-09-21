import {defineField, defineType, defineArrayMember} from 'sanity'
import {ActivityIcon} from '@sanity/icons'

export default defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  icon: ActivityIcon,
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      description: 'The Clerk user ID of the person who performed this workout',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Workout Date',
      description: 'The date when this workout was performed',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      description: 'Total workout duration in seconds',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'exercises',
      title: 'Exercises',
      description: 'List of exercises performed in this workout with sets, reps and weights',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'workoutExercise',
          fields: [
            defineField({
              name: 'exercise',
              title: 'Exercise',
              description: 'Reference to the exercise performed',
              type: 'reference',
              to: [{type: 'exercise'}],
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'sets',
              title: 'Sets',
              description: 'Array of sets performed for this exercise',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'set',
                  fields: [
                    defineField({
                      name: 'reps',
                      title: 'Repetitions',
                      description: 'Number of repetitions performed',
                      type: 'number',
                      validation: Rule => Rule.required().min(1)
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      description: 'Weight used for this exercise',
                      type: 'number',
                      validation: Rule => Rule.min(0)
                    }),
                    defineField({
                      name: 'weightUnit',
                      title: 'Weight Unit',
                      description: 'Unit of measurement for the weight',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Pounds (lbs)', value: 'lbs'},
                          {title: 'Kilograms (kg)', value: 'kg'}
                        ]
                      },
                      initialValue: 'lbs'
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      date: 'date',
      duration: 'duration',
      exerciseCount: 'exercises'
    },
    prepare({date, duration, exerciseCount}) {
      const workoutDate = new Date(date).toLocaleDateString()
      const durationMinutes = Math.round(duration / 60)
      const exerciseTotal = exerciseCount?.length || 0
      
      return {
        title: `Workout - ${workoutDate}`,
        subtitle: `${durationMinutes} min • ${exerciseTotal} exercises`
      }
    }
  }
})