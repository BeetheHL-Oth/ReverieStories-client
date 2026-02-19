import { Link } from "react-router"

export default function Card ({title, author, chapters, tags = [], votes, id}) {
  return (
    <>
      <Link to={`/${id}`}>
        <div 
          className="flex w-full h-full outline-neutral-200 outline-1 shadow-xl hover:shadow-2xl hover:scale-102 transition-all p-4"
        >

          <div 
            className="flex flex-col w-full"
          > {/* contents div */}

            <div 
              className="flex flex-col items-start justify-evenly"
            > {/* Title Author and Chapter amount */}

              <h1 className="text-2xl">{title}</h1>
              <h3 className="text-xl">{author}</h3>
              <h4>Chapters: {chapters}</h4>
              <h4>Votes: {votes}</h4>

            </div>

            <div 
              className="flex justify-end items-center gap-3"
            > {/* tags */}

              {tags.map(e => (
                <h4 className="outline-1 outline-neutral-400 rounded-2xl mt-1 px-3 text-sky-700 text-center" key={e.id}>{e.tagName}</h4>
              ))}

            </div>

          </div>

        </div>
        
      </Link>
    </>
  )
}