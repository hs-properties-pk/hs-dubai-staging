export default {
  name: 'offPlanProperty',
  title: 'Off-Plan Property',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Property URL Slug',
      type: 'slug',
      description: 'This slug is THE single source of truth used throughout the website. It will create the URL: /properties/off-plan/[this-slug]. Auto-generated from "Full Title" but can be edited. Once set, use this exact slug everywhere.',
      options: {
        source: 'fullTitle',
        maxLength: 96,
        slugify: (input) => 
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
            .substring(0, 96)
      },
      validation: Rule => Rule.required().custom((slug) => {
        if (!slug?.current) {
          return 'Slug is required'
        }
        // Validate slug format
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
          return 'Slug must contain only lowercase letters, numbers, and hyphens'
        }
        return true
      })
    },
    {
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description: 'Title for search engines and browser tabs',
      validation: Rule => Rule.required()
    },
    {
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      description: 'Description for search engines',
      validation: Rule => Rule.required()
    },
    {
      name: 'coverPhoto',
      title: 'Cover Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'array',
      description: 'Multiple locations can be added (e.g., UAE, Dubai, Palm Jebel Ali)',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'name', 
              type: 'string', 
              title: 'Location Name',
              validation: Rule => Rule.required()
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'fullTitle',
      title: 'Full Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Apartment', value: 'Apartment' },
          { title: 'Villa', value: 'Villa' },
          { title: 'Townhouse', value: 'Townhouse' },
          { title: 'Penthouse', value: 'Penthouse' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'rooms',
      title: 'Rooms',
      type: 'string',
      description: 'e.g., "Studio, 1, 2, 4 & 5"'
    },
    {
      name: 'area',
      title: 'Area',
      type: 'string',
      description: 'e.g., "Various Sizes" or "500 sqft - 2000 sqft"'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Price as string (e.g., "2,500,000")',
      validation: Rule => Rule.required()
    },
    {
      name: 'photos',
      title: 'Gallery Photos',
      type: 'array',
      description: 'Multiple pictures can be added',
      of: [{ 
        type: 'image',
        options: {
          hotspot: true,
        }
      }]
    },
    {
      name: 'geography',
      title: 'Location Coordinates',
      type: 'object',
      description: 'User will add 2 coordinates (latitude and longitude)',
      fields: [
        { 
          name: 'lat', 
          type: 'number', 
          title: 'Latitude',
          validation: Rule => Rule.required()
        },
        { 
          name: 'lng', 
          type: 'number', 
          title: 'Longitude',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Main content area with rich text formatting (headings, lists, links, etc.)',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text'
            }
          ]
        }
      ]
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      description: 'Multiple FAQs with question and answer',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: Rule => Rule.required()
            }
          ]
        }
      ]
    },
    {
      name: 'paymentPlans',
      title: 'Payment Plans',
      type: 'array',
      description: 'Two payment plans: During Construction and On Handover',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'e.g., "During Construction" or "On Handover"',
              validation: Rule => Rule.required()
            },
            {
              name: 'valuePercentage',
              title: 'Value Percentage',
              type: 'number',
              description: 'Percentage value (e.g., 80 for 80%)',
              validation: Rule => Rule.required().min(0).max(100)
            }
          ]
        }
      ],
      validation: Rule => Rule.max(2)
    },
    {
      name: 'brochure',
      title: 'Brochure',
      type: 'file',
      description: 'Upload PDF brochure file. The filename doesn\'t matter - it will be automatically linked to this property using the slug above.',
      options: {
        accept: '.pdf'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'coverPhoto'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Property',
        subtitle: subtitle ? `URL: /properties/off-plan/${subtitle}` : 'No slug set',
        media: media
      }
    }
  }
}
