import React, { useRef } from "react";
import { Button, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import { useHistory, useParams } from "react-router-dom";
import EditableTable from "../components/UI/EditableTable";
import useFetchByID from "../hooks/useFetchByID";
import { toFormatDate } from "../utils/utils";
import useFetch from "../hooks/useFetch";

const OrderDetail = () => {
  const history = useHistory();
  const params = useParams();
  const id = params.orderId;
  const formRef = useRef(null);

  const [order, loading, error, setOrder] = useFetchByID("orders", {
    id,
  });
  const [products, productLoading, productErros] = useFetch("products");

  if (loading || productLoading) return <Spin />;
  if (error || productErros) return <p>{error || productErros}</p>;

  const { createdAt } = order;

  const productSelectChangeHandler = ({ value, form, record }) => {
    const isProduct = products.find((item) => item.productName === value);
    if (isProduct) {
      form.setFieldsValue({
        [record.key]: {
          productPrice: isProduct.productPrice,
          productQuantity: 1,
          productId: isProduct.id,
        },
      });
    }
  };

  const updateHandler = (values) => {
    const newObj = {
      ...order,
      products: values,
    };
    setOrder(newObj);
  };

  const saveHandler = async () => {
    console.log("save");
    console.log(order);
    const form = formRef?.current;
    if (form) {
      await form.validateFields();
      form.submit();
    }
  };

  const doubleClickHanlder = (record) => {
    const newPath = `/product/${record.productId}`;
    history.push(newPath);
  };

  const productDatasource = order.products.map((item, index) => {
    return {
      key: index,
      productName: item.productName,
      productPrice: item.productPrice,
      productQuantity: item.productQuantity,
      productId: item.productId,
    };
  });

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
      valueType: "select",
      editable: true,
      options: productOptions,
      onChange: productSelectChangeHandler,
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      valueType: "input",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      valueType: "input",
      editable: true,
    },
    {
      title: "ID",
      dataIndex: "productId",
      valueType: "input",
      editable: true,
      disabled: true,
    },
  ];

  return (
    <div className="margin-25">
      <Title level={4} type="secondary" style={{ marginBottom: "30px" }}>
        OrderDetail - {toFormatDate(createdAt)}
      </Title>
      <EditableTable
        formRef={formRef}
        data={productDatasource}
        updateTable={updateHandler}
        columns={columns}
        editable={{
          addRow: {
            title: "Add More Products",
          },
          type: "multiple",
        }}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              doubleClickHanlder(record);
            },
          };
        }}
      >
        <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
          <Button danger type="primary" onClick={saveHandler}>
            Save
          </Button>
        </div>
      </EditableTable>
    </div>
  );
};

export default OrderDetail;
