"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertCircle, RotateCw } from "lucide-react";

import Badge from "@/components/ui/Badge/Badge";
import Spinner from "@/components/ui/Spinner/Spinner";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import Pagination from "@/components/ui/Pagination/Pagination";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select/Select";

import adminUserService from "@/services/adminUserService";
import useAuthStore from "@/store/authStore";

const PAGE_SIZE = 20;

export default function AdminUsersPage() {
  const currentUserId = useAuthStore((state) => state.user?.id);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // همان الگوی admin/products/page.js: تابع واکشی عمداً داخل effect
  // تعریف شده، پس «تلاش دوباره» فقط این عدد را افزایش می‌دهد
  const [retryToken, setRetryToken] = useState(0);

  // شناسه‌ی کاربری که الان درخواستِ وضعیت/نقشش در حال ارسال است — برای
  // غیرفعال‌کردن فقط دکمه/سلکتِ همان ردیف حین درخواست، نه کل جدول
  const [pendingUserId, setPendingUserId] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const result = await adminUserService.list({ page, limit: PAGE_SIZE });

        if (ignore) return;

        setUsers(result.users || []);
        setPages(result.pages || 1);
      } catch (err) {
        if (!ignore) {
          setError(err.message || "دریافت کاربران انجام نشد");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      ignore = true;
    };
  }, [page, retryToken]);

  const handleToggleStatus = async (user) => {
    setPendingUserId(user._id);

    try {
      const result = await adminUserService.updateStatus(user._id, !user.isActive);

      toast.success(result.message);

      setUsers((current) =>
        current.map((item) =>
          item._id === user._id ? { ...item, isActive: result.user.isActive } : item,
        ),
      );
    } catch (err) {
      toast.error(err.message || "تغییر وضعیت کاربر انجام نشد");
    } finally {
      setPendingUserId(null);
    }
  };

  const handleRoleChange = async (user, role) => {
    if (role === user.role) return;

    setPendingUserId(user._id);

    try {
      const result = await adminUserService.updateRole(user._id, role);

      toast.success(result.message);

      setUsers((current) =>
        current.map((item) =>
          item._id === user._id ? { ...item, role: result.user.role } : item,
        ),
      );
    } catch (err) {
      toast.error(err.message || "تغییر نقش کاربر انجام نشد");
    } finally {
      setPendingUserId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="mb-6 text-2xl font-bold">مدیریت کاربران</h1>

      {loading && (
        <div className="py-16">
          <Spinner />
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30">
          <AlertCircle size={28} className="mx-auto text-red-500" />

          <p className="mt-3 font-semibold">کاربران بارگذاری نشد</p>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{error}</p>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setRetryToken((token) => token + 1)}
          >
            <RotateCw size={18} />
            تلاش دوباره
          </Button>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <EmptyState
          icon="👤"
          title="هنوز کاربری ثبت نشده"
          description="کاربران بعد از ثبت‌نام در همین‌جا نمایش داده می‌شوند."
        />
      )}

      {!loading && !error && users.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-right">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <th className="py-3 font-medium">نام</th>
                  <th className="py-3 font-medium">شماره موبایل</th>
                  <th className="py-3 font-medium">نقش</th>
                  <th className="py-3 font-medium">وضعیت</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => {
                  // ادمین نمی‌تواند روی ردیفِ خودش این دو عملیات را انجام
                  // دهد — همان محدودیتی که بک‌اند (auth.service.js) هم
                  // اعمال می‌کند؛ اینجا فقط دکمه را از قبل غیرفعال نشان
                  // می‌دهیم تا کاربر با خطای ۴۰۰ از سرور مواجه نشود
                  const isSelf = user._id === currentUserId;
                  const isPending = pendingUserId === user._id;

                  return (
                    <tr
                      key={user._id}
                      className="border-b border-gray-200 last:border-0 dark:border-gray-800"
                    >
                      <td className="py-3 font-medium">
                        {user.name}
                        {isSelf && (
                          <span className="mr-2 text-xs font-normal text-gray-400 dark:text-gray-500">
                            (شما)
                          </span>
                        )}
                      </td>

                      <td className="py-3 text-gray-600 dark:text-gray-400">
                        {user.phone}
                      </td>

                      <td className="py-3">
                        <Select
                          value={user.role}
                          disabled={isSelf || isPending}
                          onChange={(event) => handleRoleChange(user, event.target.value)}
                          className="!w-auto !px-3 !py-1.5 text-sm"
                        >
                          <option value="user">کاربر</option>
                          <option value="admin">ادمین</option>
                        </Select>
                      </td>

                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={user.isActive ? "success" : "danger"}>
                            {user.isActive ? "فعال" : "غیرفعال"}
                          </Badge>

                          <Button
                            variant="outline"
                            className="!px-3 !py-1.5 text-xs"
                            disabled={isSelf || isPending}
                            onClick={() => handleToggleStatus(user)}
                          >
                            {user.isActive ? "غیرفعال کن" : "فعال کن"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={page} totalPages={pages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
