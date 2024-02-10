import { all } from "redux-saga/effects";
import MaincategorySagas from "./MaincategorySagas";
import SubcategorySagas from "./SubcategorySagas";
import BrandSagas from "./BrandSagas";
import ProductSagas from "./ProductSagas";
import TestimonialSagas from "./TestimonialSagas";
import CartSagas from "./CartSagas";
import WishlistSagas from "./WishlistSagas";
import CheckoutSagas from "./CheckoutSagas";
import ContactSagas from "./ContactSagas";
import NewsletterSagas from "./NewsletterSagas";


export default function* RootSagas(){
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        ProductSagas(),
        TestimonialSagas(),
        CartSagas(),
        CheckoutSagas(),
        WishlistSagas(),
        ContactSagas(),
        NewsletterSagas(),
    ])
}