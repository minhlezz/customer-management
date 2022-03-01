import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, InputNumber, Select, Spin } from "antd";
import Title from "antd/lib/typography/Title";

import EditableTable from "../components/EditableTable/";
import { toFormatDate } from "../utils/utils";
import * as orderDetailService from "../firebase/firebase.service";
import useFetchByID from "../hooks/useFetchByID";
import useFetch from "../hooks/useFetch";
import ProductSelector from "../components/OrderDetail.js/ProductSelector";

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

    const { customerId, createdAt, products } = orderDetail;

    const options = {
      id,
      service: "orders",
      value: {
        customerId,
        createdAt,
        products,
      },
    };
    orderDetailService
      .updateById(options)
      .then(() => {
        console.log("success");
      })
      .catch((err) => console.error(err));

    history.goBack();
  };

  const doubleClickHanlder = (record) => {
    if (record.id) {
      const newPath = `/product/${record.id}`;
      history.push(newPath);
    }
    return;
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      editable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input Product",
          },
        ],
      },
      renderFormInput: (form, recordKey, updateOtherValues) => (
        <ProductSelector
          data={products}
          recordKey={recordKey}
          updateOtherValues={updateOtherValues}
        />
      ),
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
    {
      title: "Created At",
      dataIndex: "createdAt",
      valueType: "input",
      editable: true,
      inputProps: { disabled: true },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input created time",
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
