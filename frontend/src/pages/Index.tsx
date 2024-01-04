import { Route, Routes } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";
import { Aside } from "../components/Aside";
import { AuthProvider } from "../provider/AuthProvider";
import { Home } from "./Home";
import { Profile } from "./Profile";

export const Index = () => {
  return (
    <AuthProvider>
      <div className="flex flex-row lg:container lg:mx-auto h-full">
        <NavMenu />
        <main className="flex grow p-4 h-full">
          <Routes>
            <Route path='*' element={<Home/>} />
            <Route path='/posts' element={<p>Posts</p>} />
            <Route path='/profile/:user' element={<Profile />} />
          </Routes>
        </main>
        <Aside />
      </div>
    </AuthProvider>
  )
}
