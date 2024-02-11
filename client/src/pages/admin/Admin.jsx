import './admin.css';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AdminSidebar } from '../../allPagesPaths';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Admin = () => {

  const { user } = useSelector((state) => state.auth);

  /*===========================================*/

  return (
    <>
      {user?.isAdmin
        ?
        <>
          <div className='admin text-white'>
            <div className="admin-content">
              <div className="left">
                <AdminSidebar />
              </div>
              <div className="right">
                <Outlet />
              </div>
            </div>
          </div>
        </>
        :
        <Navigate to="/" replace />
      }
    </>

  );
}

export default Admin;