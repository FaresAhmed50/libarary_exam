import jwt from "jsonwebtoken";

export const signJWT =  (_id, userName, role) => {
    const tokenPayload = {
        _id, userName, role
    }

    const accessToken = jwt.sign(tokenPayload, `${process.env.JWT_ACCESS_SECRET_KEY}`,
        { expiresIn: "5h" }
    )
    const refreshToken = jwt.sign(tokenPayload, `${process.env.JWT_REFRESH_SECRET_KEY}`,
        { expiresIn: "10d" }
    )
    return { accessToken, refreshToken }
}