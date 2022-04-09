import { createStore, applyMiddleware } from "redux";
import { ICartState } from "./modules/cart/types";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddlewere from "redux-saga";

export interface IState {
  cart: ICartState;
}

const sagaMiddlewere = createSagaMiddlewere();

const middleweres = [sagaMiddlewere];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleweres))
);

sagaMiddlewere.run(rootSaga);

export default store;
