import '../index.scss';
import { Message } from '../../../types/common.ts';
import { useEffect, useRef, useState } from 'react';
import ChatBox from '../../chat-box';
import { useNavigate } from 'react-router-dom';
import pin from '../../../assets/icons/pin.png';
import Rating from '../../rating';
function Page2() {
  const MESSAGES: Message[] = [
    {
      type: 'received',
      parts: [
        {
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex do. consequat\n',
        },
        {
          type: 'text',
          text: '\nBeide haben bewertet. Chat jetzt moglich.\n\n',
          style: { fontSize: '7px' },
        },
        {
          type: 'button',
          btn: {
            text: 'CHAT STARTEN',
            link: {
              link: '/page3',
              style: {
                fontSize: '8px',
                color: 'black',
                textDecoration: 'none',
              },
            },
            style: {
              cursor: 'pointer',
              display: 'flex',
              height: '16px',
              width: '78px',
              backgroundColor: '#D5FFC5',
              border: '0',
              alignItems: 'center',
              borderRadius: '3px',
            },
          },
        },
      ],
    },
    {
      type: 'received',
      parts: [
        {
          type: 'text',
          text: 'Stop Eating Meat\n',
        },
        {
          type: 'rating',
        },
      ],
    },
    {
      type: 'received',
      parts: [
        {
          type: 'text',
          text: 'tax green house emission\n',
        },
        {
          type: 'rating',
        },
      ],
    },
  ];
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const sendMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'sent', parts: [{ text: message, type: 'text' }] },
    ]);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'received', parts: [{ text: 'Dummy Message', type: 'text' }] },
      ]);
      scrollChatToEnd();
    });
  };

  const scrollChatToEnd = () => {
    setTimeout(() => {
      if (chatContainer.current) {
        chatContainer.current.scrollTo({
          top: chatContainer.current.scrollHeight,
        });
      }
    });
  };

  const getMessages = () => {
    setMessages([
      {
        type: 'received',
        pinned: true,
        parts: [
          {
            type: 'link',
            text: 'GEWINNER ANSEHEN LINK TO PROTOTYPE',
          },
        ],
      },
    ]);
    MESSAGES.forEach((message, index) => {
      setTimeout(
        () => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: message.type,
              parts: message.parts.map((part) => ({
                type: part.type,
                ...(part.text && { text: part.text }),
                ...(part.style && { style: part.style }),
                ...(part.btn && { btn: part.btn }),
              })),
            },
          ]);
          scrollChatToEnd();
        },
        1000 * (index + 1),
      );
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  const pinnedMessage = messages.find((message: Message) => message.pinned);

  return (
    <>
      <div className="parent">
        <div className="messages-container">
          <div className="messages" ref={chatContainer}>
            {pinnedMessage && (
              <div className="pinned-message flex">
                <img src={pin} alt="pin" width={6} height={6} className="m-4" />
                <span className="text-10 montserrat-regular font-bold">
                  Pinned:{' '}
                  <a
                    href="https://starfish-app-nwpdz.ondigitalocean.app/"
                    target="_blank"
                    className="montserrat-regular text-8"
                  >
                    GEWINNER ANSEHEN
                  </a>
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
                      className={`msg-box ml-8 mr-8 ${item.type === 'sent' ? 'sent-msg' : 'received-msg delay-msg'}`}
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
          </div>
        </div>
        <ChatBox onSendMessage={sendMessage} />
      </div>
    </>
  );
}

export default Page2;
