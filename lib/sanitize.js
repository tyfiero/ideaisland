// import DOMPurify from "dompurify";
import DOMPurify from 'isomorphic-dompurify';

export default function sanitize(html) {
  let cleaned = DOMPurify.sanitize(html);

  return cleaned;
}
