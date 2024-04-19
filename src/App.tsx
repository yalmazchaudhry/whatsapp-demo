import { BrowserRouter as Router } from 'react-router-dom';
import IndexRoutes from './indexRoutes.tsx';

function App() {
  return (
    <>
      <div
        className="justify-center items-center flex flex-column "
        style={{ height: '100vh' }}
      >
        <div className="parent">
          <Router>
            <IndexRoutes />
          </Router>
          {/*<Messages showNewMsgBtn={showNewMsgBtn} messages={messages} chatContainerRef={chatContainer} onGetPinnedMessagePage={onGetPinnedMessagePage} />*/}
          {/*<ChatBox onSendMessage={sendMessage}/>*/}
        </div>
      </div>
    </>
  );
}

export default App;
