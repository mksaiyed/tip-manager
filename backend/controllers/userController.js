const User = require("../models/user");
const jwt = require("jsonwebtoken");
const upload = require("./upload");

async function register(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Error uploading file" });
        }

        const { name, email, password } = req.body;
        const proPic = req.file ? req.file.filename : null;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "invalid field" });
        }

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            user = new User({
                name,
                email,
                password,
                proPic,
            });

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    proPic: user.proPic,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" },
                (err, token) => {
                    if (err) throw err;
                    res.status(201).json({ name: user.name, token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    });
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                proPic: user.proPic,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ name: user.name, token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
    register,
    login,
};
