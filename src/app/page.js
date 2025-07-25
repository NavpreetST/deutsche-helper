
import ChatWindow from "./components/ChatWindow"

import SideBar from "./components/SideBar"


function App() {

  return (
   <div className='text-shadow-purple-950 border-2 bg-amber-500  text-2xl w-fit h-full min-w-full '>
    
    <ChatWindow/>

    <SideBar/>
   </div>
  )
}

export default App
