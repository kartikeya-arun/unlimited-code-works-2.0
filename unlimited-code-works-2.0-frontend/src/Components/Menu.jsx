import { useEffect, useRef, useState } from "react"
import { LINKS } from "../constants/text.constants"

export default function Menu(props) {
    const { items, handleAbout, handleBlog, handleLinks, history, handleGoBack } = props
    const [highlight, setHighlight] = useState(0)
    const divRef=useRef(null)
    const [isLink,setIsLink] = useState(false)

    const handleHighlight = (e) => {
        if (highlight < items.length-1 && e.key === 'ArrowDown') {
            const newIdx = highlight + 1
            setHighlight(newIdx)
        } else if (e.key === 'ArrowUp' && (highlight > 0 || history.length) ) {
            if (highlight>-1){
                const newIdx = highlight - 1
                setHighlight(newIdx)
            }
        }else if(e.key==='Enter'){
            handleSelection()
        }
    }

    const handleSelection=()=>{
        if(items[highlight]==='Blog'){
            handleBlog()
            setHighlight(0)
        }else if(items[highlight]==='About'){
            handleAbout()
            setHighlight(-1)
        }else if(items[highlight]==='Links'){
            setIsLink(true)
            handleLinks()
            setHighlight(0)
        }else if(highlight===-1){
            setIsLink(false)
            handleGoBack()
            setHighlight(0)
        }else if (Object.keys(LINKS).includes(items[highlight])){
            window.open(LINKS[items[highlight]],"_blank")
        }
    }

    useEffect(()=>{
        divRef.current.focus()    
    },[])

    return (
        <div>
            <ul tabIndex={0} onKeyDown={handleHighlight} ref={divRef}>
                {history.length>0 && (<li className={highlight === -1 ? 'highlighted' : ''}> ../</li>)}
                {items.map((item, index) => <li key={index} className={index === highlight ? 'highlighted' : ''}>{item}</li>)}
            </ul>
        </div>
    )
}