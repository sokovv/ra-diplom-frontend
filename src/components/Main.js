import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Main(props) {
  return (
    <>
      <Header menu={props.menu} />
      <Outlet />
      <Footer menu={props.menu} />
    </>
  );
}
