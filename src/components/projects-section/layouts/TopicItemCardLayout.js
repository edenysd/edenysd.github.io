import React from "react"

const TopicItemCardLayout = ({ topic }) => {

    return (
        <div className={"w-auto text-white h-fit bg-slate-500 rounded-full py-1 px-2 ml-2 mb-1"}>
            <p>
                {topic}
            </p>
        </div>
    )
}

export default TopicItemCardLayout