import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../../api/services/user";

export const loadUser = createAsyncThunk('user/load', async () => {
    const data = await UserService.getUser();
    return data;
});