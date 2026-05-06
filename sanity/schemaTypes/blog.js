export default {
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
    },
    {
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
    },
    {
      name: "image",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
        accept: "image/*",
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility",
        },
      ],
    },
    {
      name: "date",
      title: "Publish Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "details",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        },
        {
          type: "object",
          name: "table",
          title: "Table",
          fields: [
            {
              name: "rows",
              title: "Table Rows",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "row",
                  title: "Row",
                  fields: [
                    {
                      name: "cells",
                      title: "Cells",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          name: "cell",
                          title: "Cell",
                          fields: [
                            {
                              name: "content",
                              title: "Cell Content",
                              type: "text",
                            },
                            {
                              name: "isHeader",
                              title: "Is Header Cell",
                              type: "boolean",
                              initialValue: false,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              rows: "rows",
            },
            prepare({ rows }) {
              return {
                title: "Table",
                subtitle: `${rows?.length || 0} row(s)`,
              };
            },
          },
        },
      ],
    },
    {
      name: "excerpt",
      title: "Excerpt (Short Summary)",
      type: "text",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      date: "date",
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
      };
    },
  },
};
