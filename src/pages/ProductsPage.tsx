import React, { useContext } from "react";
import { CreateProduct } from "../components/CreateProduct";
import ErrorMessage from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import Modal from "../components/Modal";
import { Product } from "../components/Product";
import { ModalContext } from "../context/ModalContext";
import { useProducts } from "../hooks/products";
import { IProduct } from "../models";

export const ProductsPage = () => {
  const {loading, error, products, addProduct} = useProducts();
  const {modal, open, close} = useContext(ModalContext);

  const createHandler = (product: IProduct) => {
    close();
    addProduct(product)
  }

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      <h1>Hey</h1>
      {loading && <Loader/> }
      {error && <ErrorMessage error={error}/>}

      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
      {modal && 
      <Modal title="Create new product" onClose={close}>
        <CreateProduct onCreate={createHandler}/>
      </Modal>}

      <button 
        className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-xl px-4 py-2"
        onClick={open}
      >
        +
      </button>
    </div>
  );
}
