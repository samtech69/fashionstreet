import { combineReducers } from "@reduxjs/toolkit";
import { MaincategoryReducer } from "./MaincategoryReducers";
import { SubcategoryReducer } from "./SubcategoryReducers";
import { BrandReducer } from "./BrandReducers";
import { ProductReducer } from "./ProductReducers";
import { TestimonialReducer } from "./TestimonialReducers";
import { CartReducer } from "./CartReducers";
import { CheckoutReducer } from "./CheckoutReducers";
import { NewsletterReducer } from "./NewsletterReducers";
import { WishlistReducer } from "./WishlistReducers";
import { ContactReducer } from "./ContactReducers";


export default combineReducers({
    MaincategoryStateData: MaincategoryReducer,
    SubcategoryStateData: SubcategoryReducer,
    BrandStateData: BrandReducer,
    ProductStateData: ProductReducer,
    TestimonialStateData: TestimonialReducer,
    CartStateData: CartReducer,
    CheckoutStateData: CheckoutReducer,
    ContactStateData: ContactReducer,
    NewsletterStateData: NewsletterReducer,
    WishlistStateData: WishlistReducer,
})