import Header from './components/header';
import { BrowserRouter as Router } from 'react-router-dom';
import IndexRoutes from './indexRoutes.tsx';

function App() {
  return (
    <>
      <div
        className="justify-center items-center flex flex-column "
        style={{ height: '100vh' }}
      >
        <Header />
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
