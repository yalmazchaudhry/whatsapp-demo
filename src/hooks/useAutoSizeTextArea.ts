import { useEffect } from 'react';

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
  onTextAreaHeightChange: (height: string) => void,
  maxHeight?: number,
) => {
  useEffect(() => {
    if (textAreaRef) {
      const currentHeight = parseInt(
        textAreaRef.style.height.replace('px', ''),
      );
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;
      if (maxHeight && scrollHeight <= maxHeight) {
        textAreaRef.style.height = scrollHeight + 'px';
      } else {
        textAreaRef.style.height = currentHeight + 'px';
      }
      onTextAreaHeightChange(textAreaRef.style.height);
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
