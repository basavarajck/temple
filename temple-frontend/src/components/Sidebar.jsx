import { Link } from "react-router-dom";
import { getUser } from "../auth/authUtils";

const Sidebar = () => {
  const user = getUser();

  const menu = {
    villager: [
      { label: "Dashboard", path: "/villager" },
      { label: "Income & Expense", path: "/villager/income-expense" },
      { label: "Announcements", path: "/villager/announcements" },
      { label: "Events", path: "/villager/events" },
      { label: "Gallery", path: "/villager/gallery" },
      { label: "Complaints", path: "/villager/complaints" },
    ],
    committee: [
      { label: "Dashboard", path: "/committee" },
      { label: "Add Income", path: "/committee/income" },
      { label: "Add Expense", path: "/committee/expense" },
      { label: "Complaints", path: "/committee/complaints" },
      { label: "Events", path: "/committee/events" },
      { label: "Announcements", path: "/committee/announcements" },
      { label: "Gallery Upload", path: "/committee/gallery" },
    ],
    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Approve Expenses", path: "/admin/expenses" },
      { label: "Lock Month", path: "/admin/lock" },
      { label: "Reports", path: "/admin/reports" },
      { label: "Audit Logs", path: "/admin/activity-logs" },
      { label: "Manage Users", path: "/admin/users" },
    ],
  };

  return (
    <div className="w-60 bg-gray-100 h-full p-4">
      <ul className="space-y-2">
        {menu[user?.role]?.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="block px-3 py-2 rounded hover:bg-blue-100"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
