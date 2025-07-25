
import ChatWindow from "./components/ChatWindow"

import SideBar from "./components/SideBar"


function App() {

  return (
   <div className='text-shadow-purple-950 border-2 bg-amber-500  text-2xl w-11/12 h-max min-w-12/12'>
    <div className="font-bold flex items-center justify-center ">
    Teletraan-1

    </div>
    <ChatWindow/>

    <SideBar/>
   </div>
  )
}

export default App
