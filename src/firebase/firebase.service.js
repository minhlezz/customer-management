import {
  child,
  get,
  getDatabase,
  push,
  ref,
  update,
  serverTimestamp,
} from "firebase/database";
import { app } from "./firebase";

const db = getDatabase(app);
const dbRef = ref(db);

const findAll = (nameService) => {
  return get(child(dbRef, nameService));
};

const findById = (service, id) => {
  return get(child(dbRef, `${service}/${id}`));
};

const create = (nameService, values) => {
  const newValues = {
    ...values,
    createdAt: serverTimestamp(),
  };
  return push(ref(db, nameService), {
    ...newValues,
  });
};

const updateById = (options) => {
  const { id, service, value } = options;
  const newValues = {
    ...value,
    updatedAt: serverTimestamp(),
  };
  const updates = {};
  updates[`/${service}/${id}`] = newValues;
  return update(dbRef, updates);
};

const testCreate = () => {
  const newPostKey = push(child(ref(db), "customers")).key;
  console.log(newPostKey);
};
export { findAll, findById, create, updateById, testCreate };
