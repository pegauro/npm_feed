import sanitizeHtml from 'sanitize-html';

export const removeHtmlTags = (str : any) => {
    let clean = sanitizeHtml(str,{
      allowedTags: [],
      allowedAttributes: {}
    });
    return clean;
  };