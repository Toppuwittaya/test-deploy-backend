require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("User Service Running");
});

app.post("/users", async (req, res) => {
    const { name, email } = req.body;

    try {
        const result = await pool.query("INSERT INTO users(name,email) VALUES($1,$2) RETURNING *", [name, email]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "DB Error" });
    }
});

app.get("/users", async (req, res) => {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
});

app.listen(process.env.PORT, () => {
    console.log(`User service running on port ${process.env.PORT}`);
});
