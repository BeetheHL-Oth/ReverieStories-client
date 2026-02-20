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
      className="w-full bg-amber-50 text-slate-900 flex flex-col mt-15 p-5"
      >
        <div className="flex w-9/10 justify-between items-center">
          <form
            className="pb-3 px-20 w-full"
          >
            <input type="text" 
              value={search}
              placeholder="Search Stories"
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/2 p-2 outline-1 outline-slate-900 rounded-lg"
            />

            <input type="text" 
              value={tag}
              placeholder="Search by tag"
              onChange={(e) => setTag(e.target.value)}
              className="w-1/4 mx-20 p-2 outline-1 outline-slate-900 rounded-lg"
            />

          </form>
            <div
              className="flex gap-10 items-center"
            >
              <button onClick={decrementPage}
                className="bg-slate-800 text-white rounded-full p-3 text-xl"
              >{'<'}</button>
              <p>{page}</p>
              <button onClick={incrementPage}
                className="bg-slate-800 text-white rounded-full p-3 text-xl"
              >{'>'}</button>
            </div>
        </div>

      <div 
        className="flex gap-8 px-10 w-full h-fit bg-amber-50 text-slate-900"
      >

        <div 
          className="flex flex-col w-3/4 h-200 outline-1 outline-neutral-200 shadow-xl bg-stone-50"
        >

          <Outlet/> {/* will either output welcome screen or story detail */}

        </div>

        <div 
          className="flex flex-col w-1/4 h-200 bg-amber-50 gap-8 p-5 overflow-y-auto"
        >

          <CardLooper array={stories}/>

        </div>
        
      </div>
    </div>
    </>
  )
}