import Header from './components/Header';
import Home from './components/Home';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex bg-[#f4f7fa] overflow-x-hidden">
      <div className=''>
        <Sidebar />
      </div>
      <div className='ml-16'>
        <Header />
        <Home />
      </div>
    </div>
  );
}

export default App;
