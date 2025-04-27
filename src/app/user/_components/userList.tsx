"use client";

import { useGetUsersQuery } from "@/lib/api/usersApi";
import { useEffect, useState } from "react";

const UserList = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!usersLoading) setIsLoading(false);
  }, [usersLoading]);

  return (
    <ul>
      {isLoading ? (
        <div className="text-center p-4">Loading...</div>
      ) : users ? (
        users.map((user) => (
          <li
            key={user.id}
            className="cursor-pointer p-1 hover:bg-gray-100"
            onClick={() => (window.location.href = `/user/${user.id}`)}
          >
            {user.username}
          </li>
        ))
      ) : (
        "not found"
      )}
    </ul>
  );
};

export default UserList;
