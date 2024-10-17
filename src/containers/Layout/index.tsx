import React from "react";
import { Link, Outlet } from "react-router-dom";
import { SignOutButton } from "../auth/singOut";

interface Props {}

function Layout(props: Props) {
  const {} = props;
  return (
    <div style={{ background: "#E5E7EB", height: "100%" }}>
      <SignOutButton />
      <ul>
        <li>
          <Link to="/">profile</Link>
        </li>
        <li>
          <Link to="/calendar">calendar</Link>
        </li>
        <li>
          <Link to="/add-event">add event</Link>
        </li>
      </ul>
      <div className="mt-9">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
