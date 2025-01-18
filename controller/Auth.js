const User = require("../database/models/UserSchema");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../middleware/generateToken");



exports.reqister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let user = await User.find({ email })
        console.log(user)
        if (!user) {
            return res.status(409).json({ Message: "User already exist" })
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const SaveUser = await newUser.save();
        const token = createSecretToken(SaveUser._id);
        res.cookie("token", token, {
            domain: process.env.FRONTENT_DOMAIN,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        console.log("cookie set succesfully");

        res.status(201).json({ message: "User created Successfully", SaveUser });


    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server error" })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ message: "All input is required" });
        }
        const user = await User.findOne({ email });
        if (!(user && (await bcrypt.compare(password, user.password)))) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            domain: process.env.FRONTENT_DOMAIN,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        res.status(201).json({ message: "User loged in Successfully", user });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server error" })
    }
}
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ status: true });
};

