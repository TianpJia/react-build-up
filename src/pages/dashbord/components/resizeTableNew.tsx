import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Resizable } from "react-resizable";
import "../../../../node_modules/react-resizable/css/styles.css";

const dataSource = [
  {
    key: "1",
    name: "张三",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "李四",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 110,
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: 90,
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    width: 220,
  },
  {},
];

const ResizableTitle = (props: {
  [x: string]: any;
  onResize: any;
  width: any;
}) => {
  const { onResize, width, ...restProps } = props;
  if (width === undefined) {
    return <th {...restProps}></th>;
  }
  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps}></th>
    </Resizable>
  );
};

const MyTable = () => {
  const [newCols, setNewCols] = useState<any>();

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const handleResize =
    (column: any) =>
    (e: any, { size }: any) => {
      setNewCols((pre: any) => {
        const tmpCols = pre.map((item: any) => {
          if (item === column) {
            item.width = size.width;
          }
          return item;
        });
        return tmpCols;
      });
    };

  useEffect(() => {
    setNewCols(
      columns.map((col: any) => {
        col.onHeaderCell = () => ({
          width: col.width,
          onResize: handleResize(col),
        });
        return col;
      })
    );
  }, []);

  return (
    <div>
      <Table
        bordered
        dataSource={dataSource}
        columns={newCols}
        components={components}
      />
    </div>
  );
};

export default MyTable;
