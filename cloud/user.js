const jwtDecode = require("jwt-decode");

Parse.Cloud.beforeSave(Parse.User, async (req) => {
  const requestedUser = req.object;
  if (req && requestedUser) {
    const {
      keycloak: { roles, access_token: token },
    } = requestedUser.get("authData");

    //update userinfo
    if (token) {
      const { name, given_name, family_name, email, preferred_username } =
        jwtDecode(token);
      requestedUser.set("username", preferred_username);
      requestedUser.set("name", name);
      requestedUser.set("firstName", given_name);
      requestedUser.set("lastName", family_name);
      requestedUser.set("emailAddress", email);
    }
    const [userRole] = roles || [];
    if (userRole && userRole.length > 0) {
      req.context = {
        role: userRole,
      };
    }
  }
});

Parse.Cloud.afterSave(Parse.User, async (req) => {
  //update role
  const { context, object: requestedUser } = req;

  if (context && context.role && requestedUser) {
    const requestedRole = context.role;
    //No Role
    if (req && requestedRole) {
      const queryRole = new Parse.Query(Parse.Role);
      queryRole.equalTo("name", requestedRole);
      const roleInstance = await queryRole.first();

      if (!roleInstance) {
        console.log("no exist");
        const roleACL = new Parse.ACL();
        roleACL.setPublicReadAccess(true);
        const role = new Parse.Role(requestedRole, roleACL);
        role.getUsers().add(requestedUser);
        await role.save();
      }

      if (roleInstance && requestedUser) {
        console.log("exist");
        roleInstance.getUsers().add(requestedUser);
        await roleInstance.save(
          {},
          {
            useMasterKey: true,
          }
        );
      }
    }
  }
});
