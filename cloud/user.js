Parse.Cloud.beforeSave(Parse.User, (req) => {
  const authData = req.object.get("authData");
  if (req && authData) {
    const {
      keycloak: { roles },
    } = authData;
    console.log(authData);
//    const query = new Parse.Query(Parse.Role);
//    query.equalTo("users", user)
//    const user = query.find()
   

    
  }
});
