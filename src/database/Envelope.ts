import { Envelope, EnvelopeToInsert, NewEnvelope } from '../types';
import DB from './db.json';
import { createId, getIdxById, saveToDatabase } from './utils';

export const getAllEnvelopes = () => {
  return DB.envelopes;
};

export const getEnvelope = (id: number) => {
  const envelope = DB.envelopes.find((envelope) => envelope.id === id);
  if (!envelope) return;
  return envelope;
};

export const createNewEnvelope = (newEnvelope: EnvelopeToInsert) => {
  const isAlreadyAdded =
    DB.envelopes.findIndex((envelope) => envelope.title === newEnvelope.title) >
    -1;
  if (isAlreadyAdded) return;

  const id = createId(DB);
  DB.envelopes.push({ id, ...newEnvelope });
  saveToDatabase(DB);
  return { id, ...newEnvelope };
};

export const updateEnvelope = (id: number, changes: NewEnvelope) => {
  const updateIdx = getIdxById(DB, id);
  if (!updateIdx) return;

  const updatedEnvelope: Envelope = {
    ...DB.envelopes[updateIdx],
    ...changes,
    updatedAt: new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }),
  };
  DB.envelopes[updateIdx] = updatedEnvelope;
  saveToDatabase(DB);
  return updatedEnvelope;
};

export const deleteEnvelope = (id: number) => {
  const deleteIdx = getIdxById(DB, id);
  if (!deleteIdx) return;
  DB.envelopes.splice(deleteIdx, 1);
  saveToDatabase(DB);
};
