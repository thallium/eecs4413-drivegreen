import { app_reports } from '@/app/backend/service/admin/reports';

// export const dynamic = 'force-dynamic';

export default async function LoginHistory() {
  const admin_history = await app_reports();
  // console.log(admin_history);
  return (
    <div className="overflow-x-auto max-h-48 overflow-y-scroll">
      <table className="table">
        <caption>Admin Access History</caption>
        <thead>
          <tr>
            <th>Time</th>
            <th>Email</th>
            <th>IP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admin_history &&
            admin_history.map((history) => (
              // console.log(history);
              <tr key={history.email + '-' + history.loginAt.toDateString()}>
                <td>{history.loginAt.toDateString()}</td>
                <td>{history.user.email}</td>
                <td>{history.ip}</td>
                <td>{history.action}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
