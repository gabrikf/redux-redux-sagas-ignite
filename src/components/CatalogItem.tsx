import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../store/modules/cart/actions";
import { IProduct } from "../store/modules/cart/types";

interface ICatalogItemProps {
  product: IProduct;
}

export function CatalogItem({ product }: ICatalogItemProps) {
  const dispatch = useDispatch();
  const handleAddPoduct = useCallback(() => {
    return dispatch(addProductToCart(product));
  }, [dispatch]);
  return (
    <article>
      {" - "}
      <strong>{product.title}</strong>
      {"  "}
      <span>{product.price}</span>
      {"  "}
      <button onClick={handleAddPoduct} type="button">
        Comprar
      </button>
    </article>
  );
}
