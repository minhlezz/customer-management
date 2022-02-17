import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";

const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  option,
  selectChange,
  ...restProps
}) => {
  const onSelectChange = (value) => {
    selectChange(value);
  };

  let inputNode;
  if (dataIndex === "productName") {
    inputNode = (
      <Select onChange={onSelectChange}>
        {option.map((op) => (
          <Option value={op.productName} key={op.productId}>
            {op.productName}
          </Option>
        ))}
      </Select>
    );
  } else {
    inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const OrderTable = (props) => {
  const { products, data, updateProductHandler } = props;
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const isEditing = (record) => record.key === editingKey;

  const productOption = products.map(({ productName, id }) => {
    return {
      productName,
      productId: id,
    };
  });

  const edit = (record) => {
    setIsEdit(true);
    if (record.key === "init") {
      record.key = Math.floor(Math.random() * 1000);
      form.setFieldsValue({
        ...record,
        productName: "",
        productPrice: "",
        productQuantity: "",
        productId: "",
      });
    } else {
      form.setFieldsValue({
        productName: "",
        productPrice: "",
        productQuantity: "",
        productId: "",
        ...record,
      });
    }
    setEditingKey(record.key);
  };

  const cancel = (record) => {
    if (record.status === "init") {
      const removeRecord = data.filter((item) => item.key !== record.key);
      updateProductHandler(removeRecord);
    }
    setEditingKey("");
    setIsEdit(false);
  };

  const addNewOrder = () => {
    const newOrder = {
      key: "init",
      productName: "",
      productPrice: 0,
      productQuantity: 0,
      productId: "",
      status: "init",
    };
    const updateData = [...data, newOrder];
    updateProductHandler(updateData);
    edit(newOrder);
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => record.key === item.key);

      if (index > -1) {
        const item = {
          ...newData[index],
          productId: selectedProduct.id,
          status: "updated",
        };
        newData.splice(index, 1, { ...item, ...row });
        updateProductHandler(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        updateProductHandler(newData);
        setEditingKey("");
      }
      setIsEdit(false);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    updateProductHandler(newData);
  };

  const selectedProductHandler = (value) => {
    const isProduct = products.find((item) => item.productName === value);
    form.setFieldsValue({
      productPrice: isProduct.productPrice,
      productQuantity: 1,
    });
    setSelectedProduct(isProduct);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      width: "25%",
      editable: true,
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
      width: "15%",
      editable: true,
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => cancel(record)}
            >
              <Typography.Link>Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              type="default"
              style={{ marginRight: "10px" }}
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            {data.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <Typography.Link type="warning">Delete</Typography.Link>
              </Popconfirm>
            ) : null}
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "productPrice" || "productQuantity"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        option: productOption,
        selectChange: selectedProductHandler,
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Button
        onClick={addNewOrder}
        type="primary"
        style={{
          marginBottom: 16,
        }}
        disabled={isEdit}
      >
        Add a row
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default OrderTable;
