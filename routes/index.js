const express = require("express");
const router = express.Router();

const myDB = require("../db/myDB.js");

/* AUTHENTICATE USER */
const auth = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect("/");
  }
  next();
};

/*            */
/* GET ROUTES */
/*            */

router.get("/", function (req, res) {
  res.status(200).json();
});

/* 

FUNCTION MADE BY: JENNIFER
PURPOSE -> LOG USER OUT
*/
router.get("/userLogout", async function (req, res) {
  try {
    req.session.destroy();
    res.send({ logout: "success" });
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({ err: e });
  }
});

/* 

FUNCTION MADE BY: MATTHEW
PURPOSE -> GRAB USER DATA IN SESSION
*/
router.get("/user/data", async function (req, res) {
  try {
    const username = req.session.username;
    res.send({ username: username });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

/* 

FUNCTION MADE BY: MATTHEW
PURPOSE -> GRAB USER DATA IN DB AND PASS TO REACT
*/
router.get("/user/data/info", async function (req, res) {
  try {
    let user = null;
    if (req.session.username) {
      user = await myDB.getUser(req.session.username);
      res.send({ data: user });
    } else {
      res.send({ data: null });
    }
  } catch (e) {
    console.log("Error", e);
  }
});

/* 

FUNCTION MADE BY: MATTHEW
PURPOSE -> GRAB ALL PRODUCTS DATA FROM DB
*/

router.get("/products", async function (req, res) {
  try {
    const products = await myDB.getProducts();
    res.send({ data: products });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

/* 

FUNCTION MADE BY: MATTHEW
PURPOSE -> GRAB QUERY FROM REACT AND ADJUST PRODUCTS
*/
router.get("/products/filter", async function (req, res) {
  try {
    let newFilter = req.query.filter;
    let products = null;
    if(newFilter === "") {
      products = await myDB.getProducts();
    } else {
      newFilter = newFilter.split(",")
      products = await myDB.getProductsQuery(newFilter);
    }
    console.log("SENDING DATA BACK");
    res.send({ data: products });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

/* 

FUNCTION MADE BY: MATTHEW
PURPOSE -> GRAB SINGLE PRODUCT BASED ON ID
*/
router.get("/product/data/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const myProduct = await myDB.getProduct(productId);
    if (myProduct.msg === "success") {
      res.send({ data: myProduct.product });
    }
  } catch (e) {
    res.status(400).send({ err: e });
  }
});

/* 

FUNCTION MADE BY: JENNIFER
PURPOSE -> GRAB CART FOR USER
*/
router.get("/user/cart", async function (req, res) {
  try {
    const userCart = await myDB.userCart(req.session.username);
    res.send({ userCart: userCart });
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({ err: e });
  }
});

/* 

FUNCTION MADE BY: JENNIFER
PURPOSE -> DELETE PRODUCT FROM CART
*/
router.get("/user/cart/deleteProduct/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProduct = await myDB.deleteProduct(id);
    res.send({ delete: "success" });
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({ err: e });
  }
});

router.get("/user/cart/:id/:val", async (req, res) => {
  const id = req.params.id;
  const val = req.params.val;
  try {
    const changeQuantity = await myDB.changeQuantity(id, val);
    res.send({ change: "success" });
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({ err: e });
  }
});

/*                */
/* END GET ROUTES */
/*                */

/**************************************************************/

/*             */
/* POST ROUTES */
/*             */

/* 

FUNCTION MADE BY: MATTHEW
PURPOSE -> LOG IN USER
*/
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const pwd = req.body.pwd;

    const msg = await myDB.userLogin(email, pwd);
    if (msg[0] === "success") {
      req.session.username = msg[1];
      res.sendStatus(200);
    } else {
      res.status(409).send({ login: msg[0] });
    }
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

/* 

FUNCTION MADE BY: JENNIFER
PURPOSE -> REGISTER A NEW USER
*/
router.post("/register", async (req, res) => {
  try {
    const msg = await myDB.registerUser(req.body);
    if (msg === "success") {
      res.sendStatus(200);
    } else {
      res.status(409).send({ msg: msg });
    }
  } catch (e) {
    res.status(400).send({ err: e });
  }
});

/* 

FUNCTION MADE BY: MATTHEW
PURPOSE -> ADD PRODUCT TO CART
*/
router.post("/product/cart", async (req, res) => {
  try {
    if (!req.session.username) {
      res.send({ msg: "THERE IS NO SESSION" });
    } else {
      const res = await myDB.addProductToCart(req.body, req.session.username);
      if (res.msg === "success") {
        res.send({ msg: "ADDED OR UPDATED ITEM TO CART" });
      } else {
        res.send({ msg: "THERE WAS A PROBLEM WITH FINDING THE PRODUCT" });
      }
    }
  } catch (e) {
    res.send({ msg: e });
  }
});

/*                */
/* END POST ROUTES */
/*                */

module.exports = router;