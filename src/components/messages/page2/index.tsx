import '../index.scss';
import { Message } from '../../../types/common.ts';
import { useEffect, useRef, useState } from 'react';
import ChatBox from '../../chat-box';
import { useNavigate } from 'react-router-dom';
import pin from '../../../assets/icons/pin.png';
function Page2() {
  const MESSAGES: Message[] = [
    {
      type: 'received',
      msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex do. consequat',
    },
    {
      type: 'received',
      msg: 'Stop Eating Meat <br> &#x1f44e;&#9734;&#9734;&#9734;&#9734;&#9734;&#128077;',
    },
    {
      type: 'received',
      msg: 'tax green house emission <br> &#x1f44e;&#9734;&#9734;&#9734;&#9734;&#9734;&#128077;',
    },
  ];
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    setMessages([
      {
        type: 'received',
        pinned: true,
        msg: 'GEWINNER ANSEHEN LINK TO PROTOTYPE',
      },
    ]);
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
          if (index + 1 === MESSAGES.length) {
            setTimeout(() => {
              navigate('/page3');
            }, 5000);
          }
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

export default Page2;
