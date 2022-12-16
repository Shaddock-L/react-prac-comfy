import { act } from "react-dom/test-utils";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";
import CartItem from "../components/CartItem";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    console.log(id + color);
    const tempItem = state.cart.find((item) => item.id === id + color);

    if (tempItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          // console.log("hee");

          let newAmount = item.amount + amount;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const id = action.payload;
    // console.log(action.payload)
    let newCart = [...state.cart];
    newCart = newCart.filter((item) => item.id !== id);
    return { ...state, cart: newCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        let newAmount = 1;
        if (value === "inc") {
          newAmount = item.amount + 1;
          newAmount = newAmount > item.max ? item.max : newAmount;
        }
        if (value === "dec") {
          newAmount = item.amount - 1;
          newAmount = newAmount < 1 ? 1 : newAmount;
        }
        return { ...item, amount: newAmount };
      }
      return item;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item;
        total.total_items += amount;
        total.total_amount += amount * price;
        return total
      },
      { total_items: 0, total_amount: 0 }
    );
    console.log(state.total_items)
    return { ...state, total_items, total_amount };
    // console.log(state.cart)
    // return {...state}
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
