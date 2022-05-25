import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocumento } from "../models/session.model";
import { verifyJwt } from "../utils/jwt.utils";
import { get } from 'lodash';
import { findUsuario } from "./usuario.service";
import config from 'config';
import { signJwt } from "../utils/jwt.utils";

export async function createSession(usuarioId: string, agenteUsuario: string) {
    const session = await SessionModel.create({usuario: usuarioId, agenteUsuario});

    return session.toJSON();
};


export async function findSessions(query:  FilterQuery<SessionDocumento>) {
    return SessionModel.find(query).lean();
};

export async function updateSession(
    query: FilterQuery<SessionDocumento>, 
    update: UpdateQuery<SessionDocumento>
) {
    return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({refreshToken}:{refreshToken: string}) {
    const {decode} = verifyJwt(refreshToken);

    if(!decode || !get(decode, 'session')) return false;

    const session = await SessionModel.findById(get(decode,'session'));

    if(!session || !session.valido) return false;

    const usuario = await findUsuario({_id: session.usuario});

    if(!usuario) return false;

    const accessToken = signJwt(
        {...usuario, session: session._id},
        {expiresIn: config.get('accessTokenTtl')}
    );

    return accessToken;
}