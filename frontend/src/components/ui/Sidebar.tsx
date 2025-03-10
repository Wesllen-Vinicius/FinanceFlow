import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, List, PieChart, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import ThemeToggle from "./ThemeToggle"; // Importando corretamente

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-white dark:bg-gray-900 shadow-lg transition-all flex flex-col justify-between ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div>
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
          </ul>
        </nav>
      </div>

      {/* Botão de Tema e Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <ThemeToggle /> {/* Agora está na Sidebar */}
        <button
          onClick={handleLogout}
          className="flex items-center p-3 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md mt-4"
        >
          <LogOut size={20} />
          {isOpen && <span className="ml-3">Sair</span>}
        </button>
      </div>
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
