import { Button, Input, PageHeader, Select, Skeleton, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState([]);
  const [selected, setSelected] = useState("all");
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setData(json);
        setDataNew(json);
      });
  }, []);
  const columns = [
    { title: "Title", key: "title", dataIndex: "title" },
    {
      title: "Completed",
      key: "completed",
      dataIndex: "completed",
      render: (completed) => <Tag>{completed ? "true" : "false"}</Tag>,
    },
  ];
  const onChangeSearch = (e) => {
    const value = e.target.value;
    if (value) {
      const filteredData = data.filter((element) => {
        return element.title.toLowerCase().includes(value.toLowerCase());
      });
      setData(filteredData);
    } else {
      setData(dataNew);
    }
  };
  const onChangeSelect = (value) => {
    setSelected(value);
    switch (value) {
      case true:
        setData(
          dataNew.filter((element) => {
            return element.completed;
          })
        );
        break;
      case false:
        setData(
          dataNew.filter((element) => {
            return !element.completed;
          })
        );
        break;
      case "all":
        setData(dataNew);
        break;

      default:
        break;
    }
  };
  if (loading) return <Skeleton />;
  return (
    <div>
      <PageHeader title="Todos" style={{ padding: "0px 0px 20px" }} />
      <div style={{ marginBottom: 20 }}>
        <Button.Group>
          <Select
            onChange={onChangeSelect}
            value={selected}
            style={{ width: 200 }}
          >
            <Select.Option value="all">All status</Select.Option>
            <Select.Option value={true}>True</Select.Option>
            <Select.Option value={false}>False</Select.Option>
          </Select>
          <Input.Search placeholder="Search..." onChange={onChangeSearch} />
        </Button.Group>
      </div>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default TodoList;
