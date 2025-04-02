import { RequestHandler } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

const loginUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body)
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    })
    res.status(200).json({
        message: 'User is logged in successfully',
        success: true,
        data: {
            accessToken,
        },
    })
})


const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);

    res.status(200).json({
        message: 'Access token is retrieved successfully!',
        success: true,
        data: result
    })
});


const updateRole = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const {role} = req.body;
    const result = await AuthServices.updateRoleFromDB(userId,{role})

    res.status(200).json({
        message: 'User role updated successfully!',
        success: true,
        data: result
    })
});

const logoutUser = catchAsync(async (req, res) => {
    res.clearCookie('refreshToken')

    res.status(200).json({
        message: 'User logged out successfully',
        success: true,
        data: {}
    })
});

export const AuthControllers = {
    loginUser,
    refreshToken,
    logoutUser,
    updateRole
}