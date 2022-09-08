import React from "react";

export default function Cart(props:any) {
  const { itemsIncartData, addItem, removeItem } = props;
  const itemsInCart = itemsIncartData ? itemsIncartData : [];
  const unitPrice = itemsInCart.reduce((a:any, c:any) => a + c.qty * c.price, 0);
  const Freight = unitPrice > 10 ? "Frete grátis" : "Frete pago";
  return (
    <div className="flex flex-col justify-between bg-cyan-100 w-full xl:w-[30%] p-4">
      <p className="text-center font-black border-b-2 border-white pb-2">
        Carrinho
      </p>
      {itemsInCart.length === 0 && <div>Carrinho vazio</div>}

      {itemsInCart.map((item:any) => (
        <div key={item.id}>
          <div className="flex flex-col md:flex-row border-t border-gray-50 m-4 bg-wh bg-white rounded-md overflow-hidden">
            <div className="md:w-4/12 2xl:w-1/4 h-40 p-8 md:h-auto w-full">
              <img
                src={item.imageUrl}
                alt="item"
                className="h-full w-full object-center object-cover md:block"
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
                    className="text-xs leading-3 text-gray-800 cursor-pointer"
                    onClick={() => addItem(item)}
                  >
                    Adicionar
                  </p>
                  <p className="mx-8">{item.qty}</p>
                  <p
                    className="text-xs leading-3 text-red-500 cursor-pointer"
                    onClick={() => removeItem(item)}
                  >
                    Remover
                  </p>
                </div>
                <p className="text-base font-black leading-none text-gray-800 mt-4 md:mt-0">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {itemsInCart.length !== 0 && (
        <div className="flex flex-col md:flex-row bg-white p-6 text-xl mt-20">
          <p className="mr-2">Total a pagar:</p>
          <p>
            R$ {unitPrice.toFixed(2)} - {Freight}
          </p>
        </div>
      )}
    </div>
  );
}
