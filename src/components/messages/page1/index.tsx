import '../index.scss';
import { Message } from '../../../types/common.ts';
import React, { useEffect, useRef, useState } from 'react';
import ChatBox from '../../chat-box';
import { useNavigate } from 'react-router-dom';
import Rating from '../../rating';
import Header from '../../header';
function Page1() {
  const MESSAGES = [
    'Welcome! Submit your opinion and participate in a respectful controversy. Max. 600 characters. Question: What should be done about climate change?',
    'Thanks! Now please read the other opinions and rate how much you (dis)agree with them.',
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainer = useRef<HTMLDivElement>(null);
  const [showNewMsgBtn, setShowNewMsgBtn] = useState<boolean>(false);
  const [textAreaHeight, setTextAreaHeight] = useState<string>('');
  const navigate = useNavigate();

  const sendMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'sent', parts: [{ text: message, type: 'text' }] },
    ]);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: 'received',
          parts: [
            {
              text: prevMessages.length === 3 ? MESSAGES[1] : MESSAGES[0],
              type: 'text',
            },
          ],
        },
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

  useEffect(() => {
    if (messages.length >= 4) {
      setTimeout(() => {
        setShowNewMsgBtn(true);
      }, 2000);
    }
  }, [messages]);

  const handleClick = () => {
    navigate('/page2');
  };

  const handleTextAreaHeightChange = (height: string) => {
    if (textAreaHeight !== height) {
      scrollChatToEnd();
    }
    setTextAreaHeight(height);
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
                    className={`flex flex-column mb-8 ${item.type === 'sent' ? 'items-end' : 'items-start'} ${index === 0 || (index === 1 && messages[0]?.pinned) ? 'mt-8' : ''} `}
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
                      className={`msg-box ml-8 mr-8 ${item.type === 'sent' ? 'sent-msg' : 'received-msg delay-msg'}`}
                    >
                      {item.parts.map((message, index) =>
                        message.type === 'text' ? (
                          <span
                            key={index}
                            className="msg montserrat-regular"
                            style={message.style}
                          >
                            {message.text}
                          </span>
                        ) : message.type === 'link' ? (
                          <a
                            key={index}
                            className="msg montserrat-regular"
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
            {showNewMsgBtn && (
              <div
                className="new-message"
                onClick={handleClick}
                style={{
                  bottom:
                    textAreaHeight === '96px'
                      ? '112px'
                      : textAreaHeight === '53px'
                        ? '70px'
                        : textAreaHeight === '75px'
                          ? '90px'
                          : '52px',
                }}
              >
                New Messages
              </div>
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

export default Page1;
