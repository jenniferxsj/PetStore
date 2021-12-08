const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

const url =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@calendar.ancvz.mongodb.net/commercialSite?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useUnifiedTopology: true });
const db = client.db("commercialSite"); 
/* If you want to test from our user collecion, change above to "calendar" db */
const users = db.collection("users");
const products = db.collection("products");
const carts = db.collection("carts");

/* 

FUNCTION BUILT BY: MATTHEW

*/

async function getUser(username) {
  await client.connect();
  try {
    const user = await users.findOne({ userName : username });
    return user;
  } catch(e) {
    console.log(e)
  } finally {
    client.close();
  }
}

/* 

FUNCTION BUILT BY: MATTHEW

*/

async function userLogin(email, pwd) {
  await client.connect();
  const user = await users.findOne({ email: email });
  if (!user) {
    return ["User not exists, please register first"];
  }
  try {
    if (await bcrypt.compare(pwd, user.pwd)) {
      return ["success", user.userName];
    } else {
      return ["Wrong password or email address, please try again"];
    }
  } catch (e) {
    console.log({ Error: e });
  } finally {
    client.close();
  }
}

/* 

FUNCTION BUILT BY: JENNIFER

*/
async function registerUser(userInfo) {
  await client.connect();
  const userEmail = await users.findOne({ email: userInfo.email });
  if (userEmail) {
    return "The email exists, please use another email address";
  }
  const username = await users.findOne({userName: userInfo.userName});
  if (username) {
    return "The user name exists, please use another user name";
  }
  try {
    const hashedPassword = await bcrypt.hash(userInfo.pwd, 10);
    const newData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      userName: userInfo.userName,
      email: userInfo.email,
      pwd: hashedPassword,
    };
    await users.insertOne(newData);
    return "success";
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* 

FUNCTION BUILT BY: MATTHEW

*/

async function getProducts() {
  await client.connect();
  const res = await products.find().toArray();
  try {
    return res;
  } catch(e) {
    console.log(e)
  } finally {
    client.close();
  }
}

/* 

FUNCTION BUILT BY: MATTHEW

*/

async function getProductsQuery(filter) {
  await client.connect();
  const res = await products.find({category: {$in : filter}}).toArray();
  try {
    return res;
  } catch(e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* 

FUNCTION BUILT BY: MATTHEW

*/

async function getProduct(id) {
  await client.connect();
  try {
    const product = await products.findOne({"_id": new ObjectId(id)});
    return {product: product, msg: "success"};
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* 

FUNCTION BUILT BY: MATTHEW

*/

async function addProductToCart(productInfo, user) {
  await client.connect();
  try {
    const product = await products.findOne({"_id": new ObjectId(productInfo.id)});
    if(product === null) {
      return {msg: "Fail"};
    }
    else {
      let checkCart = await carts.findOne({"product": product._id, "userName": user});
      if(checkCart === null) {
        const newUser = await users.findOne({"userName": user});
        const newData = {
          product: product._id,
          userName: newUser.userName,
          price: product.price,
          name: product.name,
          number: 1,
          image: product.src
        };
        await carts.insertOne(newData);
      } else {
        let newVal = checkCart.number + 1;
        await carts.updateOne({"_id": checkCart._id}, {$set: {"number": newVal}});
      }
      return {msg : "success"};
    }
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* 

FUNCTION BUILT BY: JENNIFER

*/

async function userCart(username) {
  if (!username) {return [];}
  await client.connect();
  try {
    const userCart = await carts.find({userName: username}).toArray();
    return userCart;
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* 

FUNCTION BUILT BY: JENNIFER

*/

/* DELETE PRODUCT FROM THE CART */
async function deleteProduct(id) {
  await client.connect();
  try {
    const product = await carts.remove({_id: ObjectId(id)}, true); //set the justOne parameter to true
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

async function changeQuantity(id, val) {
  await client.connect();
  try {
    let value = parseInt(val);
    await carts.updateOne({_id: ObjectId(id)}, {$inc:{number:value}});
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

module.exports = {
  getUser,
  userLogin,
  registerUser,
  getProducts,
  getProduct,
  getProductsQuery,
  userCart,
  deleteProduct,
  addProductToCart,
  changeQuantity
};