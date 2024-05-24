//router
import { useNavigate } from "react-router-dom";

//utils
import formatCurrency from "../utils/formatCurrency";

//hooks
import { useUserInfo } from "../hooks/useUserInfo";

//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addItemToCart } from "../slice/cartSlice";
import { deleteProduct } from "../slice/productSlice";

//interfaces
import { ProductProps } from "../interfaces/ProductProps";

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
import { useToast } from "./ui/use-toast";

//qualquer passagem por props deve ser um objeto
interface ProductsCardProps {
  products: ProductProps[];
}

const ProductCard = ({ products }: ProductsCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useUserInfo();

  const { toast } = useToast();

  const navigate = useNavigate();

  const handleDeleteProduct = async (_id: string) => {
    dispatch(deleteProduct(_id));

    location.reload();
  };

  const handleAddItemToCart = (product: ProductProps) => {
    dispatch(addItemToCart(product));

    toast({
      title: "Que Delícia!!! 🤤",
      description: "Produto adicionado ao carrinho.",
    });
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-x-4 gap-y-6 ">
      {products &&
        products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col max-w-[300px] relative"
          >
            <div className="border border-neutral-400 rounded-md p-4 transition ease-in-out delay-100  hover:bg-neutral-100">
              <img
                src={`http://localhost:3000/uploads/${product.imageUrl}`}
                alt={product.description}
                className=" object-contain h-[200px] w-[200px] m-auto"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mt-1">{product.name}</h3>
              <div className="my-1">
                <span className="font-semibold">
                  {formatCurrency(Number(product.price))}
                </span>
              </div>
            </div>
            {user && user.role === "admin" && (
              <div className="flex justify-between gap-4">
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
                      <AlertDialogTitle>
                        Deseja excluir o produto?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        O Produto será excluido permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
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
                className="w-full"
                variant="destructive"
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
