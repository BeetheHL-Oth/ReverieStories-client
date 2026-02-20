import { createBrowserRouter } from "react-router";
import { redirect } from "react-router";
import Home from "../pages/home";
import BaseLayout from "../pages/BaseLayout";
import Register from "../pages/register";
import Login from "../pages/login";
import WelcomeCard from "../components/welcomecard";
import StoryCard from "../components/storycard";
import MyStories from "../pages/mystories";
import AddStory from "../pages/addmystory";
import EditStory from "../pages/editmystory";
import StoryDetails from "../pages/storydetails";
import MyStoryLayout from "../pages/MyStoryLayout";
import AddChapter from "../pages/addchapter";
import EditChapter from "../pages/editchapter";
import AddTag from "../pages/addTag";
import ChatHome from "../components/chathome";
import AddChat from "../components/addChat";
import Chatbot from "../components/chatbot";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        path:'/',
        element: <Home/>,
        children: [
          {
            index: true,
            element: <WelcomeCard/>
          },
          {
            path: ':storyId',
            element: <StoryCard/>
          }
        ]
      },
      {
        path: 'mystories',
        element: <MyStoryLayout/>,
        loader: () => {
          if (!localStorage.getItem('access_token')) {
            return redirect('/login')
          }
        },
        children: [
          {
            index: true,
            element: <MyStories/>,
          },
          {
            path: 'add',
            element: <AddStory/>,
          }, 
          {
            path: ':storyId',
            element: <StoryDetails/>,
          },
          {
            path: ':storyId/edit',
            element: <EditStory/>,
          },
          {
            path: ':storyId/addchapter',
            element: <AddChapter/>,
            children: [
              {
                index: true,
                element: <ChatHome/>,
              },
              {
                path: 'chat/new',
                element: <AddChat/>
              },
              {
                path: 'chat/:chatId',
                element: <Chatbot/>
              },
            ]
          },
          {
            path: ':storyId/:chapterId',
            element: <EditChapter/>,
          },
          {
            path: ':storyId/addtags',
            element: <AddTag/>,
          },
        ]
      },
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
