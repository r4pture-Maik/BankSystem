let express = require("express");
var router = express.Router();
import { Request, Response } from "express";
import { Bank, Transaction } from "../Bank";
const { BankSystem } = require("../BankSystem");
const { param, body } = require("express-validator");
var validationHandler = require("../validation");
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get("/", (_: Request, res: Response) => {
  const bankHandler = new BankSystem();
  res.status(200).json(bankHandler.getBanks());
});


router.get(
  "/:userID",
  param("userID").isString(),
  validationHandler,
  ({ params: { userID } }: Request, res: Response) => {
    const bankHandler = new BankSystem();
    const transactionList = bankHandler
      .getBanks()
      .find((item: Bank) => item.getAccount(userID))
      ?.getTransaction()
      .filter((item: Transaction) => item.fromAccount === userID);
    if (transactionList) {
      res.status(200).json( transactionList );
    } else { res.status(404).json({ Error: "User not found" });
    }
  }
);


router.post(
  "/sendMoney",
  body("fromID").isString(),
  body("toID").isString(),
  body("money").isNumeric(),
  validationHandler,
  ({ body: { fromID, toID, money } }: Request, res: Response) => {
    const bankHandler = new BankSystem();
    if (bankHandler.moneyHandler(fromID, toID, money) === false) {
      res.status(404).json({ Error: "Could not find user" });
    } else res.status(200).json({ Success: "Money sent" });
  }
);


router.post(
  "/addBank",
  body("name").isString(),
  body("address").isString(),
  validationHandler,
  ({ body: { name, address } }: Request, res: Response) => {
    const bankHandler = new BankSystem();
    bankHandler.addBank(name, address);
    res.status(200).json({ Success: "Bank added" });
  }
);


router.post(
  "/addUser",
  body("bankID").isString(),
  body("name").isString(),
  body("surname").isString(),
  validationHandler,
  ({ body: { bankID, name, surname } }: Request, res: Response) => {
    const bankHandler = new BankSystem();
    if (bankHandler.addAccount(bankID, name, surname)) {
      res.status(200).json({ Success: "User added" });
    } else res.status(404).json({ Error: "Bank not found" });
  }
);

module.exports = router;
