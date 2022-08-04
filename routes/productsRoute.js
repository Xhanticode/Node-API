const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const middleware = require("../middleware/auth");
//   const AuthController = require("../Controllers/Admin/index")

// router.get("/all-products", middleware, (req, res) => {
//   // return AdminController.AddProduct(req, res);
// });

router.get("/", (req, res) => {
  try {
    let sql = "SELECT * FROM products";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});



router.post("/", middleware, (req, res) => {
  try {
     let sql = "INSERT INTO products SET ?";
     const {
       name,
       category,
       price,
       product_type,
     } = req.body;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Single product
router.get("/products/:id", (req, res) => {
  try {
    let sql = "SELECT * FROM products WHERE ?";
    let product = {
      product_id: req.params.id,
    };
    con.query(sql, product, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete product
router.delete("/products/:id", (req, res) => {
  try {
    let sql = "DELETE FROM products WHERE ?";
    let product = {
      product_id: req.params.id,
    };
    con.query(sql, product, (err, result) => {
      if (err) throw err;
      res.send("product successfully removed");
    });
  } catch (error) {
    console.log(error);
  }
});

// Update product
router.put("/update-product/:id", (req, res) => {
  try {
    let sql = "SELECT * FROM products WHERE ?";
    let product = {
      product_id: req.params.id,
    };
    con.query(sql, product, (err, result) => {
      if (err) throw err;
      if (result.length !== 0) {
        let updateSql = `UPDATE products SET ? WHERE product_id = ${req.params.id}`;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        let updateproduct = {
          full_name: req.body.full_name,
          email: req.body.email,
          password: hash,
          billing_address: req.body.billing_address,
          default_shipping_address: req.body.default_shipping_address,
          country: req.body.country,
          phone: req.body.phone,
          product_type: req.body.product_type,
        };
        con.query(updateSql, updateproduct, (err, updated) => {
          if (err) throw err;
          console.log(updated);
          res.send("Successfully Updated");
        });
      } else {
        res.send("product not found");
      }
    });
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
