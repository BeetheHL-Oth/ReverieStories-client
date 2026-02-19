import { createBrowserRouter } from "react-router";
import { redirect } from "react-router";
import Home from "../pages/home";
import BaseLayout from "../pages/BaseLayout";
import Register from "../pages/register";
import Login from "../pages/login";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        index: true,
        element: <Home/>,
        // children: [
        //   {
        //     path: '/:storyId',
        //     element: <StoryCard/>
        //   }
        // ]
      },
      // {
      //   path: 'mystories',
      //   element: <MyStories/>,
      //   loader: () => {
      //     if (!localStorage.getItem('access_token')) {
      //       redirect('/login')
      //     }
      //   }
      // }
    ]
  },
  {
    path: 'login',
    Component: Login,
    loader: () => {
      if (localStorage.getItem('access_token')) {
        return redirect('/')
      }
    }
  },
  {
    path: 'register',
    Component: Register,
    loader: () => {
      if (localStorage.getItem('access_token')) {
        return redirect('/')
      }
    }
  }
])
