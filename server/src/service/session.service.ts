import SessionModel from "../models/session.model";

export async function createSession(usuarioId: string, agenteUsuario: string) {
    const session = await SessionModel.create({usuario: usuarioId, agenteUsuario});

    return session.toJSON();
};