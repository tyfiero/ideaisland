import { auth, firestore, googleAuthProvider } from "../../lib/firebase";
import { UserContext } from "../../lib/context";

import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { useRouter } from 'next/router'
import Link from "next/link";

export default function UsernameForm(props) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
    await router.push("/");
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  let pickUsername = (
    <>
      <h3 className="mt-1 text-3xl font-extrabold text-center text-gray-900">
        Choose Username
      </h3>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center">
          <input
            className="h-[3em] px-2 mt-2 text-center rounded-xl"
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button
            type="submit"
            className="w-[18em] h-12 rounded-3xl bg-t-bl flex items-center mt-3 justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            disabled={!isValid}
          >
            Choose
          </button>

          <h3 className="text-xl">Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </div>
      </form>
    </>
  );

  let hasUsernameAlready = (
    <>
      <h3 className="mt-1 text-3xl font-extrabold text-center text-gray-900">
        Welcome back {username}!! 😄
      </h3>

      <Link href="/">
        <a>
          <button className="w-[18em] h-12 rounded-3xl bg-t-bl flex items-center mt-3 justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95">
            Let&apos;s Go!
          </button>
        </a>
      </Link>
    </>
  );
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4 pb-[12rem] sm:px-6 lg:px-8 drop-shadow-xl">
        <div className="w-full max-w-md p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl ">
          <section className="flex flex-col items-center">
            <img
              src="/bulb.svg"
              alt="logo"
              className="w-auto h-20 mx-auto sm:h-30"
            />
            {!username ? pickUsername : hasUsernameAlready}
          </section>
        </div>
      </div>
    </>
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-green">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-red">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
