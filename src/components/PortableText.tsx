import React from 'react'
import { urlFor } from '../lib/sanity'

interface Block {
  _type: string
  children?: Array<{
    _type: string
    text: string
    marks?: string[]
  }>
  style?: string
  listItem?: string
  asset?: {
    _id: string
    url: string
  }
  alt?: string
}

interface PortableTextProps {
  content: Block[]
}

const PortableText: React.FC<PortableTextProps> = ({ content }) => {
  const renderBlock = (block: Block, index: number) => {
    const { _type, children, style, listItem } = block

    if (_type === 'block') {
      const text = children?.map((child, childIndex) => {
        let element: React.ReactNode = child.text

        if (child.marks?.includes('strong')) {
          element = <strong key={childIndex}>{element}</strong>
        }
        if (child.marks?.includes('em')) {
          element = <em key={childIndex}>{element}</em>
        }
        if (child.marks?.includes('code')) {
          element = <code key={childIndex} className="bg-gray-100 px-1 py-0.5 rounded text-sm">{element}</code>
        }

        return element
      })

      if (listItem === 'bullet') {
        return (
          <li key={index} className="ml-4">
            {text}
          </li>
        )
      }

      if (listItem === 'number') {
        return (
          <li key={index} className="ml-4">
            {text}
          </li>
        )
      }

      switch (style) {
        case 'h1':
          return (
            <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
              {text}
            </h1>
          )
        case 'h2':
          return (
            <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
              {text}
            </h2>
          )
        case 'h3':
          return (
            <h3 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">
              {text}
            </h3>
          )
        case 'h4':
          return (
            <h4 key={index} className="text-lg font-bold text-gray-900 mt-4 mb-2">
              {text}
            </h4>
          )
        case 'blockquote':
          return (
            <blockquote key={index} className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600">
              {text}
            </blockquote>
          )
        default:
          return (
            <p key={index} className="mb-4 leading-relaxed text-gray-700">
              {text}
            </p>
          )
      }
    }

    if (_type === 'image') {
      return (
        <div key={index} className="my-8">
          <img
            src={urlFor(block).width(800).url()}
            alt={block.alt || ''}
            className="w-full rounded-lg shadow-md"
          />
          {block.alt && (
            <p className="text-sm text-gray-500 text-center mt-2">{block.alt}</p>
          )}
        </div>
      )
    }

    return null
  }

  // Group consecutive list items
  const groupedContent: (Block | Block[])[] = []
  let currentList: Block[] = []
  let currentListType: string | null = null

  content.forEach((block) => {
    if (block.listItem) {
      if (currentListType === block.listItem) {
        currentList.push(block)
      } else {
        if (currentList.length > 0) {
          groupedContent.push([...currentList])
        }
        currentList = [block]
        currentListType = block.listItem
      }
    } else {
      if (currentList.length > 0) {
        groupedContent.push([...currentList])
        currentList = []
        currentListType = null
      }
      groupedContent.push(block)
    }
  })

  if (currentList.length > 0) {
    groupedContent.push(currentList)
  }

  return (
    <div className="prose prose-lg max-w-none">
      {groupedContent.map((item, index) => {
        if (Array.isArray(item)) {
          const listType = item[0].listItem
          const ListComponent = listType === 'bullet' ? 'ul' : 'ol'
          const listClassName = listType === 'bullet' ? 'list-disc pl-6' : 'list-decimal pl-6'
          
          return (
            <ListComponent key={index} className={listClassName}>
              {item.map((block, blockIndex) => renderBlock(block, blockIndex))}
            </ListComponent>
          )
        } else {
          return renderBlock(item, index)
        }
      })}
    </div>
  )
}

export default PortableText