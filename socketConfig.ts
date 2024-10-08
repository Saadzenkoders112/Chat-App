import { getCookieFn } from "@/utils/storage.util";
import { io } from "socket.io-client";

const accessToken = getCookieFn("accessToken")

export const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
    extraHeaders: {
        Authorization: `Bearer ${accessToken}`
    }
})