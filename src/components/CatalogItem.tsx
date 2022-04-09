import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store";
import { addProductToCartRequest } from "../store/modules/cart/actions";
import { IProduct } from "../store/modules/cart/types";

interface ICatalogItemProps {
  product: IProduct;
}

export function CatalogItem({ product }: ICatalogItemProps) {
  const productWithoutStock = useSelector<IState, boolean>((state) =>
    state.cart.faildStockCheck.includes(product.id)
  );
  const dispatch = useDispatch();
  const handleAddPoduct = useCallback(() => {
    return dispatch(addProductToCartRequest(product));
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
      </button>{" "}
      {productWithoutStock && (
        <span style={{ color: "red" }}>Produto em falta</span>
      )}
    </article>
  );
}
