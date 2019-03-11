window.self.addEventListener("message",function(e) {
    // eslint-disable-line no-restricted-globals
    if (!e) return;

    var users = [];

    var userDetails = {
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      id: 1
    };

    for (var i = 0; i < 10000000; i++) {
      userDetails.id = i++;
      userDetails.dateJoined = Date.now();

      users.push(userDetails);
    }

    postMessage(users);
  });