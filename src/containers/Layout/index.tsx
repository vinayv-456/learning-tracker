import React from "react";
import { Link, Outlet } from "react-router-dom";
import { SignOutButton } from "../auth/singOut";

interface Props {}

function Layout(props: Props) {
  const {} = props;
  return (
    <div>
      <span>layout</span>
      <SignOutButton />
      <div>
        <Link to="/">profile</Link>
        <Link to="/calendar">calendar</Link>
        <Link to="/add-event">add event</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
