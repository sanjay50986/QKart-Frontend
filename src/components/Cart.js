import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Button, IconButton, Stack } from "@mui/material";
import { fontWeight } from "@mui/system";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  if(!cartData) return

  const cartItem = cartData.map((item) => {
      const product = productsData.find((p) => p._id === item.productId)

      return {
        ...product,
        qty: item.qty
      }
  })

  return cartItem
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  return items.reduce((acc, item) => {
    return acc + item.cost * item.qty
  }, 0)
};


// TODO: CRIO_TASK_MODULE_CHECKOUT - Implement function to return total cart quantity
/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => {
  return items.reduce((acc, item) => {
    return acc + item.qty
  }, 0)
};


// TODO: CRIO_TASK_MODULE_CHECKOUT - Add static quantity view for Checkout page cart
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

const ItemQuantityCheckOut = ({
  value,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <Box padding="0.5rem" data-testid="item-qty">
        Qty: {value}
      </Box>
    </Stack>
  );
};


/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const Cart = ({
  products,
  items = [],
  handleQuantity,
  qtyIs
}) => {

  let navigate = useHistory()

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        <Box p={2}>
          {items.map((cart, index) => (
            <Box key={index} className="cart-row">
              <img src={cart.image} alt={cart.name} height={100} />
              <Box sx={{width: "100%"}}>
                <p>{cart.name}</p>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                  {qtyIs ? (
                    <ItemQuantityCheckOut  
                      value = {cart.qty}/>
                  ) : (
                    <ItemQuantity 
                    value = {cart.qty}
                    handleAdd = {() => handleQuantity(cart._id, cart.qty + 1)}
                    handleDelete = {() => handleQuantity(cart._id, cart.qty - 1)}
                   />
                  )}
                  <h4>${cart.cost}</h4>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          {qtyIs ? (
            <></>
          ) : (
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() => navigate.push("/checkout")}
            >
              Checkout
            </Button>
          )}
        </Box>
      </Box>

     {qtyIs && ( <Box className="cart">
        <Box p={2}>
          <Typography variant="h5" sx={{fontWeight: "600"}}>Order Details</Typography>
          <Box>
            <Box pt={1} sx={{display: "flex", justifyContent: "space-between", "alignItems": "center"}}>
              <Typography color="#3C3C3C" variant="subtitle1">Products</Typography>
              <Typography color="#3C3C3C" variant="subtitle1">{getTotalItems(items)}</Typography>
            </Box>

            <Box pt={1} sx={{display: "flex", justifyContent: "space-between", "alignItems": "center"}}>
              <Typography color="#3C3C3C" variant="subtitle1">Subtotal</Typography>
              <Typography color="#3C3C3C" variant="subtitle1">${getTotalCartValue(items)}</Typography>
            </Box>

            <Box pt={1} sx={{display: "flex", justifyContent: "space-between", "alignItems": "center"}}>
              <Typography color="#3C3C3C" variant="subtitle1">Shipping Charges</Typography>
              <Typography color="#3C3C3C" variant="subtitle1">$0</Typography>
            </Box>

            <Box pt={1} sx={{display: "flex", justifyContent: "space-between", "alignItems": "center"}}>
              <Typography variant="h6" sx={{fontWeight: "600"}}>Total</Typography>
              <Typography variant="h6" sx={{fontWeight: "600"}}>${getTotalCartValue(items)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>)}
    </>
  );
};

export default Cart;
