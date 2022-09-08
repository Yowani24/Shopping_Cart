import type { NextPage } from "next";
import Head from "next/head";
import ApiData from "./apiDatas.json";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { useState, useEffect } from "react";
import { BsFillBasket3Fill } from "react-icons/bs";

const Home: NextPage = () => {
  const products = ApiData;
  const [itemsInCart, setitemsInCart] = useState([]);

  const AddItem = (item: any) => {
    //Verificando se o item já está no carrinho
    const isInCart = itemsInCart.find((x: any) => x.id === item.id) as any;

    //Se já estiver no carrinho, então somo mais um...
    if (isInCart) {
      const novoItem = itemsInCart.map((x: any) =>
        x.id === item.id ? { ...isInCart, qty: isInCart.qty + 1 } : x
      ) as any;
      setitemsInCart(novoItem);
      localStorage.setItem("itemsInCart", JSON.stringify(novoItem));
    } else {
      const novoItem = [...itemsInCart, { ...item, qty: 1 }];
      setitemsInCart(novoItem as any);

      //armazenando valores no localstorage
      localStorage.setItem("itemsInCart", JSON.stringify(novoItem));
    }
  };
  const RemoveItem = (item: any) => {
    const isInCart = itemsInCart.find((x: any) => x.id === item.id) as any;

    if (isInCart.qty === 1) {
      const novoItem = itemsInCart.filter((x: any) => x.id !== item.id);
      setitemsInCart(novoItem);
      localStorage.setItem("itemsInCart", JSON.stringify(novoItem));
    } else {
      const novoItem = itemsInCart.map((x: any) =>
        x.id === item.id ? { ...isInCart, qty: isInCart.qty - 1 } : x
      ) as any;
      setitemsInCart(novoItem);

      //armazenando valores no localstorage
      localStorage.setItem("itemsInCart", JSON.stringify(novoItem));
    }
  };

  useEffect(() => {
    setitemsInCart(
      localStorage.getItem("itemsInCart")
        ? JSON.parse(localStorage.getItem("itemsInCart") as any)
        : []
    );
  }, []);

  return (
    <div>
      <Head>
        <title>Shopping cart</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <div className="w-full bg-indigo-600 h-24 flex items-center justify-center">
        <h1 className="text-2xl text-white font-black tracking-wide">Olá!</h1>
        <span className="absolute right-5 md:right-20 text-2xl text-white font-black tracking-wide">
          <BsFillBasket3Fill className="text-4xl" />
          {itemsInCart.length ? (
            <h1 className="absolute mt-[-22px] ml-[13px] z-50 text-indigo-600 text-lg">
              {itemsInCart.length}
            </h1>
          ) : (
            ""
          )}
        </span>
      </div>
      <div className="flex flex-col xl:flex-row sm:justify-between md:p-4 xl:px-20">
        <div className="flex flex-col md:flex-row">
          {products.items.map((product) => (
            <Product
              key={product.id}
              addItem={AddItem}
              removeItem={RemoveItem}
              products={product}
            />
          ))}
        </div>

        <Cart
          addItem={AddItem}
          itemsIncartData={itemsInCart}
          removeItem={RemoveItem}
        />
      </div>
    </div>
  );
};

export default Home;
