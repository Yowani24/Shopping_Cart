import React from "react";
import { IoIosCart } from "react-icons/io";

export default function Product(props:any) {
  const { products, adicionar } = props;
  const product = products ? products : [];
  return (
    <div className="flex flex-col items-center md:items-start md:flex-row flex-wrap w-full xl:w-[70%]">
      <div className="m-2">
        <div className="p-6 bg-white w-[300px] rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
          <img
            className="w-[250px] h-44 object-cover rounded-t-md"
            src={product.imageUrl}
            alt=""
          />
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-700">{product.name}</h1>
            <div className="mt-4 mb-2 flex justify-between pl-4 pr-2">
              <button className="block text-xl font-semibold text-gray-700 cursor-auto">
                R$ {product.price}
              </button>
              <IoIosCart
                className="shadow-md rounded-md p-2 transition-all text-5xl active:shadow-sm cursor-pointer hover:text-indigo-600"
                onClick={() => adicionar(product)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
