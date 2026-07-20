import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import UserInfoCard from "@/components/dashboard/UserInfoCard";
import RecentOrders from "@/components/dashboard/RecentOrders";

export default function AccountPage() {
  return (
    <main className="space-y-8">
      <DashboardHeader />

      <DashboardStats />

      <div className="grid gap-8 lg:grid-cols-3">
        <UserInfoCard />

        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
      </div>
    </main>
  );
}
