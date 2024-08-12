import React from 'react'
import markdownit from 'markdown-it'
import DOMPurify from 'dompurify';

const md = markdownit();

const Markdown = ({ text }) => {
    
    const htmlcontent = md.render(text); 
    const sanitized = DOMPurify.sanitize(htmlcontent)
    
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>
  )
}

export default Markdown