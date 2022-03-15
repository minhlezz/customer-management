export const isAuthorzied = ({ roles = [] }) => {
  const isAdmin = roles.includes("admin");
  return isAdmin;
};
