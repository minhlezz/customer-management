import React from "react";
import { Form, Spin, Tabs } from "antd";

import ProductForm from "../components/Product/ProductForm";
import ProductList from "../components/Product/ProductList";
import useFetch from "../hooks/useFetch";
import { fetchAPI } from "../restService/restService";

const { TabPane } = Tabs;
const Product = () => {
  const [form] = Form.useForm();

  const [products, loading, error, setProducts] = useFetch("Products");

  const updateProductHandler = (values) => {
    setProducts([...products, values]);
  };

  const addProductHandler = async () => {
    await form.validateFields();
    const formValues = form.getFieldsValue();
    form.resetFields();
    const newProduct = { ...formValues };
    console.log(newProduct);
    try {
      await fetchAPI("Products", newProduct, {
        method: "POST",
      });
      updateProductHandler(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Spin />;
  if (error) return <p>{error}</p>;

  return (
    <div className="margin-25">
      <Tabs defaultActiveKey="1" tabPosition="left" style={{ minHeight: 220 }}>
        <TabPane tab="Product List" key="1">
          <ProductList products={products} />
        </TabPane>
        <TabPane tab="Add Product" key="2">
          <ProductForm
            updateProductHandler={updateProductHandler}
            form={form}
            addProductHandler={addProductHandler}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Product;
