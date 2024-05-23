//styles
import BurgerImage from "../../assets/burguer.png";
import { FaStar } from "react-icons/fa";

//utils
import formatCurrency from "../../utils/formatCurrency";
import { firstCapitalLetter } from "../../utils/firstCapitalLetter";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../store";
import { addItemToCart } from "../../slice/cartSlice";
import { deleteProduct, getProductsByCategory } from "../../slice/productSlice";

//interfaces
import { ProductProps } from "../../interfaces/ProductProps";

//componets
import { Button } from "../ui/button";
import { UserProps } from "../../interfaces/UserProps";
import { useEffect, useState } from "react";
import { getUser } from "../../slice/userSlice";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";

//qualquer passagem por props deve ser um objeto
interface ProductsCardProps {
  products: ProductProps[];
}

const ProductCard = ({ products }: ProductsCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useUserInfo();

  const navigate = useNavigate();

  const handleDeleteProduct = async (_id: string) => {
    dispatch(deleteProduct(_id));

    location.reload();
  };

  const handleAddItemToCart = (product: ProductProps) => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 ">
      {products &&
        products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col gap-2 max-w-[300px] relative "
          >
            <div className="border border-neutral-400 rounded-md ">
              <img
                src={`http://localhost:3000/uploads/${product.imageUrl}`}
                alt=""
                className="transition ease-in-out delay-100 hover:scale-105"
              />
            </div>
            <h3 className="font-semibold">{product.name}</h3>
            <div className="self-start">
              <strong className="font-semibold">
                {formatCurrency(Number(product.price))}
              </strong>
            </div>
            {user && user.role === "admin" && (
              <div className="flex justify-between gap-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-600/90"
                  onClick={() =>
                    navigate(`admin-painel/edit-product/${product._id}`)
                  }
                >
                  Editar
                </Button>
                <Button
                  className="flex-1"
                  variant="destructive"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Excluir
                </Button>
              </div>
            )}
            {user && user.role === "client" && (
              <Button
                className="w-full"
                variant="destructive"
                onClick={() => handleAddItemToCart(product)}
              >
                Adicionar
              </Button>
            )}

            <div className="absolute top-2 right-2 flex items-center gap-1 p-1">
              <FaStar className="text-yellow-500" />
              <span className="text-xs">7/10</span>
            </div>
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-yellow-500 p-1 rounded-md">
              <span className="text-xs font-semibold ">
                {firstCapitalLetter(product.category)}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductCard;
