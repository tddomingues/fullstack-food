import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

//router
import { useNavigate, useParams } from "react-router-dom";

//styles
import { Button } from "../../../components/ui/button";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Loader2 } from "lucide-react";

//interfaces
import { ProductProps } from "../../../interfaces/ProductProps";

//redux
import { AppDispatch, IRootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  IinitialState,
  editProduct,
  getProduct,
  reset as resetMessages,
} from "../../../slice/productSlice";

//components
import Loading from "../../../components/Loading";

interface CreateProductProps extends ProductProps {
  file: FileList;
}

const EditProduct = () => {
  const { id } = useParams();

  const [viewImage, setViewImage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector<IRootState, string | undefined>(
    (state) => state.user.token,
  );

  const navigate = useNavigate();

  const { error, product, success, loading } = useSelector<
    IRootState,
    IinitialState
  >((state) => state.product);

  const { register, handleSubmit, watch, reset } =
    useForm<CreateProductProps>();

  const watchFile = watch("file");

  const onSubmit: SubmitHandler<CreateProductProps> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    const file = data.file.length > 0 ? data.file[0] : undefined;

    if (file) formData.append("file", file);

    if (id && token) {
      const dataToSend = {
        formData,
        token: token,
        id: id,
      };

      dispatch(editProduct(dataToSend));
    }
  };

  useEffect(() => {
    if (watchFile?.length > 0) {
      setViewImage(URL.createObjectURL(watchFile[0]));
    }
  }, [watchFile]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    dispatch(resetMessages());
    id && token && dispatch(getProduct({ id: id, token: token }));
  }, [dispatch, id, token]);

  if (loading) return <Loading />;

  return (
    <section className="flex">
      <div className="p-4 rounded-md bg-neutral-800 w-full">
        <h1 className="mb-4 text-2xl font-medium">Editar Produto</h1>
        <form
          className="flex justify-center flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center gap-4 ">
            <div>
              <label className="w-full ">
                <input type="file" {...register("file")} className="hidden" />
                <div className="w-[400px] h-[400px] rounded-md bg-neutral-50 cursor-pointer flex justify-center items-center relative">
                  <MdOutlineAddPhotoAlternate
                    size={40}
                    className="text-neutral-300"
                  />
                  <img
                    src={
                      viewImage
                        ? viewImage
                        : `http://localhost:3000/uploads/${product?.imageUrl}`
                    }
                    alt=""
                    className="absolute z-10 h-full rounded-md"
                  />
                </div>
              </label>
            </div>
            <div className="w-full">
              <div className="flex gap-2">
                <label className="flex-1">
                  <span className="block mb-1">Nome</span>
                  <input
                    type="text"
                    {...register("name")}
                    className="p-2 rounded-md text-sm text-neutral-800 w-full"
                    defaultValue={product?.name}
                  />
                </label>
                <label>
                  <span className="block mb-1">Preço</span>
                  <input
                    type="number"
                    {...register("price")}
                    defaultValue={product?.price}
                    min={0}
                    className=" p-2 rounded-md text-sm text-neutral-800"
                  />
                </label>
                <label>
                  <span className="block mb-1">Categoria</span>
                  <select
                    {...register("category")}
                    defaultValue={product?.category}
                    className=" p-2 rounded-md text-sm text-neutral-800"
                  >
                    <option value="">--Nenhum--</option>
                    <option value="burguer">Hamburguer</option>
                    <option value="pizza">Pizza</option>
                    <option value="drink">Bebida</option>
                  </select>
                </label>
              </div>

              <label>
                <span className="block mt-4 mb-1">Descrição</span>
                <textarea
                  {...register("description")}
                  defaultValue={product?.description}
                  className="w-full p-2 rounded-md text-sm text-neutral-800"
                ></textarea>
              </label>
            </div>
          </div>
          {success && (
            <div className="pt-2 px-2 bg-green-600 rounded-md">
              <p className="text-sm font-light text-center text-neutral-50 mb-2">
                {success}
              </p>
            </div>
          )}
          {error && (
            <div className="pt-2 px-2 bg-destructive rounded-md">
              {error.map((err) => (
                <p className="text-sm font-light text-center text-neutral-50 mb-2">
                  {err}
                </p>
              ))}
            </div>
          )}
          <div className="w-full flex justify-between ">
            <Button variant="secondary" onClick={() => navigate("/")}>
              Voltar
            </Button>
            <Button type="submit" variant="destructive" disabled={loading}>
              Editar
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
