import { useState, useRef, useEffect } from "react";
 
function useVisible() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
 
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };
 
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
 
  return { ref, isVisible, setIsVisible };
}
 
export default useVisible;