import { createContext, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Dropzone from './components/Dropzone/Dropzone'
import FileTable from './components/FileTable/FileTable'

export const FileContext = createContext(null);

function App() {
  const [fileState, setFileState] = useState('')

  return (
    <div className="App">
      <FileContext.Provider value={{fileState, setFileState}}>
        <Navbar/>
        <Dropzone/>
        <FileTable/>
      </FileContext.Provider>
      
    </div>
  )
}

export default App;
