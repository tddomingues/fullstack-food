import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

//router
import { useNavigate, useParams } from "react-router-dom";

//styles
import { Button } from "../../../components/ui/button";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Loader2 } from "lucide-react";

//hooks
import { useUserInfo } from "../../../hooks/useUserInfo";

//interfaces
import { ProductProps } from "../../../interfaces/ProductProps";

//redux
import { AppDispatch, IRootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getProduct, reset } from "../../../slice/productSlice";

//components
import Loading from "../../../components/Loading";

const EditProduct = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);

  const { id } = useParams();

  const [viewImage, setViewImage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { token } = useUserInfo();

  const navigate = useNavigate();

  const success = useSelector<IRootState, string | null>(
    (state) => state.product.success,
  );

  const error = useSelector<IRootState, string[] | null>(
    (state) => state.product.error,
  );

  const loading = useSelector<IRootState, boolean>(
    (state) => state.product.loading,
  );

  const product = useSelector<IRootState, ProductProps | undefined>(
    (state) => state.product.product,
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", nameRef.current?.value || "");
    formData.append("description", descriptionRef.current?.value || "");
    formData.append("price", priceRef.current?.value?.toString() || "");
    formData.append("category", categoryRef.current?.value || "");

    const file = imageRef.current?.files ? imageRef.current.files[0] : null;

    if (file) formData.append("file", file);

    const data = {
      formData,
      token: token || "",
      id: id || "",
    };

    dispatch(editProduct(data));
  };

  const handleViewImage = (e: ChangeEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    if (!target.files) return;

    const file = target.files[0];

    setViewImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    dispatch(reset());
    dispatch(getProduct({ id: id || "", token: token || "" }));
  }, [dispatch, id, token]);

  if (loading) return <Loading />;

  return (
    <section className="flex">
      <div className="p-4 rounded-md bg-neutral-200 w-full">
        <h1 className="text-xl font-semibold mb-8">Editar Produto</h1>
        <form
          className="flex justify-center flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center gap-4 ">
            <div>
              <label className="w-full ">
                <input
                  type="file"
                  name=""
                  id=""
                  className="hidden"
                  ref={imageRef}
                  onChange={handleViewImage}
                />
                <div className="w-[400px] h-[400px] border border-dashed border-neutral-300 bg-neutral-50 cursor-pointer flex justify-center items-center relative">
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
                    className="absolute z-10"
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
                    name=""
                    id=""
                    className="p-2 rounded-md text-sm text-neutral-800 w-full"
                    ref={nameRef}
                    placeholder={product?.name}
                  />
                </label>
                <label>
                  <span className="block mb-1">Preço</span>
                  <input
                    type="number"
                    name=""
                    id=""
                    min={0}
                    className=" p-2 rounded-md text-sm text-neutral-800"
                    ref={priceRef}
                    placeholder={product?.price.toString()}
                  />
                </label>
                <label>
                  <span className="block mb-1">Categoria</span>
                  <select
                    name=""
                    id=""
                    className=" p-2 rounded-md text-sm text-neutral-800"
                    ref={categoryRef}
                  >
                    <option value="burguer">Hamburguer</option>
                    <option value="pizza">Pizza</option>
                    <option value="drink">Bebida</option>
                  </select>
                </label>
              </div>

              <label>
                <span className="block mt-4 mb-1">Descrição</span>
                <textarea
                  name=""
                  id=""
                  className="w-full p-2 rounded-md text-sm text-neutral-800"
                  ref={descriptionRef}
                  placeholder={product?.description}
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
