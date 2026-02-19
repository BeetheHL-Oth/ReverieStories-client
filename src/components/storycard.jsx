import { Link, useLocation, useParams } from "react-router"
import { loginApi } from "../http/axios"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"

export default function StoryCard () {
  const [story, setStory] = useState({})
  const {storyId} = useParams()
  
  const location = useLocation()

  async function fetchStory() {
    try {
      const response = await loginApi({
        method: 'GET',
        url: '/stories/' + storyId
      })
      setStory(response.data.data)
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Fetching story error!',
        text: error.response?.data?.message
      })
    }
  }

  async function vote() {
    try {
      const response = await loginApi({
        method: 'PATCH',
        url: '/stories/' + storyId + '/vote',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Voting success!',
      })
      fetchStory()
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Voting error!',
        text: error.response?.data?.message
      })
    }
  }

  useEffect(() => {
    fetchStory()
  }, [location])

  useEffect(() => {
    console.log(story)
  }, [story])

  return (
    <>
      <div 
        className="flex w-full h-8/12"
      >

        <div
          className="w-1/3 h-full p-5"
        >

          <img 
            src={story.storyImageUrl} alt="buffering" 
            className="w-full h-full object-cover rounded-2xl outline-1 outline-neutral-500"
          />

        </div>

        <div
          className="w-2/3 h-full p-5 flex flex-col gap-5"
        >

          <h1
            className="text-4xl text-center"
          ><b>{story.title}</b></h1>

          <h3
            className="text-xl text-right"
          >Author: {story.author}</h3>

          <p
            className="text-right text-green-500"
          >Votes: [ {story.votes} ] <button onClick={vote}
            className="bg-green-500 text-white p-2"
          >Vote!</button></p>

          <span
            className="text-right"
          ><Link to={`/mystories/${storyId}/addtags`}
            className="text-center text-white bg-slate-500 p-2"
          >Add Tag</Link></span>

          <div
            className="outline-1 outline-neutral-500 rounded-xl p-5 h-full overflow-y-hidden flex flex-col justify-between">

            <p
              className=""
            >{story.description}</p>
            <div
              className="flex justify-end gap-3"
            >
            {story.Tags ? (<>
              {story.Tags.map(e => (
                <span key={e.tagName}
                  className="bg-slate-500 text-sky-300 px-2 rounded-lg"
                >{e.tagName}</span>
              ))}
            </>) : ''}
            </div>

          </div>



        </div>

      </div>

      <h1
        className="ml-7"
      >Chapters:</h1>

      <div className="p-10 gap-10 flex flex-wrap justify-between items-start h-4/12 outline-1 outline-neutral-500 rounded-xl m-4 overflow-y-auto">
        {story.chapters?.map(e => (
          
          <Link to={location.pathname.includes('/mystories') ? `/mystories/${storyId}/${e.id}` : `/${storyId}/${e.id}`} key={e.id}
            className="outline-1 outline-neutral-500 shadow-xl hover:shadow-2xs hover:translate-y-0.5 transition-all p-3 w-2/9 items-center"
          >{e.name}</Link>
        ))}

      </div>

    </>
  )
}