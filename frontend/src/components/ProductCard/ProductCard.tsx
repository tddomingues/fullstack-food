import { useState } from "react";

//styles
import BurgerImage from "../../assets/burguer.png";
import { FaStar } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

//utils
import formatCurrency from "../../utils/formatCurrency";
import { firstCapitalLetter } from "../../utils/firstCapitalLetter";

//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addItemToCart, addQuantity } from "../../slice/cartSlice";

//interfaces
import { ProductProps } from "../../interfaces/ProductProps";

//componets
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

interface ProductCardProps {
  products: ProductProps[];
}

const ProductCard = ({ products }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  const handleQuantity = (operation: string) => {
    if (operation === "sum") {
      setQuantity(quantity + 1);
    } else if (operation === "subtraction") {
      setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));
    }
  };

  const handleAddItemToCart = (product: ProductProps) => {
    dispatch(addItemToCart(product));

    dispatch(addQuantity({ product, quantity }));

    setQuantity(1);
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 ">
      {products &&
        products.slice(0, 5).map((product, i) => (
          <div key={i} className="flex flex-col gap-2 max-w-[300px] relative ">
            <div className="border border-neutral-400 rounded-md ">
              <img
                src={BurgerImage}
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
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="w-full" variant="destructive">
                  Adicionar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{product.name}</AlertDialogTitle>
                  <div className="flex gap-3 border-t py-3">
                    <div className="w-[200px] border border-neutral-200 rounded-md ">
                      <img src={BurgerImage} alt="" />
                    </div>
                    <div className="flex flex-col gap-2 justify-between w-full">
                      <div>
                        <p className="mb-2">{product.description}</p>
                        <strong className="font-semibold">
                          {formatCurrency(Number(product.price))}
                        </strong>
                      </div>

                      <div className="border border-neutral-200 rounded-md flex items-center justify-between gap-6 p-1 min-w-[80px] self-start">
                        <span>{quantity}</span>
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className="cursor-pointer bg-neutral-200"
                            onClick={() => handleQuantity("sum")}
                          >
                            <IoMdArrowDropup />
                          </span>
                          <span
                            className="cursor-pointer bg-neutral-200"
                            onClick={() => handleQuantity("subtraction")}
                          >
                            <IoMdArrowDropdown />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleAddItemToCart(product)}
                  >
                    <span>Adicionar</span>
                    <span className="ml-4">
                      {formatCurrency(Number(product.price * quantity))}
                    </span>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
