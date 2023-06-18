export interface DbPost {
    object: string
    id: string
    created_time: string
    last_edited_time: string
    created_by: CreatedBy
    last_edited_by: LastEditedBy
    cover: any
    icon: any
    parent: Parent
    archived: boolean
    properties: Properties
    url: string
    public_url: any
  }
  
  export interface CreatedBy {
    object: string
    id: string
  }
  
  export interface LastEditedBy {
    object: string
    id: string
  }
  
  export interface Parent {
    type: string
    database_id: string
  }
  
  export interface Properties {
    ClickUp: ClickUp
    Cover: Cover
    Number: Number
    "Last edited time": LastEditedTime
    Slug: Slug
    Published: Published
    Date: Date
    Category: Category
    Page: Page
  }
  
  export interface ClickUp {
    id: string
    type: string
    rich_text: RichText[]
  }
  
  export interface RichText {
    type: string
    text: Text
    annotations: Annotations
    plain_text: string
    href: string
  }
  
  export interface Text {
    content: string
    link: Link
  }
  
  export interface Link {
    url: string
  }
  
  export interface Annotations {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  
  export interface Cover {
    id: string
    type: string
    files: File[]
  }
  
  export interface File {
    name: string
    type: string
    external: External
  }
  
  export interface External {
    url: string
  }
  
  export interface Number {
    id: string
    type: string
    number: any
  }
  
  export interface LastEditedTime {
    id: string
    type: string
    last_edited_time: string
  }
  
  export interface Slug {
    id: string
    type: string
    rich_text: RichText2[]
  }
  
  export interface RichText2 {
    type: string
    text: Text2
    annotations: Annotations2
    plain_text: string
    href: any
  }
  
  export interface Text2 {
    content: string
    link: any
  }
  
  export interface Annotations2 {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  
  export interface Published {
    id: string
    type: string
    checkbox: boolean
  }
  
  export interface Date {
    id: string
    type: string
    date: Date2
  }
  
  export interface Date2 {
    start: string
    end: any
    time_zone: any
  }
  
  export interface Category {
    id: string
    type: string
    multi_select: MultiSelect[]
  }
  
  export interface MultiSelect {
    id: string
    name: string
    color: string
  }
  
  export interface Page {
    id: string
    type: string
    title: Title[]
  }
  
  export interface Title {
    type: string
    text: Text3
    annotations: Annotations3
    plain_text: string
    href: any
  }
  
  export interface Text3 {
    content: string
    link: any
  }
  
  export interface Annotations3 {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  