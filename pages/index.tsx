import type { NextPage } from "next";
import Head from "next/head";
import ApiData from "./apiDatas.json";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { useState, useEffect } from "react";
import { BsFillBasket3Fill } from "react-icons/bs";

const Home: NextPage = () => {
  const products = ApiData;
  const [itensNoCarrinho, setItensNoCarrinho] = useState([]);

  const Adicionar = (item: any) => {
    //Verificando se o item já está no carrinho
    const isInCart = itensNoCarrinho.find((x: any) => x.id === item.id) as any;

    //Se já estiver no carrinho, então somo mais um...
    if (isInCart) {
      const novoItem = itensNoCarrinho.map((x: any) =>
        x.id === item.id ? { ...isInCart, qty: isInCart.qty + 1 } : x
      ) as any;
      setItensNoCarrinho(novoItem);
      localStorage.setItem("itensNoCarrinho", JSON.stringify(novoItem));
    } else {
      const novoItem = [...itensNoCarrinho, { ...item, qty: 1 }];
      setItensNoCarrinho(novoItem as any);

      //armazenando valores no localstorage
      localStorage.setItem("itensNoCarrinho", JSON.stringify(novoItem));
    }
  };
  const Remover = (item: any) => {
    const isInCart = itensNoCarrinho.find((x: any) => x.id === item.id) as any;

    if (isInCart.qty === 1) {
      const novoItem = itensNoCarrinho.filter((x: any) => x.id !== item.id);
      setItensNoCarrinho(novoItem);
      localStorage.setItem("itensNoCarrinho", JSON.stringify(novoItem));
    } else {
      const novoItem = itensNoCarrinho.map((x: any) =>
        x.id === item.id ? { ...isInCart, qty: isInCart.qty - 1 } : x
      ) as any;
      setItensNoCarrinho(novoItem);

      //armazenando valores no localstorage
      localStorage.setItem("itensNoCarrinho", JSON.stringify(novoItem));
    }
  };

  useEffect(() => {
    setItensNoCarrinho(
      localStorage.getItem("itensNoCarrinho")
        ? JSON.parse(localStorage.getItem("itensNoCarrinho") as any)
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
          {itensNoCarrinho.length ? (
            <h1 className="absolute mt-[-22px] ml-[13px] z-50 text-indigo-600 text-lg">
              {itensNoCarrinho.length}
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
              adicionar={Adicionar}
              remover={Remover}
              products={product}
            />
          ))}
        </div>

        <Cart
          adicionar={Adicionar}
          itensNoCarrinhos={itensNoCarrinho}
          remover={Remover}
        />
      </div>
    </div>
  );
};

export default Home;
