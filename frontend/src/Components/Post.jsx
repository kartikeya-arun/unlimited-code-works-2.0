export default function Post({heading,subHeading,content}){
    return(
        <div className="post">
            <h1>{heading}</h1>
            {subHeading?(<p><em>{subHeading}</em></p>):''}
            {content}
        </div>
    )
}