import { useEffect, useRef, useState } from "react"
import { ABOUT, BLOG_MENU, LINKS } from "../constants/text.constants"

export default function Menu({ items, setMenuItems, showPost, closePost, setPost}) {
    const [highlight, setHighlight] = useState(0)
    const divRef=useRef(null)
    const [history,setHistory]=useState([])
    const [projectLinks,setProjectLinks]=useState({github:'',demo:''})
    const konamiCode=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    const [ip,setIp]=useState([])

    const handleHighlight = (e) => {
        if (e.key === 'ArrowDown' && highlight < items.length - 1) {
            setHighlight(highlight + 1);
        } else if (e.key === 'ArrowUp' && (highlight > 0 || history.length)) {
            setHighlight(Math.max(highlight - 1, -1));
        } else if (e.key === 'Enter') {
            handleSelection();
        }
    }

    const checkKonamiCode=(e)=>{
        setIp((prevIp)=>{
            const newIp=[...prevIp,e.key]
            if(newIp.length>konamiCode.length){
                newIp.shift()
            }
            if(JSON.stringify(newIp)===JSON.stringify(konamiCode)){
                alert('Konami Code entered!')
            }
            return newIp
        })
    }

    const getProjects=async()=>{
        try {
            setMenuItems(['Loading...'])
            const response = await fetch('http://localhost:8081/projects');
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setHistory([...history,items])
            setMenuItems(data)
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }   
    }

    const handleSelection=async()=>{
        const item=items[highlight]
        switch(true) {
            case item === 'Blog':
                setHistory([...history,items])
                setMenuItems([...BLOG_MENU])
                setHighlight(0);
                break;
            case item === 'About':
                setPost({
                    heading:ABOUT.heading,
                    subHeading:ABOUT.subHeading,
                    content:ABOUT.content
                  })    
                showPost();
                setHistory([...history,items])
                setMenuItems([])
                setHighlight(-1);
                break;
            case item === 'Links':
                setHistory([...history,items])
                setMenuItems([...Object.keys(LINKS)])
                setHighlight(0);
                break;
            case item === 'Projects':
                await getProjects()
                setHighlight(0);
                break;
            case item === 'Github':
                if(projectLinks.github){
                    window.open(projectLinks.github, "_blank");
                }
                break;
            case item === 'Demo':
                console.log(projectLinks)
                if(projectLinks.github){
                    window.open(projectLinks.demo, "_blank");
                }
                break;
            case typeof item === 'object':
                console.log(item)
                const postMenu=[]
                setPost({
                    heading:item.title,
                    content:item.description
                })
                showPost()
                setProjectLinks({github:item.readMore,demo:item.url})
                if (item.readMore){
                    postMenu.push('Github')
                }
                if(item.url){
                    postMenu.push('Demo')
                }
                setHistory([...history,items])
                setMenuItems(postMenu)
                setHighlight(0)
                break;
            default:
                if (highlight === -1) {
                    closePost()
                    setMenuItems(history[history.length-1])
                    setHistory(history.filter((el)=>el!==history[history.length-1]))
                    setHighlight(0);
                    setProjectLinks({github:'',demo:''})
                } else if (Object.keys(LINKS).includes(items[highlight])) {
                    window.open(LINKS[items[highlight]], "_blank");
                }
                break;
        }
    }

    useEffect(()=>{
        divRef.current.focus()    
    },[])

    return (
        <div>
            <ul tabIndex={0} onKeyDown={(e)=>{checkKonamiCode(e); handleHighlight(e)}} ref={divRef}>
                {history.length>0 && (<li className={highlight === -1 ? 'highlighted' : ''}> ../</li>)}
                {items.map((item, index) => <li key={typeof item === 'object'?item._id:index} className={index === highlight ? 'highlighted' : ''}>{typeof item === 'object'?item.title:item}</li>)}
            </ul>
        </div>
    )
}