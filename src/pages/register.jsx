import { useState } from "react"
import UserForm from "../components/userForm"
import { Link, useNavigate } from "react-router"
import { loginApi } from "../http/axios"
import Swal from "sweetalert2"

export default function Register () {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const reroute = useNavigate()

  async function submit(event) {
    event.preventDefault()

    try {
      const response = await loginApi({
        method: 'POST',
        url: '/users/register',
        data: {
          username: user.username,
          email: user.email,
          password: user.password
        }
      })

      Swal.fire({
        icon: 'success',
        title: 'Registered!',
        text: `${response.data.data.username} has been successfully registered`
      })

      setUser({
        username: '',
        email: '',
        password: ''
      })

      reroute('/login')
    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Register failed',
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

          <UserForm user={user} setUser={setUser} submit={submit} formType="Register" />

          <Link to="/login"
          className="text-white underline hover:text-blue-300"
        >already have an account?</Link>

        </div>

      </div>
    </>
  )
}