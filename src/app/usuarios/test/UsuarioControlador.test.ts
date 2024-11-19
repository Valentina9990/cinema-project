import { Response } from "express";
import pool from "../../../config/connection/db-connection";
import UsuarioDAO from "../dao/UsuarioDAO";

jest.mock("../../../config/connection/db-connection");

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("UsuarioDAO", () => {
  describe("obtenerUsuarios", () => {
    it("Debe devolver todos los usuarios con un recuento total y un estado de 200", async () => {
      const params: any = [];
      const res = mockResponse();
      const mockTotalResult = { total: "5" };
      const mockUsuariosResult = { rows: [{ id: 1, name: "User 1" }] };

      (pool.one as jest.Mock).mockResolvedValueOnce(mockTotalResult);
      (pool.result as jest.Mock).mockResolvedValueOnce(mockUsuariosResult);

      await UsuarioDAO.obtenerUsuarios(params, res);

      expect(pool.one).toHaveBeenCalledWith(expect.any(String));
      expect(pool.result).toHaveBeenCalledWith(expect.any(String), params);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        rows: mockUsuariosResult.rows,
        total: 5,
      });
    });
  });

  describe("agregarUsuario", () => {
    it("Debería agregar un nuevo usuario y devolver el estado 201", async () => {
      const res = mockResponse();
      const datos = {
        idUsuario: null,
        emailUsuario: "test@test.com",
        nombreUsuario: "Test",
        apellidoUsuario: "User",
        contrasenaUsuario: "password",
        fechaCreacion: new Date(),
        fechaNacimientoUsuario: new Date(),
        idCine: 1,
        idCargo: 1,
      };

      (pool.task as jest.Mock).mockImplementationOnce(async (callback: any) => {
        return callback({
          one: jest
            .fn()
            .mockResolvedValueOnce({ existe: 0 })
            .mockResolvedValueOnce({ id_usuario: 1 }),
        });
      });

      await UsuarioDAO.agregarUsuario(datos, res);

      expect(pool.task).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Usuario creado exitosamente",
        id: 1,
      });
    });
  });

  describe("eliminarUsuario", () => {
    it("Debería eliminar al usuario exitosamente y devolver el estado 200", async () => {
      const res = mockResponse();
      const idUsuario = 1;
  
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const result = await callback({
          oneOrNone: jest.fn().mockResolvedValue({ existe: 1 }),
          result: jest.fn().mockResolvedValue({ rowCount: 1 })
        });
        return Promise.resolve(result);
      });
  
      (pool.task as jest.Mock) = mockTask;
  
      await UsuarioDAO.eliminarUsuario(idUsuario, res);
      await new Promise(process.nextTick);
  
      expect(pool.task).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Usuario eliminado correctamente",
        info: 1
      });
    });
  
    it("Debería devolver 404 cuando el usuario no existe", async () => {
      const res = mockResponse();
      const idUsuario = 999;
  
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const result = await callback({
          oneOrNone: jest.fn().mockResolvedValue({ existe: 0 }),
          result: jest.fn()
        });
        return Promise.resolve(result);
      });
  
      (pool.task as jest.Mock) = mockTask;
  
      await UsuarioDAO.eliminarUsuario(idUsuario, res);
      await new Promise(process.nextTick);
  
      expect(pool.task).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Usuario no encontrado"
      });
    });
  
    it("Debería devolver 400 cuando el usuario tenga reservas activas", async () => {
      const res = mockResponse();
      const idUsuario = 1;
  
      const mockTask = jest.fn().mockImplementation(async () => {
        throw { code: "23503" };
      });
  
      (pool.task as jest.Mock) = mockTask;
  
      await UsuarioDAO.eliminarUsuario(idUsuario, res);
      await new Promise(process.nextTick);
  
      expect(pool.task).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "No se puede eliminar el usuario porque tiene reservaciones activas."
      });
    });
  });
  
  describe("modificarUsuario", () => {
    const mockUsuario = {
      idUsuario: 1,
      emailUsuario: "test@test.com",
      nombreUsuario: "Test",
      apellidoUsuario: "User",
      contrasenaUsuario: "password",
      fechaCreacion: new Date(),
      fechaNacimientoUsuario: new Date(),
      idCine: 1,
      idCargo: 1
    };
  
    it("Debería actualizar al usuario con éxito y devolver el estado 200", async () => {
      const res = mockResponse();
      const resultadoBase = { id: 1, ...mockUsuario };
  
      (pool.task as jest.Mock).mockImplementationOnce(async (callback: any) => {
        return callback({
          one: jest.fn()
            .mockResolvedValueOnce({ existe: 1 })
            .mockResolvedValueOnce(resultadoBase),
          oneOrNone: jest.fn()
            .mockResolvedValueOnce({ emailUsuario: mockUsuario.emailUsuario })
        });
      });
  
      await UsuarioDAO.modificarUsuario(mockUsuario, res);
  
      expect(pool.task).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(resultadoBase);
    });
  
    it("Debería devolver 404 cuando el usuario no existe", async () => {
      const res = mockResponse();
  
      (pool.task as jest.Mock).mockImplementationOnce(async (callback: any) => {
        return callback({
          one: jest.fn().mockResolvedValueOnce({ existe: 0 }),
          oneOrNone: jest.fn()
        });
      });
  
      await UsuarioDAO.modificarUsuario(mockUsuario, res);
  
      expect(pool.task).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Usuario no encontrado"
      });
    });
  
    it("Debería devolver 400 cuando ya existe un correo electrónico para otro usuario", async () => {
      const res = mockResponse();
      const nuevoEmail = "otro@test.com";
      const usuarioModificado = { ...mockUsuario, emailUsuario: nuevoEmail };
  
      (pool.task as jest.Mock).mockImplementationOnce(async (callback: any) => {
        return callback({
          one: jest.fn().mockResolvedValueOnce({ existe: 1 }),
          oneOrNone: jest.fn()
            .mockResolvedValueOnce({ emailUsuario: "test@test.com" })
            .mockResolvedValueOnce({ id_usuario: 2 })
        });
      });
  
      await UsuarioDAO.modificarUsuario(usuarioModificado, res);
  
      expect(pool.task).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "El correo electrónico ya está en uso por otro usuario"
      });
    });
  
    it("Debería devolver 400 cuando falla la actualización", async () => {
      const res = mockResponse();
  
      (pool.task as jest.Mock).mockImplementationOnce(async () => {
        throw new Error("Update failed");
      });
  
      await UsuarioDAO.modificarUsuario(mockUsuario, res);
  
      expect(pool.task).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Error al actualizar el usuario"
      });
    });
  });
});
