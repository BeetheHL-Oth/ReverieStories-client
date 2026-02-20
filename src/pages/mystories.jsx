import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { loginApi } from "../http/axios"
import { Link, useNavigate } from "react-router"
import CardLooper from "../components/cardLooper"

export default function MyStories() {
  const [myStories, setMyStories] = useState([])

  const reroute = useNavigate()

  async function fetchMyStories () {
    try {
      const response = await loginApi({
        method: 'GET',
        url: '/mystories',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      console.log(response.data.data)
      setMyStories(response.data.data) 
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'My Stories Error!',
        text: error.response?.data?.message
      })
      reroute('/')
    }
  }
  
  useEffect(() => {
    fetchMyStories()
  }, [])

  return (
    <>
      <div
        className="w-screen mt-15 p-10 bg-amber-50 text-slate-900 flex flexwrap flex-col gap-5"
      >
        <Link to="/mystories/add"
          className="text-2xl bg-slate-800 text-white w-1/7 p-3 ml-3 text-center rounded-lg hover:bg-stone-50 hover:text-slate-900 outline-1 transition-all duration-300"
        >New Story</Link>

        <h1
          className="text-4xl text-center mb-2 bg-sky-700 text-white rounded-t-2xl outline-1 p-3 mx-10"
        >My Stories</h1>

        <div
          className="flex flex-col gap-8 mx-10"
        >
          
          <CardLooper array={myStories}/>

        </div>

      </div>
    </>
  )
}