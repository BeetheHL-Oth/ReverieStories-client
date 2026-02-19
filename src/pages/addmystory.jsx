import Swal from "sweetalert2";
import StoryForm from "../components/storyForm";
import { loginApi } from "../http/axios";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function AddStory () {
  const [story, setStory] = useState({
    title: '',
    description: '',
    storyImageUrl: ''
  })

  const reroute = useNavigate()

  async function submit (event) {
    event.preventDefault()
    try {
      const response = await loginApi({
        method: 'POST',
        url: '/mystories',
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
        title: 'Story added successfully!',
        text: `Your story "${story.title}" has been added!`
      })
      setStory({
        title: '',
        description: '',
        storyImageUrl: ''
      })
      reroute('/mystories/' + response.data.data.id)
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Adding story error!',
        text: error.response?.data?.message
      })
    }
  }
  return ( 
    <>
      <div
        className="w-screen mt-20 p-10 bg-amber-50 text-slate-900 flex justify-center"
      >
        
        <StoryForm type="Story" formType="Add" submit={submit} story={story} setStory={setStory}/>

      </div>
    </>
  )
}