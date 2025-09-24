import getPrismaInstance from "../utils/PrismaClient.js";



export const checkUser = async (req,res,next) => {
    try {
        const {email} = req.body;
        if(!email) {
            return res.json({ error: "Email is required", status: false });
        }
        const prisma = getPrismaInstance();
        const user =  await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if(!user) {
            return res.json({ error: "User not found", status: false });
        }
        return res.json({ msg: "User found", status: true, data: user });
    } catch(error) {
        console.error("Error in checkUser:", error);
        return res.status(500).json({ error: "Server error", status: false });
    }
};

export const onBoardUser = async (req, res, next) => {
    try {
        const { email, name, about, image: profilePicture } = req.body;
        if (!email || !name || !profilePicture) {
            return res.json({ error: "All fields are required", status: false });
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.create({
            data: {
                email,
                name,
                about,
                profilePicture,
            }
        });
        return res.json({ msg: "User onboarded successfully", status: true, data: user });
    } catch (error) {
        console.error("Error in onboardUser:", error); // ✅ log error
        return res.status(500).json({ error: "Server error", status: false });
    }
};


export const getAllUsers = async (req, res, next) => {
    try {
        const prisma = getPrismaInstance();
        const users = await prisma.user.findMany({
            orderBy: {
                name: "asc"
            },
            select: {
                id: true,
                email: true,
                name: true,
                about: true,
                profilePicture: true,
            },
        });
        const usersGroupedByInitialLetter = {};

        users.forEach((user) => {
            const initialLetter = user.name.charAt(0).toUpperCase();
            if (!usersGroupedByInitialLetter[initialLetter]) {
                usersGroupedByInitialLetter[initialLetter] = [];
            }
            usersGroupedByInitialLetter[initialLetter].push(user);
        });

        return res.status(200).send({ users: usersGroupedByInitialLetter });
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        return res.status(500).json({ error: "Server error", status: false });
    }
};