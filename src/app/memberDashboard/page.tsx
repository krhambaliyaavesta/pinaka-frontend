import { KudosCardsSection } from '@/presentation/templates/common/KudosCardsSection';

export default function MemberDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
        <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#42B4AC] opacity-50 rounded-md transform rotate-12"></div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 relative z-10">Member Dashboard</h1>
        <p className="text-gray-600 relative z-10">Welcome to your dashboard. Here you can manage your account and access various features.</p>
      </div>
      
      <KudosCardsSection 
        title="Kudos Cards"
        description="Select a card to send recognition and appreciation to your teammates."
      />
      
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Celebrate small wins, build big success</p>
      </div>
    </div>
  );
} 