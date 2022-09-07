import React from "react";

export default function Cart(props) {
  const { itensNoCarrinho, adicionar, remover } = props;
  const unitPrice = itensNoCarrinho.reduce((a, c) => a + c.qty * c.price, 0);
  const frete = unitPrice > 10 ? "Frete grátis" : "Frete pago";
  const precoTotal = unitPrice + frete;
  return (
    <div className="flex flex-col justify-between bg-cyan-100 w-full xl:w-[30%] p-4">
      <p className="text-center font-black border-b-2 border-white pb-2">
        Carrinho
      </p>
      {itensNoCarrinho.length === 0 && <div>Carrinho vazio</div>}

      {itensNoCarrinho.map((item) => (
        <div key={item.id}>
          <div className="flex flex-col md:flex-row border-t border-gray-50 m-4 bg-wh bg-white rounded-md overflow-hidden">
            <div className="md:w-4/12 2xl:w-1/4 h-20 md:h-auto w-full">
              <img
                src={item.imageUrl}
                alt="item"
                className="h-full object-center object-cover md:block hidden"
              />
            </div>
            <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-between p-6">
              <div className="flex items-center justify-between w-full">
                <p className="text-base font-black leading-none text-gray-800 dark:text-white">
                  {item.name}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between pt-5">
                <div className="flex items-center justify-between ">
                  <p
                    className="text-xs leading-3 text-gray-800 dark:text-white cursor-pointer"
                    onClick={() => adicionar(item)}
                  >
                    Adicionar
                  </p>
                  <p className="mx-8">{item.qty}</p>
                  <p
                    className="text-xs leading-3 text-red-500 cursor-pointer"
                    onClick={() => remover(item)}
                  >
                    Remover
                  </p>
                </div>
                <p className="text-base font-black leading-none text-gray-800 dark:text-white">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {itensNoCarrinho.length !== 0 && (
        <div className="flex flex-col md:flex-row bg-white p-6 text-xl mt-20">
          <p className="mr-2">Total a pagar:</p>
          <p>
            R$ {unitPrice.toFixed(2)} - {frete}
          </p>
        </div>
      )}
    </div>
  );
}