module.exports = function (app) {
  var MongoDB = app.dataSources.MongoDB;

  // This allows us to perform certain automatic operations before the service booted up.
  MongoDB.automigrate('Customer', function (err) {
    if (err) throw (err);
    var Customer = app.models.Customer;

    // Create 2 customers ([list of customers], callback(error, list of users created))
    Customer.create([{
        username: 'Admin',
        email: 'admin@admin.com',
        password: 'abcdef'
      },
      {
        username: 'muppala',
        email: 'muppala@ust.hk',
        password: 'abcdef'
      }
    ], function (err, users) {
      if (err) throw (err);
      var Role = app.models.Role;
      var RoleMapping = app.models.RoleMapping;

      Role.findOne({
        where: {
          name: "admin"
        }
      }, function (err, role) {
        if (role == null) {
          //create the admin role
          Role.create({
            name: 'admin'
          }, function (err, roleAdmin) {
            if (err) throw (err)

            //make admin
            role = roleAdmin;
          });
        }

        console.log(role);

        role.principals.create({
          principalType: RoleMapping.ROLE,
          principalId: users[0].id
        }, function (err, principal) {
          if (err) throw (err);
          console.log(principal);
        });

      });

    });
  });

};
