import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import { BrowserRouter, Route } from 'react-router'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { Routes } from 'react-router'
import MainLayout from './pages/MainLayout.tsx'
import SignIn from './components/Auth/SignIn.tsx'
import SignUp from './components/Auth/SignUp.tsx'
import SinglePost from './pages/SinglePost/SinglePost.tsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import CreatePost from './pages/CreatePost/CreatePost.tsx'
import Profile from './pages/Profile/Profile.tsx'
import CreateTag from './pages/CreateTag/CreateTag.tsx'
import UsersControl from './pages/UsersControl/UsersControl.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/post/:id" element={<SinglePost />} />

            <Route path="/create_post" element={<CreatePost />} />
            <Route path="/create_tag" element={<CreateTag />} />
            <Route path="/users_control" element={<UsersControl />} />

            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<ErrorPage text='Такой страницы не существует' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
