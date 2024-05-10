import '../index.scss';
import { Message } from '../../../types/common.ts';
import React, { useEffect, useRef, useState } from 'react';
import ChatBox from '../../chat-box';
import Rating from '../../rating';
import { useNavigate } from 'react-router-dom';
import Header from '../../header';
function Page3() {
  const MESSAGES: Message[] = [
    {
      id: 0,
      type: 'received',
      parts: [
        {
          id: 0,
          type: 'text',
          text: "Hi there! I'm Alex, and I'm really passionate about addressing climate change. How about you?",
        },
      ],
    },
    {
      id: 1,
      type: 'sent',
      parts: [
        {
          id: 0,
          type: 'text',
          text:
            "Hey, Alex. Nice to meet you. Well, I have some reservations about the whole climate change thing. I think it's overblown. \n" +
            "What's your take?",
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
          text: "Thanks for being open to chat! So, here's my perspective: The scientific consensus is pretty clear that human activities, like burning fossil fuels, are causing global warming. The evidence is overwhelming. But I'm curious, what specifically makes you skeptical?",
        },
      ],
    },
    {
      id: 3,
      type: 'received',
      parts: [
        {
          id: 0,
          type: 'rating',
        },
        {
          id: 1,
          type: 'text',
          text: 'How respectfull is this chat?',
        },
      ],
    },
  ];
  const [messages, setMessages] = useState<Message[]>([]);
  const [textAreaHeight, setTextAreaHeight] = useState<string>('');
  const chatContainer = useRef<HTMLDivElement>(null);
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

  const handleTextAreaHeightChange = (height: string) => {
    if (textAreaHeight !== height) {
      scrollChatToEnd();
    }
    setTextAreaHeight(height);
  };

  useEffect(() => {
    getMessages();
  }, []);

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
                      className={`msg-box ml-8 mr-8 delay-msg ${item.type === 'sent' ? 'sent-msg' : 'received-msg'}`}
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

export default Page3;
