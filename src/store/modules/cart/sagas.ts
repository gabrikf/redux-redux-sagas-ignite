import { AxiosResponse } from "axios";
import { all, call, select, takeLatest, put } from "redux-saga/effects";
import { IState } from "../..";
import { api } from "../../../services/api";
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from "./actions";
import { ActionTypes } from "./types";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IResponseStock {
  id: number;
  quantity: number;
}
function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  const cartProductsQuantity: number = yield select(
    (state: IState) =>
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
  );
  const avaliableStock: AxiosResponse<IResponseStock> = yield call(
    api.get,
    `stock/${product.id}`
  );
  if (avaliableStock.data.quantity > cartProductsQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
  console.log(cartProductsQuantity);
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
