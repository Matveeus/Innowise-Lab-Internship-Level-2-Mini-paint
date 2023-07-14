interface FirebaseErrors {
  [key: string]: string;
}

const firebaseErrors: FirebaseErrors = {
  'Firebase: Error (auth/user-not-found).': 'User not found.',
  'Firebase: Error (auth/email-already-in-use).': 'This email address is already in use.',
  'Firebase: Error (auth/wrong-password).': 'Wrong password.',
};

export default firebaseErrors;
