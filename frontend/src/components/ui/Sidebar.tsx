import { Link } from "react-router-dom";
import { useState } from "react";
import { Home, List, PieChart, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-white dark:bg-gray-900 shadow-lg transition-all ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-800 dark:text-white">
          {isOpen ? "FinanceFlow" : "FF"}
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 dark:text-gray-300"
        >
          ☰
        </button>
      </div>

      <nav className="mt-4">
        <ul className="space-y-2">
          <SidebarItem
            icon={<Home size={20} />}
            text="Dashboard"
            to="/dashboard"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<List size={20} />}
            text="Transações"
            to="/transactions"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<PieChart size={20} />}
            text="Relatórios"
            to="/reports"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Configurações"
            to="/settings"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<LogOut size={20} />}
            text="Sair"
            to="/logout"
            isOpen={isOpen}
          />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({
  icon,
  text,
  to,
  isOpen,
}: {
  icon: React.ReactNode;
  text: string;
  to: string;
  isOpen: boolean;
}) => {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
      >
        {icon}
        {isOpen && <span className="ml-3">{text}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
