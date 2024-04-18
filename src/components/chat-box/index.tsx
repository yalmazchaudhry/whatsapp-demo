import emoji from '../../assets/icons/emoji.png';
import attachment from '../../assets/icons/attachment.png';
import camera from '../../assets/icons/camera.png';
import send from '../../assets/icons/send.png';
import mic from '../../assets/icons/mic.png';
import { useState } from 'react';
import './index.scss';
interface Props {
  onSendMessage: (message: string) => void;
}
function ChatBox({ onSendMessage }: Props) {
  const [message, setMessage] = useState<string>('');

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
            className="emoji-btn"
            src={emoji}
            alt="emoji"
            width={10}
            height={10}
          />
          <input
            value={message}
            placeholder="Type a message"
            type="text-box"
            onChange={(event) => setMessage(event.target.value)}
            name="message"
          />
          <img
            src={attachment}
            alt="attachment"
            width={10}
            height={9}
            className={`attachment-btn ${message.length > 0 ? 'on-input' : ''}`}
          />
          {message.length < 1 && (
            <img
              src={camera}
              alt="camera"
              width={10}
              height={9}
              className="camera-btn"
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
