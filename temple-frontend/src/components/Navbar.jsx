import { useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../auth/authUtils";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="h-14 bg-blue-700 text-white flex items-center justify-between px-4">
      <h1 className="font-semibold">Temple Transparency System</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user?.name} ({user?.role})
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
