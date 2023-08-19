import { Admin } from "../../models/admin.model.js";
import { CustomError } from "../../utils/customError.js";
import { verifyPayload } from "../../utils/jwt.js";

export async function isAdmin(req, _, next) {
    try {
        const { token } = req.cookies;
        const adminId = verifyPayload(token).payload;
        if(!adminId) throw new CustomError("Invalid Token", 403); // Use CutomError to return error response
        const admin = await Admin.findOne({ _id: adminId });
        if(!admin) throw new CustomError('Admin Not Found', 404);

        if(admin.email !== "joewillson857@gmail.com") throw new CustomError('Not Allowed');

        req.admin = admin;  // const { _id } = req.admin; getting adminId on controller file
        next();
    } catch (error) {
        next(error);
    }
}