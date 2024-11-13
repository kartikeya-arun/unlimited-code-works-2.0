import './App.css';
import Header from './Components/Header';
// import Cog from './Components/Cog';
import { BLOG_MENU, LINKS, MAIN_MENU } from './constants/text.constants';
import { useEffect, useState } from 'react';
import Menu from './Components/Menu';
import cog from './Assets/birthday-road-signs-19.svg'
import Post from './Components/Post';

// *Blog
//     *Posts
//     *Projects
// *Links

function App() {
  const [menuItems,setMenuItems]=useState([...MAIN_MENU])
  const [history,setHistory]=useState([])
  const [postVisible,setPostVisible]=useState(false)
  
  const handleBlog = ()=>{
    setHistory([...history,menuItems])
    setMenuItems([...BLOG_MENU])
  }

  const handleLinks = ()=>{
    setHistory([...history,menuItems])
    setMenuItems([...Object.keys(LINKS)])
  }

  const handleGoBack=()=>{
    if(postVisible){
      setPostVisible(false)
    }
    setMenuItems(history[history.length-1])
    setHistory(history.filter((el)=>el!==history[history.length-1]))
  }

  const handleAbout = ()=>{
    setPostVisible(true)
    setHistory([...history,menuItems])
    setMenuItems([])
  }
  
  return (
    <div className='container'>
      <Header />
      {/* <img src={cog} alt='cog' className='cog rotating-div' /> */}
      {postVisible && <Post />}
      <Menu items={menuItems} setMenuItems={setMenuItems} handleAbout={handleAbout} handleBlog={handleBlog} handleLinks={handleLinks} history={history} handleGoBack={handleGoBack} />
    </div>
  );
}

export default App;