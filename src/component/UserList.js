import { PageHeader, Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setData(json);
      });
  }, []);

  const columns = [
    { title: "Name", key: "name", dataIndex: "name" },
    { title: "Username", key: "username", dataIndex: "username" },

    { title: "Email", key: "email", dataIndex: "email" },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (address) => `${address.street}`,
    },
    { title: "Phone", key: "phone", dataIndex: "phone" },
    {
      title: "Action",
      key: "action",
      render: (record) => <a href={`/users/${record.id}`}>Detail</a>,
    },
  ];
  if (loading) return <Skeleton />;
  return (
    <div>
      <PageHeader title="Users" style={{ padding: "0px 0px 20px" }} />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default UserList;
