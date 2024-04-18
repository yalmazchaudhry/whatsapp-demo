import { Routes, Route } from 'react-router-dom';
import Page1 from './components/messages/page1';
import Page2 from './components/messages/page2';
import Page3 from './components/messages/page3';

function IndexRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/page3" element={<Page3 />} />
    </Routes>
  );
}

export default IndexRoutes;
