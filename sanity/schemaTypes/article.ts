
import { defineField, defineType } from "sanity";

export const article = defineType({
    name: "article",
    title: "Article",
    type: "document",   
    fields: [
        defineField({name: "title",  type: "string"}),
        defineField({name: "slug",  type: "slug",options: {source: "title"}}),
       
       defineField({name: "author",  type: "reference", to: [{type: "author"}]}),
       defineField({name: "views",  type: "number"}),
       defineField({name: "summary",  type: "text"}),
       defineField({name: "category",  type: "string", validation: (Rule) => Rule.min(1).max(100).required().error('Category is required')}),
       defineField({name: "image",  type: "url", validation: (Rule) => Rule.required()}),
       defineField({name: "body",  type: "markdown"}),
    ],
  
})