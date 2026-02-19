import Swal from "sweetalert2";
import StoryForm from "../components/storyForm";
import { loginApi } from "../http/axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function EditChapter () {
  const [chapter, setChapter] = useState({
    title: '',
    description: '',
    chapterImageUrl: ''
  })
  
  const {storyId, chapterId} = useParams()
  const reroute = useNavigate()

  async function fetchChapter() {
    try {
      const response = await loginApi({
        method: 'GET',
        url: '/stories/' + storyId + '/' + chapterId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      const tempChapter = response.data.data
      setChapter({
        title: tempChapter.name,
        description: tempChapter.body,
        chapterImageUrl: tempChapter.chapterImageUrl || ''
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
    fetchChapter()
  }, [])

  useEffect(() => {
    console.log(chapter)
  }, [chapter])


  async function submit (event) {
    event.preventDefault()
    try {
      const response = await loginApi({
        method: 'PUT',
        url: '/mystories/' + storyId + '/chapters/' + chapterId,
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
        title: 'Chapter updated!',
        text: `Your chapter "${chapter.title}" has been updated!`
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
        title: 'Editing chapter error!',
        text: error.response?.data?.message
      })
    }
  }
  return ( 
    <>
      <div
        className="w-screen mt-20 p-10 bg-amber-50 text-slate-900 flex justify-center"
      >
        
        <StoryForm type="Chapter" formType="Edit" submit={submit} story={chapter} setStory={setChapter}/>

      </div>
    </>
  )
}