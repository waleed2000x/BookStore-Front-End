import { Link } from "react-router-dom";

export default function Appbar() {
  return (
    <div>
      <div className="logo"></div>
      <div className="nav-items">
        <Link to="/" />
      </div>
    </div>
  );
}
