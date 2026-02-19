import { useEffect, useState } from "react"
import { loginApi } from "../http/axios"
import Swal from "sweetalert2"
import CardLooper from "../components/cardLooper"
import { Outlet } from "react-router"

export default function Home () {
  const [stories, setStories] = useState([])
  const [storyCount, setStoryCount] = useState(0)
  const [page, setPage] = useState(1)
  const [tag, setTag] = useState('')
  const [search, setSearch] = useState('')

  function incrementPage () {
    let limitPerPage = 5 //has to change both in backend and frontend
    if (page >= Math.ceil(storyCount/limitPerPage)) {
      return null
    }
    setPage(page + 1)
  }

  function decrementPage () {
    if (page <= 1) {
      return null
    }
    setPage(page - 1)
  }
  
  async function fetchStories() {
    try {
      const query = new URLSearchParams({
        page,
        tag,
        search
      }).toString()

      const response = await loginApi({
        method: 'GET',
        url: '/stories?' + query
      })
  
      setStories(response.data.data)
      setStoryCount(response.data.count)
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Fetching stories error!',
        text: error.response?.data?.message
      })
    }
  }

  useEffect(() => {
    fetchStories()
  }, [page, search, tag])

  return (
    <>
      <div 
        className="flex gap-2 p-10 mt-20 w-screen bg-amber-50 text-slate-900"
      >

        <div 
          className="flex flex-col w-3/4 min-h-screen outline-1 outline-neutral-200 shadow-xl bg-stone-50"
        >

          <Outlet/> {/* will either output welcome screen or story detail */}

        </div>

        <div 
          className="flex flex-col w-1/4 h-screen bg-amber-50 gap-5"
        >

          <CardLooper array={stories}/>

        </div>
        
      </div>
    </>
  )
}