import '../index.scss';
import { Message } from '../../../types/common.ts';
import { useEffect, useRef, useState } from 'react';
import ChatBox from '../../chat-box';
import Rating from '../../rating';
import { useNavigate } from 'react-router-dom';
import Header from '../../header';
function Page3() {
  const MESSAGES: Message[] = [
    {
      type: 'received',
      parts: [
        {
          type: 'text',
          text: "Hi there! I'm Alex, and I'm really passionate about addressing climate change. How about you?",
        },
      ],
    },
    // {
    //   type: 'sent',
    //   parts: [
    //     {
    //       type: 'text',
    //       text:
    //         "Hey, Alex. Nice to meet you. Well, I have some reservations about the whole climate change thing. I think it's overblown. \n" +
    //         "What's your take?",
    //     },
    //   ],
    // },
    {
      type: 'received',
      parts: [
        {
          type: 'text',
          text: "Thanks for being open to chat! So, here's my perspective: The scientific consensus is pretty clear that human activities, like burning fossil fuels, are causing global warming. The evidence is overwhelming. But I'm curious, what specifically makes you skeptical?",
        },
      ],
    },
    {
      type: 'received',
      parts: [
        {
          type: 'rating',
        },
        {
          type: 'text',
          text: 'How respectfull is this chat?',
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
      {
        type: 'sent',
        parts: [
          {
            type: 'text',
            text: message,
          },
        ],
      },
    ]);
    MESSAGES.forEach((message, index) => {
      if (index !== 0) {
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
      }
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
    MESSAGES.forEach((message, index) => {
      if (index === 0) {
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
      }
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <Header />
      <div className="parent">
        <div className="messages-container">
          <div className="messages" ref={chatContainer}>
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
                      className={`msg-box ml-8 mr-8 delay-msg ${item.type === 'sent' ? 'sent-msg' : 'received-msg'}`}
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

export default Page3;
