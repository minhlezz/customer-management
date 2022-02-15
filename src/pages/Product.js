import React, { useEffect, useState } from "react";
import { Spin } from "antd";

import ProductForm from "../components/Product/ProductForm";
import ProductList from "../components/Product/ProductList";
import * as productService from "../firebase/firebase.service";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState();

  const fetchProduct = (isSubcribed) => {
    let result = [];
    productService
      .findAll("products")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val();
          for (let key in values) {
            result.push({
              id: key,
              ...values[key],
            });
          }
          if (isSubcribed) {
            setProducts(result);
          }
          setIsLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        setErrors(error);
      });
  };

  useEffect(() => {
    let isSubcribed = true;

    fetchProduct(isSubcribed);

    return () => (isSubcribed = false);
  }, []);

  const addProductHandler = (values) => {
    const newProduct = {
      productName: values.productName,
      productPrice: +values.productPrice,
    };
    productService
      .create("products", newProduct)
      .then(() => {
        setProducts([...products, newProduct]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) return <Spin />;
  if (errors) return <p>{errors}</p>;

  return (
    <div>
      <ProductForm addProductHandler={addProductHandler} />
      <ProductList products={products} />
    </div>
  );
};

export default Product;
