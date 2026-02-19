import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { loginApi } from "../http/axios"
import { useNavigate, useParams } from "react-router"

export default function AddTag () {
  const [tags, setTag] = useState([])

  const {storyId} = useParams()
  const reroute = useNavigate()

  async function fetchTags() {
    try {
      const response = await loginApi({
        method: 'GET',
        url: '/tags'
      })
      setTag(response.data.data)
    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Fetching tags error!',
        text: error.response?.data?.message
      })
    }
  }

  async function addTag (tagId) {
    try {
      const response = await loginApi({
        method: 'POST',
        url: `/mystories/${storyId}/tag/${tagId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Tag added!',
        text: response.data.message
      })
      reroute('/mystories/' + storyId)
    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Adding tag error!',
        text: error.response?.data?.message
      })
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-20 p-4 bg-orange-50">Add Tags to Story</h1>
      <div
        className="h-screen w-screen p-10 flex flex-wrap gap-4 bg-orange-50 text-slate-900"
      >
        {tags.map((e) => (
          <button onClick={() => {
            addTag(e.id)
          }}
            key={e.id} className="bg-stone-50 outline-1 outline-neutral-300 h-12 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-3 m-2 rounded"
          >
            <h3 className="text-lg font-semibold">{e.tagName}</h3>
          </button>
        ))}
      </div>
    </>
  )
}