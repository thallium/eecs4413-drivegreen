import { app_reports } from '@/app/backend/service/admin/reports';

export const getServerSideProps = async () => {
  const admin_accesses = await app_reports();

  return {
    props: {
      admin_history: admin_accesses,
    },
  };
};

export default function LoginHistory({admin_history}) {

  return (
    <div className="overflow-x-auto">
      <table className="table">
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
            admin_history.map((history) => {
                <tr>
                  <td>{history.loginAt}</td>
                  <td>{history.user.email}</td>
                  <td>{history.ip}</td>
                  <td>{history.action}</td>
                </tr>;
            })        
        }
        </tbody>
      </table>
    </div>
  );
}
