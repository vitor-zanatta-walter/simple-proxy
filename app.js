import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const API_ADDRESS = process.env.API_ADDRESS;
const FRONTEND_ADDRESS = process.env.FRONTEND_ADDRESS;
const LISTEN_PORT = process.env.LISTEN_PORT;

app.use((req, res, next) => {

    if (req.path.startsWith("/api")) {
        console.log(`[Proxy] ${req.method} ${req.url} -> ${API_ADDRESS}${req.url}`);
        createProxyMiddleware({
            target: API_ADDRESS,
            changeOrigin: true,
        })(req, res, next);
    } else {
        console.log(`[Proxy] ${req.method} ${req.url} -> ${FRONTEND_ADDRESS}${req.url}`);
        createProxyMiddleware({
            target: FRONTEND_ADDRESS,
            changeOrigin: true,
        })(req, res, next);
    }
});

app.listen(LISTEN_PORT, () => {
    console.log(`Proxy rodando na porta ${LISTEN_PORT}`);
});
