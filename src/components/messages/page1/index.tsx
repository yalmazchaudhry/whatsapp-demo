import '../index.scss';
import { Message } from '../../../types/common.ts';
import { useEffect, useRef, useState } from 'react';
import ChatBox from '../../chat-box';
import { useNavigate } from 'react-router-dom';
function Page1() {
  const MESSAGES = [
    'Welcome! Submit your opinion and participate in a respectful controversy. Max. 600 characters. Question: What should be done about climate change?',
    'Thanks! Now please read the other opinions and rate how much you (dis)agree with them.',
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainer = useRef<HTMLDivElement>(null);
  const [showNewMsgBtn, setShowNewMsgBtn] = useState<boolean>(false);
  const navigate = useNavigate();

  const sendMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'sent', msg: message },
    ]);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: 'received',
          msg: prevMessages.length === 3 ? MESSAGES[1] : MESSAGES[0],
        },
      ]);
      scrollChatToEnd();
    });
  };

  const scrollChatToEnd = () => {
    setTimeout(() => {
      if (chatContainer.current) {
        console.log(chatContainer.current);
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
                      className={`msg-box ml-8 mr-8 ${item.type === 'sent' ? 'sent-msg' : 'received-msg delay-msg'}`}
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
            <div>{showNewMsgBtn}</div>
            {showNewMsgBtn}
            {showNewMsgBtn && (
              <div className="new-message" onClick={handleClick}>
                New Messages
              </div>
            )}
          </div>
        </div>
        <ChatBox onSendMessage={sendMessage} />
      </div>
    </>
  );
}

export default Page1;
