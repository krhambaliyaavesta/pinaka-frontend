import { FaUsers, FaTachometerAlt, FaTimes, FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import { UserRole } from "@/modules/auth/domain/enums";

interface SidebarProps {
  user: {
    fullName: string;
    role: UserRole;
  };
  isMobile?: boolean;
  onCloseMobileMenu?: () => void;
}

export function Sidebar({ user, isMobile = false, onCloseMobileMenu }: SidebarProps) {
  // Only render sidebar for lead users
  if (user.role !== UserRole.LEAD) {
    return null;
  }

  // Mobile sidebar
  if (isMobile) {
    return (
      <div className="bg-white h-full w-64 p-5 shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold text-teal-600">
            Lead Dashboard
          </h1>
          <button
            onClick={onCloseMobileMenu}
            className="text-gray-600 focus:outline-none"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        
        {/* User profile section - now above menu */}
        <div className="mb-5 pb-5 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user.fullName.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.fullName}</p>
              <p className="text-xs text-gray-500">Lead</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
            onClick={onCloseMobileMenu}
          >
            <FaTachometerAlt className="mr-3" />
            <span>Overview</span>
          </Link>
          <Link
            href="/dashboard/users"
            className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
            onClick={onCloseMobileMenu}
          >
            <FaUsers className="mr-3" />
            <span>User Approvals</span>
          </Link>
          <Link
            href="/dashboard/teams"
            className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
            onClick={onCloseMobileMenu}
          >
            <FaUserFriends className="mr-3" />
            <span>Teams</span>
          </Link>
        </nav>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <div className="w-[16rem] flex-col bg-white shadow-md">
      <div className="p-5 border-b border-gray-200">
        <h1 className="text-xl font-bold text-teal-600">Lead Dashboard</h1>
      </div>
      
      {/* User profile section - now below title and above menu */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.fullName.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-xs text-gray-500">Lead</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
        >
          <FaTachometerAlt className="mr-3" />
          <span>Overview</span>
        </Link>
        <Link
          href="/dashboard/users"
          className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
        >
          <FaUsers className="mr-3" />
          <span>User Approvals</span>
        </Link>
        <Link
          href="/dashboard/teams"
          className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
        >
          <FaUserFriends className="mr-3" />
          <span>Teams</span>
        </Link>
      </nav>
    </div>
  );
} 