import { useState } from "react"
import UserForm from "../components/userForm"
import { Link, useNavigate } from "react-router"
import { loginApi } from "../http/axios"
import Swal from "sweetalert2"

export default function Login () {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const reroute = useNavigate()

  async function submit(event) {
    event.preventDefault()

    try {
      const response = await loginApi({
        method: 'POST',
        url: '/users/login',
        data: {
          email: user.email,
          password: user.password
        }
      })

      Swal.fire({
        icon: 'success',
        title: 'Logged in!',
        text: `Welcome to Reverie!`
      })
      const access_token = response.data.access_token

      localStorage.setItem('access_token', access_token)
      
      setUser({
        username: '',
        email: '',
        password: ''
      })

      reroute('/')
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error.response?.data?.message
      })
    }

  }

  return (
    <>
      <div 
        className="flex justify-center h-screen w-screen bg-stone-50 text-slate-900"
      >

        <div 
          className="h-full w-5/12 flex flex-col justify-center items-center bg-sky-700"
        >

          <UserForm user={user} setUser={setUser} submit={submit} formType="Login" />

        <Link to="/register"
          className="text-white underline hover:text-blue-300"
        >dont have an account yet?</Link>

        </div>

      </div>
    </>
  )
}