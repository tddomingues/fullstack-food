//router
import { useNavigate } from "react-router-dom";

//utils
import formatCurrency from "../utils/formatCurrency";

//hooks

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
import { addItemToCart } from "../slice/cartSlice";
import { deleteProduct } from "../slice/productSlice";

//interfaces
import { ProductProps } from "../interfaces/ProductProps";
import { UserProps } from "../interfaces/UserProps";
import { IInitialState } from "../slice/userSlice";

//componets
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

//hooks
import { useToast } from "./ui/use-toast";

//utils
import { firstCapitalLetter } from "../utils/firstCapitalLetter";

//qualquer passagem por props deve ser um objeto
interface ProductsCardProps {
  products: ProductProps[];
}

//type User = Omit<UserProps, "_id" | "password">;

const ProductCard = ({ products }: ProductsCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { toast } = useToast();

  const { token, user } = useSelector<IRootState, IInitialState>(
    (state) => state.user,
  );

  const handleDeleteProduct = async (_id: string) => {
    token && dispatch(deleteProduct({ _id, token }));
  };

  const handleAddItemToCart = (product: ProductProps) => {
    dispatch(addItemToCart(product));

    toast({
      title: "Que Delícia!!! 🤤",
      description: `${firstCapitalLetter(product.category)} adicionado ao carrinho.`,
    });
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-x-4 gap-y-6 ">
      {products &&
        products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col bg-neutral-800 rounded-md max-w-[300px]"
          >
            <div className="transition ease-in-out delay-100 relative">
              <img
                src={`http://localhost:3000/uploads/${product.imageUrl}`}
                alt={product.description}
                className="rounded-md "
              />
            </div>
            <div className="flex-1 p-4">
              <h3 className="font-normal text-neutral-300">{product.name}</h3>
              <div className="mt-1">
                <span className="font-medium">
                  {formatCurrency(Number(product.price))}
                </span>
              </div>
            </div>
            {user?.role === "admin" && (
              <div className="flex justify-between gap-4 px-4 pb-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-600/90"
                  onClick={() =>
                    navigate(`/admin-painel/edit-product/${product._id}`)
                  }
                >
                  Editar
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="flex-1" variant="destructive">
                      Excluir
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-neutral-900">
                        Deseja excluir o produto?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-neutral-900">
                        O Produto será excluido permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-neutral-900">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}

            {user?.role !== "admin" && (
              <Button
                variant="destructive"
                className="mx-4 mb-4"
                onClick={() => handleAddItemToCart(product)}
              >
                Adicionar
              </Button>
            )}
          </div>
        ))}
    </div>
  );
};

export default ProductCard;
