import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import { BrowserRouter, Route } from 'react-router'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { Routes } from 'react-router'
import MainLayout from './pages/MainLayout.tsx'
import SignIn from './components/Forms/SignIn.tsx'
import SignUp from './components/Forms/SignUp.tsx'
import Post from './pages/Post/Post.tsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import CreatePost from './pages/CreatePost/CreatePost.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/create_post" element={<CreatePost />} />
            <Route path="*" element={<ErrorPage text='Такой страницы не существует' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
