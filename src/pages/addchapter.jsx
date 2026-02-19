import Swal from "sweetalert2";
import StoryForm from "../components/storyForm";
import { loginApi } from "../http/axios";
import { Outlet, useNavigate, useParams } from "react-router";
import { useState } from "react";

export default function AddChapter () {
  const [chapter, setChapter] = useState({
    title: '',
    description: '',
    chapterImageUrl: ''
  })

  const reroute = useNavigate()
  const {storyId} = useParams()

  async function submit (event) {
    event.preventDefault()
    try {
      const response = await loginApi({
        method: 'POST',
        url: `/mystories/${storyId}/chapters`,
        data: {
          name: chapter.title,
          body: chapter.description,
          chapterImageUrl: chapter.chapterImageUrl
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Chapter added successfully!',
        text: `Your chapter has been added!`
      })
      setChapter({
        title: '',
        description: '',
        chapterImageUrl: ''
      })
      reroute(`/mystories/${storyId}`)

    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Adding chapter error!',
        text: error.response?.data?.message
      })
    }
  }
  return ( 
    <>
      <div
        className="mt-20 p-10 flex justify-start bg-amber-50 text-slate-900"
      >

        <div
          className="w-2/3 bg-amber-50 text-slate-900 flex justify-center"
        >
          
          <StoryForm type="Chapter" formType="Add" submit={submit} story={chapter} setStory={setChapter}/>

        </div>

        <div className="w-1/3 bg-slate-500 rounded-2xl text-slate-900 flex justify-center fixed right-5 top-40 bottom-20 p-5">
          
          {/* Here will be the ai chatbot component */}
          <Outlet/>

        </div>

      </div>
    </>
  )
}