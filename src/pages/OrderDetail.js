import React, { useRef, useState } from "react";
import { Button, InputNumber, Select, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import { useHistory, useParams } from "react-router-dom";
import EditableTable from "../components/EditableTable/";
import useFetchByID from "../hooks/useFetchByID";
import { toFormatDate } from "../utils/utils";
import useFetch from "../hooks/useFetch";

const initOrder = {
  customerId: "",
  products: [],
};

const OrderDetail = () => {
  const history = useHistory();
  const params = useParams();
  const id = params.orderId;
  const formRef = useRef(null);
  const [orderDetail, setOrderDetail] = useState(initOrder);

  const [order, loading, error] = useFetchByID("orders", {
    id,
  });
  const [products, productLoading, productErros] = useFetch("products");

  if (loading || productLoading) return <Spin />;
  if (error || productErros) return <p>{error || productErros}</p>;

  const { createdAt } = order;

  const productSelectChangeHandler = ({ value, form, record }) => {
    const selectedProduct = products.find((item) => item.productName === value);
    if (selectedProduct) {
      form.setFieldsValue({
        [record.key]: {
          productPrice: selectedProduct.productPrice,
          productQuantity: 1,
          productId: selectedProduct.id,
        },
      });
    }
  };

  const updateHandler = (values) => {
    const newObj = {
      ...order,
      products: values,
    };
    setOrderDetail(newObj);
  };

  const saveHandler = async () => {
    const form = formRef.current;
    await form.validateFields();

    const updatedOrder = {
      customerId: orderDetail.customerId,
      products: orderDetail.products,
    };
    console.log(form);
    console.log(form.getFieldsValue());
  };

  const doubleClickHanlder = (record) => {
    if (record.id) {
      const newPath = `/product/${record.id}`;
      history.push(newPath);
    }
    return;
  };

  const productOptions = products.map((product) => {
    return {
      label: product.productName,
      value: product.productName,
    };
  });

  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      width: "20%",
      editable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input Product",
          },
        ],
      },
      onChange: productSelectChangeHandler,
      renderFormInput: (form, recordKey) => {
        return (
          <Select
            options={productOptions}
            onChange={(value) => {
              console.log(value);
            }}
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      editable: true,
      inputType: InputNumber,
      inputProps: { min: 0 },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please Select Product",
          },
        ],
      },
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      editable: true,
      inputType: InputNumber,
      inputProps: { min: 0 },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input Quantity",
          },
        ],
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      valueType: "input",
      editable: true,
      inputProps: { disabled: true },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input ID",
          },
        ],
      },
    },
  ];

  return (
    <div className="margin-25">
      <Title level={4} type="secondary" style={{ marginBottom: "30px" }}>
        OrderDetail - {toFormatDate(createdAt)}
      </Title>
      <EditableTable
        formRef={formRef}
        dataSource={order.products}
        columns={columns}
        addNewButtonText="Add More Order"
        onChange={(values) => {
          updateHandler(values);
        }}
        type={"multiple"}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              doubleClickHanlder(record);
            },
          };
        }}
      >
        <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
          <Button
            danger
            type="primary"
            onClick={saveHandler}
            disabled={!formRef?.current?.isFieldsTouched()}
          >
            Save
          </Button>
        </div>
      </EditableTable>
    </div>
  );
};

export default OrderDetail;
