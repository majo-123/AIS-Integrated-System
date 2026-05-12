import pool from "./db.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (id) => {
  if (isNaN(Number(id))) {
    throw new Error("Invalid id");
  }

  const [user] = await pool.query("SELECT * FROM tbluser WHERE id = ?", [id]);
  return user;
};

export const createUser = async (userProfile, email, password) => {
  if (!email || email.trim() === "") {
    throw new Error("Invalid email");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  const [existingUser] = await pool.query(
    "SELECT * FROM tbluser WHERE email = ?",
    [email],
  );

  if (existingUser.length > 0) {
    throw new Error("An account is already created with that email");
  }

  if (!password || password.trim() === "") {
    throw new Error("Invalid password");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is too weak.");
  }

  const salt = bcrypt.genSaltSync(10);
  const newPassword = bcrypt.hashSync(password, salt);

  // 1. save email/password to MySQL
  const [newUser] = await pool.query(
    "INSERT INTO tbluser (email, password) VALUES (?, ?)",
    [email, newPassword],
  );

  // 2. send profile to adapter layer, not directly to AIS
  const response = await fetch("http://localhost:4000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to register student in adapter layer",
    );
  }

  return {
    localUserId: newUser.insertId,
    adapterResult: result,
  };
};

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const [user] = await pool.query("SELECT * FROM tbluser WHERE email = ?", [
    email,
  ]);

  if (user.length === 0) {
    throw new Error(`An account with email: ${email} does not exist.`);
  }

  if (!bcrypt.compareSync(password, user[0].password)) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign({ id: user[0].id }, process.env.SECRET, {
    expiresIn: "1d",
  });

  return token;
};
