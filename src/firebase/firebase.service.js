import { child, get, getDatabase, push, ref, update } from "firebase/database";
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
  const generateKey = push(child(ref(db), `${nameService}`)).key;
  return push(ref(db, nameService), {
    ...values,
    id: generateKey,
  });
};

const updateById = (options) => {
  const { id, service, value } = options;
  const updates = {};
  updates[`/${service}/${id}`] = value;
  return update(dbRef, updates);
};

const testCreate = () => {
  const newPostKey = push(child(ref(db), "customers")).key;
  console.log(newPostKey);
};
export { findAll, findById, create, updateById, testCreate };
