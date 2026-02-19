import { Link, useParams } from "react-router";
import StoryCard from "../components/storycard";

export default function StoryDetails () {
  const {storyId} = useParams()
  return (
    <>
      <div
        className="w-screen h-screen mt-20 p-10 flex flex-col"
      >

        <StoryCard/>

        <div
          className="flex justify-center gap-5"
        >
          <Link to={`/mystories/${storyId}/edit`} 
            className="mt-5 text-center text-2xl bg-black text-white hover:bg-white hover:text-black px-5 py-2 rounded-lg transition-all duration-300 outline-1"
            >Edit Story Details</Link>
          <Link to={`/mystories/${storyId}/addchapter`} 
            className="mt-5 text-center text-2xl bg-black text-white hover:bg-white hover:text-black px-5 py-2 rounded-lg transition-all duration-300 outline-1"
            >Add New Chapter</Link>
        </div>
        <Link to="/mystories" 
          className="mt-5 text-center text-blue-500 hover:underline"
          >Back to My Stories</Link>

      </div>
    </>
  )
}