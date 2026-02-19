import { Link } from "react-router"

export default function UserForm ({user, setUser, submit, formType}) {
  return (
    <form onSubmit={submit}
      className="flex flex-col gap-1 justify-center text-2xl text-white bg-slate-700 h-3/5 w-9/10 p-20 rounded-2xl mx-10 shadow-xl"
    >
      <h1
        className="text-4xl text-center"
      ><b>{formType}</b></h1>
      <br />

      {formType === 'Register' ? (<>
          <label htmlFor="username" 
            className=""
          >Username:</label>
          
          <input id="username"
            type="text"
            value={user.username}
            onChange={e => {
              setUser({
                ...user,
                username: e.target.value
              })
            }}
            className="bg-white text-black px-3 py-1 shadow-inner rounded-xl"
          />
        </>
      ) : ''}

      <br />

      <label htmlFor="email"
        className=""
      >Email:</label>

      <input id="email" 
        type="text"
        value={user.email}
        onChange={e => {
          setUser({
            ...user,
            email: e.target.value
          })
        }}
        className="bg-white text-black px-3 py-1 shadow-inner rounded-xl"
      />

      <br />

      <label htmlFor="password"
        className=""
      >Password:</label>

      <input id="password"
        type="password" 
        autoComplete="off"
        value={user.password}
        onChange={e => {
          setUser({
            ...user,
            password: e.target.value
          })
        }}
        className="bg-white text-black px-3 py-1 shadow-inner rounded-xl"
      />

      <br /><br />

      <button onClick={submit}
        className="bg-sky-700 rounded-2xl py-1 w-1/2 self-center hover:bg-sky-300 hover:text-slate-700 transition-all duration-300 active:opacity-70"
      >Submit</button>

      <Link to="/"
        className="text-xs text-center mt-2 underline hover:text-blue-300"
      >return home</Link>
    </form>
  )
}