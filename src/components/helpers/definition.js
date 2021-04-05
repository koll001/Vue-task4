const signUp = function(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}:${errorMessage}`);
    });
};

const registDatabase = function(userName, email, password) {
  firebase
    .database()
    .ref('users' + userName)
    .set({
      userName: userName,
      email: email,
      password: password,
    });
};

const signIn = function(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`${user}:login`);
      this.$router.push('/');
      // ...
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}:${errorMessage}`);
    });
};

export { signUp, signIn, registDatabase };
