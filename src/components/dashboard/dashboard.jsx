import React, { useState } from "react";
import {
  ListTodo,
  PlusCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Home,
  Users,
  Settings,
} from "lucide-react";
import { useAuth } from "../context";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const { todos, profile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();



  // Rest of the rendering logic remains the same
  const renderContent = () => {
    switch (activeTab) {
 
      case "add-todo":
        return (
          <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Create New Todo
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTodo();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter Todo title"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2"
              >
                <PlusCircle size={20} />
                <span>Add Todo</span>
              </button>
            </form>
          </div>
        );
      default:
        return (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl text-gray-600 mb-4">
              Welcome, {profile?.name || "User"}
            </h2>
            <p className="text-gray-500">
              Select an option from the sidebar to get started
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Enhanced Sidebar */}
      <div
        className={`bg-white shadow-xl transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-72" : "w-20"
        } relative`}
      >
        {/* Improved toggle button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-8 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        <div className="p-6">
          {/* Enhanced Profile Section */}
          {isSidebarOpen && profile && (
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {profile.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {profile.name}
              </h2>
              <p className="text-gray-600 text-lg text-center mt-1">{profile.email}</p>
            </div>
          )}

          {/* Enhanced Navigation */}
          <nav className="space-y-2">
  
            <Link
              to="/allusers"
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group ${
                activeTab === "view-todos"
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <Users size={20} className="group-hover:scale-110 transition-transform duration-300" />
              {isSidebarOpen && <span>Users</span>}
            </Link>

      

            {/* Enhanced Logout Button */}
            <button
              className="w-full flex items-center space-x-3 p-3 mt-8 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-300 group border-t border-gray-100"
              onClick={() => navigate("/")}
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              {isSidebarOpen && <span>Home</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : "ml-12"
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;