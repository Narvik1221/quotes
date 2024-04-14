import React, { useEffect ,useContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import "./styles/reset.css";
import { Start } from "./pages/Start";
import { Category } from "./pages/Category";
import { MyQuotes } from "./pages/MyQuotes";
import { Header } from "./components/Header";
import { observer } from "mobx-react-lite";
import {Context} from "./index";
export const App = observer(() => {
  const {quotes}:any = useContext(Context)
useEffect(()=>{
  // quotes.setLikes({
  //   _id:'123',
  //   author:'a',
  //   content:'c'
  // })
  // quotes.setLikes(JSON.parse(localStorage.getItem('likes')|| '{}'))
  quotes.setQuotes([{
    _id:'123',
    author:'a',
    content:'c'
  }])
},[])
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header></Header>

        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/categories/:slug" element={<Category></Category>} />
          <Route path="/my-quotes" element={<MyQuotes></MyQuotes>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
});
