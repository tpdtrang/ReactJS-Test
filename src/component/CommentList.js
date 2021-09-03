import { PageHeader, Table } from "antd";
import React, { useEffect, useState } from "react";

const CommentList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  const columns = [
    { title: "Name", key: "name", dataIndex: "name" },
    { title: "Email", key: "email", dataIndex: "email" },
    { title: "Description", key: "body", dataIndex: "body" },
  ];
  return (
    <div>
      <PageHeader title="Comments" style={{ padding: "0px 0px 20px" }} />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default CommentList;
