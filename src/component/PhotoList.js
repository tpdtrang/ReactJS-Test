import { PageHeader, Select, Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";

const PhotoList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataAlbums, setDataAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => {
        // setLoading(false);
        setDataAlbums(json);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    if (selectedAlbum) {
      fetch(
        `https://jsonplaceholder.typicode.com/albums/${selectedAlbum}/photos`
      )
        .then((response) => response.json())
        .then((json) => {
          setLoading(false);
          setData(json);
        });
    }
  }, [selectedAlbum]);

  const columns = [
    { title: "Title", key: "title", dataIndex: "title" },
    {
      title: "ThumbnailUrl",
      key: "thumbnailUrl",
      dataIndex: "thumbnailUrl",
      render: (thumbnailUrl) => <img alt="" src={thumbnailUrl} />,
    },
  ];
  if (loading) return <Skeleton />;
  return (
    <div>
      <PageHeader title="Photos" style={{ padding: "0px 0px 20px" }} />
      <Select
        value={selectedAlbum}
        style={{ width: 300, marginBottom: 20 }}
        onChange={(value) => setSelectedAlbum(value)}
      >
        {dataAlbums?.map((album) => (
          <Select.Option value={album.id} key={album.id}>
            {album.title}
          </Select.Option>
        ))}
      </Select>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default PhotoList;
