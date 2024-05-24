const Tip = require("../models/tip");

async function calculateTip(req, res) {
    const { place, totalAmount, tipPercentage } = req.body;

    if (!place || !totalAmount || !tipPercentage) {
        return res.status(400).json({ message: "invalid field" });
    }

    const tipAmount = (totalAmount * tipPercentage) / 100;

    try {
        const tip = new Tip({
            userId: req.user.id,
            place,
            totalAmount,
            tipAmount,
        });

        await tip.save();

        res.status(200).json({ tip: tipAmount });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

async function getTips(req, res) {
    const { startDate, endDate } = req.query;

    const start = new Date(startDate.split("-").reverse().join("-"));
    const end = new Date(endDate.split("-").reverse().join("-"));

    try {
        const tips = await Tip.find({
            userId: req.user.id,
            date: { $gte: start, $lte: end },
        });

        res.status(200).json(tips);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
    calculateTip,
    getTips,
};
