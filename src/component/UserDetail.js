import { PageHeader, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [totalTodo, setTotalTodo] = useState(null);
  const [totalPosts, setTotalPosts] = useState(null);
  const [totalAlbums, setTotalAlbums] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setData(json);
      });
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
      .then((response) => response.json())
      .then((json) => setTotalTodo(json?.length));
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then((response) => response.json())
      .then((json) => setTotalPosts(json?.length));
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
      .then((response) => response.json())
      .then((json) => setTotalAlbums(json?.length));
  }, []);

  if (loading) return <Skeleton />;
  return (
    <div>
      <PageHeader title="User Detail" style={{ padding: "0px 0px 20px" }} />
      <p>
        <b>Name:</b> {data?.name}
      </p>
      <p>
        <b>Username:</b> {data?.username}
      </p>
      <p>
        <b>Email:</b> {data?.email}
      </p>
      <p>
        <b>Address:</b> {data?.address.street}
      </p>
      <p>
        <b>Phone:</b> {data?.phone}
      </p>
      <p>
        <b>Total todos:</b> {totalTodo}
      </p>
      <p>
        <b>Total posts:</b> {totalPosts}
      </p>
      <p>
        <b>Total albums:</b> {totalAlbums}
      </p>
    </div>
  );
};

export default UserDetail;
