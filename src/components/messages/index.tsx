import { Message } from '../../types/common.ts';
import pin from '../../assets/icons/pin.png';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import Rating from '../rating';

interface Props {
  messages: Message[];
  chatContainerRef: React.RefObject<HTMLDivElement>;
  onGetPinnedMessagePage: () => void;
  showNewMsgBtn: boolean;
}
//this component is not using currently
function Messages({
  showNewMsgBtn,
  messages,
  chatContainerRef,
  onGetPinnedMessagePage,
}: Props) {
  const pinnedMessage = messages.find((message: Message) => message.pinned);
  const navigate = useNavigate();
  const getPinnedMessagePage = () => {
    onGetPinnedMessagePage();
  };
  return (
    <>
      <div className="messages-container">
        <div className="messages hide-scrollbar" ref={chatContainerRef}>
          {pinnedMessage && (
            <div className="pinned-message flex">
              <img src={pin} alt="pin" width={6} height={6} className="m-4" />
              <span className="text-10 montserrat-regular font-bold">
                Pinned:{' '}
                <span className="montserrat-regular text-8">
                  GEWINNER ANSEHEN LINK TO PROTOTYPE
                </span>
              </span>
            </div>
          )}
          {messages.map(
            (item, index) =>
              !item.pinned && (
                <div
                  className={`flex flex-column mb-8 ${item.type === 'sent' ? 'items-end' : 'items-start'} ${index === 0 || (index === 1 && messages[0]?.pinned) ? 'mt-8' : ''} ${index === messages.length - 1 ? 'pb-20' : ''}`}
                  key={index}
                  style={
                    {
                      '--index': !messages.some((message) => message.pinned)
                        ? 0
                        : index,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className={`msg-box ml-8 mr-8 ${item.type === 'sent' ? 'sent-msg' : 'received-msg'}`}
                  >
                    {item.parts.map((message, index) =>
                      message.type === 'text' ? (
                        <span
                          key={index}
                          className="msg montserrat-regular text-10"
                          style={message.style}
                        >
                          {message.text}
                        </span>
                      ) : message.type === 'link' ? (
                        <a
                          key={index}
                          className="msg montserrat-regular text-10"
                          style={message.style}
                          href={message.link}
                          target="_blank"
                        >
                          {message.text}
                        </a>
                      ) : message.type === 'button' ? (
                        <button type="button" style={message.btn?.style}>
                          {message.btn?.link ? (
                            <span
                              style={message.btn.link.style}
                              onClick={() =>
                                message.btn &&
                                message.btn.link &&
                                navigate(message.btn.link.link)
                              }
                            >
                              {message.btn.text}
                            </span>
                          ) : (
                            // <a
                            //   className="msg montserrat-regular text-10"
                            //   href={message.btn.link.link}
                            //   style={message.btn.link.style}
                            // >
                            //   {message.btn.text}
                            // </a>
                            message.btn?.text
                          )}
                        </button>
                      ) : message.type === 'rating' ? (
                        <Rating />
                      ) : null,
                    )}
                    <span className="msg-time">5:20pm</span>
                  </div>
                </div>
              ),
          )}
          {showNewMsgBtn &&
            !messages.some((message) => message.pinned) &&
            messages.length >= 4 && (
              <div className="new-message" onClick={getPinnedMessagePage}>
                New Messages
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default Messages;
