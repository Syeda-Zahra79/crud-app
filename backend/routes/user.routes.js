import { Router } from "express";
import { User } from "../models/user.model.js";
const router = Router()

router.get("/", async (req, res) => {
    try {
        const users = await User.find()

        return res
            .status(200)
            .json(
                {
                    message: "All Users fetched Successfully",
                    users
                })

    } catch (error) {

        console.log("Error Occured during Fetching Users")

        return res
            .status(500)
            .json({
                message: "Error fetching User"
            })
    }
})

router.post("/create", async (req, res) => {
    try {
        const { name, email, age } = req.body

        if (!name && !email) {
            return res.status(400).json({ message: "Name and Email are required" })
        }
        const createdUser = await User.create({
            name: name,
            email: email,
            age: age || 0
        })


        return res
            .status(200)
            .json(
                {
                    message: "User Created Successfully",
                    createdUser
                })

    } catch (error) {

        console.log("Error Occured during Creating")

        return res
            .status(400)
            .json({
                message: "Error Creating User"
            })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        return res
            .status(200)
            .json(
                {
                    message: "User fetched Successfully",
                    user
                })

    } catch (error) {

        console.log("Error Occured during Fetching User")

        return res
            .status(500)
            .json({
                message: "Error fetching User"
            })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)

        return res
            .status(200)
            .json(
                {
                    message: "User Deleted Successfully",
                    user
                })

    } catch (error) {

        console.log("Error Occured during Deleting User")

        return res
            .status(500)
            .json({
                message: "Error Deleting User"
            })
    }
})


router.put("/edit/:id", async (req, res) => {
    try {

        const { id } = req.params
        const { name, email, age } = req.body

        if (!name && !email) {
            return res.status(400).json({ message: "Name and Email are required" })
        }
        const user = await User.findByIdAndUpdate(id, {
            name: name,
            email: email,
            age: age || 0
        }, {
            new:true
        })


        return res
            .status(200)
            .json(
                {
                    message: "User Updated Successfully",
                    user
                })

    } catch (error) {

        console.log("Error Occured during Updation")

        return res
            .status(500)
            .json({
                message: "Error Updating User"
            })
    }
})



export default router