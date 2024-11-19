import { Response } from "express";
import pool from "../../../config/connection/db-connection";
import FuncionDAO from "../dao/FuncionDAO";

jest.mock("../../../config/connection/db-connection");

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("FuncionDAO.getAll", () => {
    it("should return all rows with a status of 200", async () => {
        const params: any = [];
        const res = mockResponse();
        const mockResult = {
            rows: [
                { id: 1, name: "Funcion 1" },
                { id: 2, name: "Funcion 2" },
            ],
        };

        (pool.result as jest.Mock).mockResolvedValueOnce(mockResult);

        await FuncionDAO.getAll(params, res);

        expect(pool.result).toHaveBeenCalledWith(expect.any(String), params);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResult.rows);
    });

    it("should return a 400 status on database error", async () => {
        const params: any = [];
        const res = mockResponse();

        (pool.result as jest.Mock).mockRejectedValueOnce(
            new Error("Database error")
        );

        await FuncionDAO.getAll(params, res);

        expect(pool.result).toHaveBeenCalledWith(expect.any(String), params);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            response: "Error al obtener los datos",
        });
    });
});

describe("FuncionDAO.add", () => {
    it("should add a new function and return the response", async () => {
        const res = mockResponse();
        const data = {
            idFuncion: 3,
            idSala: 1,
            idPelicula: 1,
            fechaFuncion: "2024-11-20",
            horaInicioFuncion: "15:00:00",
        };

        (pool.task as jest.Mock).mockImplementationOnce(
            async (callback: any) => {
                return callback({
                    one: jest
                        .fn()
                        .mockResolvedValueOnce({ existe: 0 }) // No existe
                        .mockResolvedValueOnce({
                            id: 3,
                            message: "Inserted successfully",
                        }), // Respuesta de inserción
                });
            }
        );

        await FuncionDAO.add(data, res);

        expect(pool.task).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: 3,
            message: "Inserted successfully",
        });
    });

    it("should return a 400 status if the function already exists", async () => {
        const res = mockResponse();
        const data = {
            idFuncion: 1,
            idSala: 1,
            idPelicula: 1,
            fechaFuncion: "2024-11-20",
            horaInicioFuncion: "15:00:00",
        };

        (pool.task as jest.Mock).mockImplementationOnce(
            async (callback: any) => {
                return callback({
                    one: jest.fn().mockResolvedValueOnce({ existe: 1 }), // Ya existe
                });
            }
        );

        await FuncionDAO.add(data, res);

        expect(pool.task).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            response: "La función ya existe",
        });
    });
});

describe("FuncionDAO.delete", () => {
    it("should delete a function and return a success response", async () => {
        const res = mockResponse();
        const data: any = { idFuncion: 1 };

        (pool.task as jest.Mock).mockImplementationOnce((callback: any) => {
            return callback({
                result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }),
            });
        });

        await FuncionDAO.delete(data, res);

        expect(pool.task).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            response: "Función eliminada",
            info: 1,
        });
    });
});
