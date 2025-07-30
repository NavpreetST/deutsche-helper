
import ChatWindow from "./components/ChatWindow"

import SideBar from "./components/SideBar"


function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <ChatWindow />
    </div>
  );
}

export default App
