import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const aboutData = {
  _type: 'about',
  title: 'About Gyouza',
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'こんにちは！Gyouzaです。'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: ''
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'YouTubeでの音楽配信とバイブコーディングを最近始めました。'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'このブログでは、日々の出来事や'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: '日常で考えることを書いています。'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: ''
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'よろしくお願いします！'
        }
      ]
    }
  ]
}

client.create(aboutData)
  .then((result) => {
    console.log('About page created successfully!')
    console.log(result)
  })
  .catch((error) => {
    console.error('Error creating about page:', error)
  })