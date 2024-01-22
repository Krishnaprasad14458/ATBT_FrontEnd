import React, { useContext, useMemo, useCallback } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { UserDataContext } from '../../../contexts/usersDataContext';

function UserProfile() {
  const { id } = useParams();
  const { usersState: {users} } = useContext(UserDataContext);

  const findUserById = useCallback((users, userId) => {
    return users.find(user => user.id === parseInt(userId, 10));
  }, []);

  const user = useMemo(() => findUserById(users, id), [findUserById, users, id]);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>ID:</strong> {user.id}
      </div>
      <div>
        <strong>Name:</strong> {user.fullname}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <ul>
          <li>
          <NavLink
            to={`/userProfile/${id}/teams`}
          >
            My Teams
          </NavLink>
          <NavLink
            to={`/userProfile/${id}/enteties`}
          >
            My Entities
          </NavLink>
          <NavLink
            to={`/userProfile/${id}/tasks`}
          >
            My Tasks
          </NavLink>
          </li>
        </ul>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
