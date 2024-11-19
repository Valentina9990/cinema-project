import request from "supertest";
import { describe, test, expect } from "@jest/globals";


describe("GET API Endpoints", () => {
    const miUrl = "http://localhost:3123";

    test("Probando status code de /api/room/getall", async () => {
        const respuesta = await request(miUrl).get("/api/room/getall");
        expect(respuesta.statusCode).toBe(200);
        console.log(respuesta.body);
    });

    test("Probando status code de /api/users", async () => {
        const respuesta = await request(miUrl).get("/api/users");
        expect(respuesta.statusCode).toBe(200);
        console.log(respuesta.body);
    });
});
