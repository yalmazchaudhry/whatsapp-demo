import '../index.scss';
import { Message } from '../../../types/common.ts';
import React, { useEffect, useRef, useState } from 'react';
import ChatBox from '../../chat-box';
import { useNavigate } from 'react-router-dom';
import pin from '../../../assets/icons/pin.png';
import Rating from '../../rating';
import Header from '../../header';
function Page2() {
  const MESSAGES: Message[] = [
    {
      id: 0,
      type: 'received',
      rating: undefined,
      parts: [
        {
          id: 0,
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex do. consequat\n',
        },
        { id: 1, type: 'rating', hideOnRating: true },
        {
          id: 2,
          type: 'text',
          text: '\nBeide haben bewertet. Chat jetzt moglich.\n\n',
          style: { fontSize: '12px' },
          showOnRating: true,
        },
        {
          id: 3,
          type: 'button',
          btn: {
            text: 'CHAT STARTEN',
            link: {
              link: '/page3',
              style: {
                fontSize: '12px',
                color: 'black',
                textDecoration: 'none',
              },
            },
            style: {
              cursor: 'pointer',
              display: 'flex',
              height: '25px',
              width: '105px',
              backgroundColor: '#D5FFC5',
              border: '0',
              alignItems: 'center',
              borderRadius: '3px',
            },
          },
          showOnRating: true,
        },
      ],
    },
    {
      id: 1,
      type: 'received',
      parts: [
        {
          id: 0,
          type: 'text',
          text: 'Stop Eating Meat\n',
        },
        {
          id: 1,
          type: 'rating',
        },
      ],
    },
    {
      id: 2,
      type: 'received',
      parts: [
        {
          id: 0,
          type: 'text',
          text: 'tax green house emission\n',
        },
        { id: 1, type: 'rating' },
      ],
    },
  ];
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainer = useRef<HTMLDivElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState<string>('');
  const navigate = useNavigate();

  const sendMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length,
        type: 'sent',
        parts: [{ id: 0, text: message, type: 'text' }],
      },
    ]);
    scrollChatToEnd();
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
        id: 0,
        type: 'received',
        pinned: true,
        parts: [
          {
            id: 0,
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
              id: message.id,
              type: message.type,
              rating: undefined,
              parts: message.parts.map((part) => ({
                id: part.id,
                type: part.type,
                ...(part.text && { text: part.text }),
                ...(part.style && { style: part.style }),
                ...(part.btn && { btn: part.btn }),
                showOnRating: part.showOnRating || false,
                hideOnRating: part.hideOnRating || false,
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

  const handleTextAreaHeightChange = (height: string) => {
    if (textAreaHeight !== height) {
      scrollChatToEnd();
    }
    setTextAreaHeight(height);
  };

  const handleRating = (rating: number, messageId: number) => {
    const updatedMessages = messages.map((message) =>
      message.id === messageId ? { ...message, rating } : message,
    );
    setTimeout(() => {
      setMessages(updatedMessages);
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="parent">
        <div className="messages-container">
          <div className="messages hide-scrollbar" ref={chatContainer}>
            {pinnedMessage && (
              <div className="pinned-message flex">
                <img
                  src={pin}
                  alt="pin"
                  width={12}
                  height={12}
                  className="m-4"
                />
                <span className="text-18 montserrat-regular font-bold">
                  <a
                    href="https://starfish-app-nwpdz.ondigitalocean.app/"
                    target="_blank"
                    className="montserrat-regular text-16 font-bold"
                  >
                    Visual overview and leading voices
                  </a>
                </span>
              </div>
            )}
            {messages.map(
              (item, index) =>
                !item.pinned && (
                  <div
                    className={`flex flex-column mb-8 ${item.type === 'sent' ? 'items-end' : 'items-start'} ${index === 0 || (index === 1 && messages[0]?.pinned) ? 'mt-8' : ''}`}
                    key={index}
                    style={
                      {
                        paddingBottom:
                          index === messages.length - 1 ? textAreaHeight : '',
                        '--index': !messages.some((message) => message.pinned)
                          ? 0
                          : index,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      key={index}
                      className={`msg-box ml-8 mr-8 ${item.type === 'sent' ? 'sent-msg' : 'received-msg delay-msg'}`}
                    >
                      {item.parts.map((message, index) =>
                        message.type === 'text' ? (
                          <span
                            key={index}
                            className={`${
                              message.showOnRating && item.rating === undefined
                                ? 'd-none'
                                : message.showOnRating
                                  ? 'show-rating-with-delay'
                                  : ''
                            } msg montserrat-regular`}
                            style={{
                              ...message.style,
                              ...(message.showOnRating &&
                              item.rating === undefined
                                ? { display: 'none !important' }
                                : {}),
                            }}
                          >
                            {message.text}
                          </span>
                        ) : message.type === 'link' ? (
                          <a
                            key={index}
                            className={`${
                              message.showOnRating && item.rating === undefined
                                ? 'd-none'
                                : message.showOnRating
                                  ? 'show-rating-with-delay'
                                  : ''
                            } msg montserrat-regular`}
                            style={{
                              ...message.style,
                              ...(message.showOnRating &&
                              item.rating === undefined
                                ? { display: 'none !important' }
                                : {}),
                            }}
                            href={message.link}
                            target="_blank"
                          >
                            {message.text}
                          </a>
                        ) : message.type === 'button' ? (
                          <button
                            className={`${
                              message.showOnRating && item.rating === undefined
                                ? 'd-none'
                                : message.showOnRating
                                  ? 'show-rating-with-delay'
                                  : ''
                            }`}
                            key={index}
                            type="button"
                            style={{
                              ...message.btn?.style,
                              ...(message.showOnRating &&
                              item.rating === undefined
                                ? { display: 'none !important' }
                                : {}),
                            }}
                          >
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
                          <div
                            key={index}
                            className={
                              message.hideOnRating && item.rating !== undefined
                                ? 'hide-with-delay'
                                : ''
                            }
                          >
                            <Rating
                              key={index}
                              messageId={item.id}
                              onRating={handleRating}
                            />
                          </div>
                        ) : null,
                      )}

                      <span className="msg-time">5:20pm</span>
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
        <ChatBox
          onSendMessage={sendMessage}
          onTextAreaHeightChange={handleTextAreaHeightChange}
        />
      </div>
    </>
  );
}

export default Page2;
