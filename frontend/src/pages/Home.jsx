import { ChatBox } from '../components/ChatBox';
import { Navbar } from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-24 pb-12">
      <Navbar />
      <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)]">
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;
