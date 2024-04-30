import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MyNavbar from "./components/MyNavbar";
import PostDetails from "./components/PostDetails";
import PostForm from "./components/PostForm";
import EditForm from "./components/EditForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/form" element={<PostForm />} />
        <Route path="/edit" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
