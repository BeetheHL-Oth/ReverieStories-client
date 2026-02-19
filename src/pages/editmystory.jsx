import Swal from "sweetalert2";
import StoryForm from "../components/storyForm";
import { loginApi } from "../http/axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function EditStory () {
  const [story, setStory] = useState({
    title: '',
    description: '',
    storyImageUrl: ''
  })
  
  const {storyId} = useParams()
  const reroute = useNavigate()

  async function fetchStory() {
    try {
      const response = await loginApi({
        method: 'GET',
        url: '/stories/' + storyId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      const tempStory = response.data.data
      setStory({
        title: tempStory.title,
        description: tempStory.description,
        storyImageUrl: tempStory.storyImageUrl || ''
      })
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Fetching story error!',
        text: error.response?.data?.message
      })
    }
  }

  useEffect(() => {
    fetchStory()
  }, [])

  useEffect(() => {
    console.log(story)
  }, [story])


  async function submit (event) {
    event.preventDefault()
    try {
      const response = await loginApi({
        method: 'PUT',
        url: '/mystories/' + storyId,
        data: {
          title: story.title,
          description: story.description,
          storyImageUrl: story.storyImageUrl
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Story updated!',
        text: `Your story "${story.title}" has been updated!`
      })
      setStory({
        title: '',
        description: '',
        storyImageUrl: ''
      })
      reroute('/mystories/' + storyId)
    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Editing story error!',
        text: error.response?.data?.message
      })
    }
  }
  return ( 
    <>
      <div
        className="w-screen mt-20 p-10 bg-amber-50 text-slate-900 flex justify-center"
      >
        
        <StoryForm type="Story" formType="Edit" submit={submit} story={story} setStory={setStory}/>

      </div>
    </>
  )
}