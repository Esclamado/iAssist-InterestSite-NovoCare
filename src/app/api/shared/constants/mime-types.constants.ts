/// Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
/// https://www.iana.org/assignments/media-types/media-types.xhtml

export const MIME_TYPES_OBJ = {
  // application
  'pdf': 'application/pdf',

  // image
  'jpg': 'image/jpeg',
  'png': 'image/png',

};

export const MIME_TYPES_ARR = Object.keys(MIME_TYPES_OBJ).map(k => MIME_TYPES_OBJ[k]);

