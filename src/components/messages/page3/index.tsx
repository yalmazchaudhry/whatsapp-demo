import '../index.scss';
import { Message } from '../../../types/common.ts';
import { useEffect, useRef, useState } from 'react';
import ChatBox from '../../chat-box';
function Page3() {
  const MESSAGES: Message[] = [
    {
      type: 'received',
      msg: "Hi there! I'm Alex, and I'm really passionate about addressing climate change. How about you?",
    },
    {
      type: 'sent',
      msg:
        "Hey, Alex. Nice to meet you. Well, I have some reservations about the whole climate change thing. I think it's overblown. \n" +
        "What's your take?",
    },
    {
      type: 'received',
      msg: "Thanks for being open to chat! So, here's my perspective: The scientific consensus is pretty clear that human activities, like burning fossil fuels, are causing global warming. The evidence is overwhelming. But I'm curious, what specifically makes you skeptical?",
    },
    {
      type: 'received',
      msg: '&#x1f44e;&#9734;&#9734;&#9734;&#9734;&#9734;&#128077; How respectfull is this chat?',
    },
  ];
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainer = useRef<HTMLDivElement>(null);

  const sendMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'sent', msg: message },
    ]);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'received', msg: 'Dummy Message' },
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
    MESSAGES.forEach((message, index) => {
      setTimeout(
        () => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: message.type,
              msg: message.msg,
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

  return (
    <>
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
                      <span
                        className="msg montserrat-regular text-10"
                        dangerouslySetInnerHTML={{ __html: item.msg }}
                      ></span>
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
