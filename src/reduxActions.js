import { createAction } from "@reduxjs/toolkit";

export const addProduct =createAction('products/addProduct');
export const removeProduct =createAction('products/removeProduct');
export const changeCurrency=createAction('currency/changeCurrency');

