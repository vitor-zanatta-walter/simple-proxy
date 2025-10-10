import http from "http";
import https from "https";
import fs from "fs";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// carregar environment variables
const API_ADDRESS = process.env.API_ADDRESS;
const FRONTEND_ADDRESS = process.env.FRONTEND_ADDRESS;
const LISTEN_PORT = process.env.LISTEN_PORT;
const USE_HTTPS = (process.env.USE_HTTPS === "true");
const HTTPS_KEY = process.env.HTTPS_KEY;
const HTTPS_CERT = process.env.HTTPS_CERT;

// Configuração do certificado
const options = {
    key: fs.readFileSync(HTTPS_KEY),
    cert: fs.readFileSync(HTTPS_CERT)
};

// Configuração dos proxies
const api_proxy = createProxyMiddleware({target: API_ADDRESS, changeOrigin: true});
const frontend_proxy = createProxyMiddleware({target: FRONTEND_ADDRESS, changeOrigin: true});


app.use((req, res, next) => {

    if (req.path.startsWith("/api")) {
        console.log(`[Proxy] ${req.method} ${req.url} -> ${API_ADDRESS}${req.url}`);
        api_proxy(req, res, next);
    } else {
        console.log(`[Proxy] ${req.method} ${req.url} -> ${FRONTEND_ADDRESS}${req.url}`);
        frontend_proxy(req, res, next);
    }
});


// Inicia o servidor (http ou https)
if (USE_HTTPS) {
    
    https.createServer(options, app).listen(LISTEN_PORT, () => {
        console.log(`Proxy rodando na porta ${LISTEN_PORT}`);
    });
    
    http.createServer((req, res) => {
        res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
        res.end();
    }).listen(80);

} else {

    app.listen(LISTEN_PORT, () => {
        console.log(`Proxy rodando em http na porta ${LISTEN_PORT}`);
    });
}



