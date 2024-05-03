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
  useAutosizeTextArea(textAreaRef.current, message, onTextAreaHeightChange, 96);

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
            width={20}
            height={20}
          />
          <textarea
            disabled={true}
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
            width={20}
            height={20}
            className={`attachment-btn cursor-pointer ${message.length > 0 ? 'on-input' : ''}`}
          />
          {message.length < 1 && (
            <img
              src={camera}
              alt="camera"
              width={20}
              height={20}
              className="camera-btn cursor-pointer"
            />
          )}
        </div>

        <div className="flex pb-5 align-self-end">
          {message.length > 0 && (
            <button
              type="button"
              className="mic-btn bg-primary cursor-pointer"
              onClick={sendMessage}
            >
              <img src={send} alt="send" width={10} height={13} />
            </button>
          )}
          {message.length < 1 && (
            <button type="button" className="mic-btn bg-primary cursor-pointer">
              <img src={mic} alt="mic" width={10} height={13} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatBox;
