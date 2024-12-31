import { FANCY_TEXT } from "../constants/text.constants";

export default function FancyText(){
    return(
        <div>{FANCY_TEXT.map((line,idx)=>{
            return(line.map((c,idx)=>{
                return c
            }))
        })}</div>
    )
}