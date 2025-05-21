import DashboardOverviewCards from '@/components/DashboardOverviewCards';
import RecentActivity from '@/components/RecentActivity';
import QuickActions from '@/components/QuickActions';
import Timetable from '@/components/Timetable';

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <DashboardOverviewCards />
      <QuickActions />
      <RecentActivity />
      <Timetable />
      {/* Timetable will go here next */}
    </div>
  );
} 