import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Header () {
  const [token, setToken] = useState(localStorage.getItem('access_token'))
  const [role, setRole] = useState(localStorage.getItem('role'))

  const location = useLocation()
  const reroute = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem('access_token'))
    setRole(localStorage.getItem('role'))
  }, [location])

  function logout () {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('role')
        localStorage.removeItem('UserId')
        setToken(null)
        setRole(null)
        Swal.fire('See you later!', 'Successfully logged out')
        reroute('/')
      }
    })
  }

  return (
    <>
      <div 
        className="flex fixed top-0 right-0 left-0 bg-slate-700 text-sky-300 h-1/14 p-3 px-5 shadow-xl justify-between"
      >

        <div>

          <h1 className="text-4xl"><b>Reverie Stories</b></h1>

        </div>

        <div 
          className="flex gap-15 text-2xl items-center"
        >

          <Link to="/" 
            className="hover:-translate-y-2 transition-all duration-300"
          >Home
          </Link>

          <Link to="/mystories" 
            className="hover:-translate-y-2 transition-all duration-300"
          >My Stories
          </Link>

          {token ? (<>
              <button onClick={logout}
                className="cursor-pointer hover:-translate-y-2 transition-all duration-300"
              >Logout
              </button>
            </>
          ): 
            (<>
              <Link to="/login" 
                className="hover:-translate-y-2 transition-all duration-300"
              >Login
              </Link>
            </>
          )}

        </div>

      </div>
    </>
  )
}