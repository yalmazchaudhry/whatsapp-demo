import emoji from '../../assets/icons/emoji.png';
import attachment from '../../assets/icons/attachment.png';
import camera from '../../assets/icons/camera.png';
import send from '../../assets/icons/send.png';
import mic from '../../assets/icons/mic.png';
import { useRef, useState } from 'react';
import './index.scss';
import useAutosizeTextArea from '../../hooks/useAutoSizeTextArea.ts';
interface Props {
  onSendMessage: (message: string) => void;
  onTextAreaHeightChange: (height: string) => void;
}
function ChatBox({ onSendMessage, onTextAreaHeightChange }: Props) {
  const [message, setMessage] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, message, onTextAreaHeightChange, 40);

  const sendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <>
      <div className="chat-box-container flex items-center p-4 gap-2">
        <div className="chat-input">
          <img
            className="emoji-btn cursor-pointer"
            src={emoji}
            alt="emoji"
            width={10}
            height={10}
          />
          <textarea
            ref={textAreaRef}
            className="hide-scrollbar"
            value={message}
            placeholder="Type a message"
            onChange={(event) => setMessage(event.target.value)}
            name="message"
          />
          <img
            src={attachment}
            alt="attachment"
            width={10}
            height={9}
            className={`attachment-btn cursor-pointer ${message.length > 0 ? 'on-input' : ''}`}
          />
          {message.length < 1 && (
            <img
              src={camera}
              alt="camera"
              width={10}
              height={9}
              className="camera-btn cursor-pointer"
            />
          )}
        </div>

        {message.length > 0 && (
          <button
            type="button"
            className="mic-btn bg-primary cursor-pointer"
            onClick={sendMessage}
          >
            <img src={send} alt="send" width={7.5} height={10} />
          </button>
        )}
        {message.length < 1 && (
          <button type="button" className="mic-btn bg-primary cursor-pointer">
            <img src={mic} alt="mic" width={7.5} height={10} />
          </button>
        )}
      </div>
    </>
  );
}

export default ChatBox;
