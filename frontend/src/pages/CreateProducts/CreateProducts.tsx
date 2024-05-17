import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { createProduct } from "../../slice/productSlice";
import { AppDispatch } from "../../store";

const CreateProducts = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);

  const [viewImage, setViewImage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", nameRef.current?.value || "");
    formData.append("description", descriptionRef.current?.value || "");
    formData.append("price", priceRef.current?.value?.toString() || "");
    formData.append("category", categoryRef.current?.value || "");

    const file = imageRef.current?.files ? imageRef.current.files[0] : null;

    if (file) formData.append("file", file);

    console.log(formData);

    dispatch(createProduct(formData));
  };

  const handleViewImage = (e: ChangeEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    if (!target.files) return;

    const file = target.files[0];

    setViewImage(URL.createObjectURL(file));
  };

  return (
    <>
      <Navbar />
      <main className="py-5 px-32 ">
        <section className="flex">
          <div className="p-4 rounded-md bg-neutral-200 w-full">
            <h1 className="text-xl font-semibold mb-8">Criar Produto</h1>
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
                        src={viewImage || ""}
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
                    ></textarea>
                  </label>
                </div>
              </div>
              <div className="w-full flex justify-between ">
                <Button variant="secondary">Voltar</Button>
                <Button type="submit">Criar</Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateProducts;
