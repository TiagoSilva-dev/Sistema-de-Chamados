import { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

// !!user vai converter em bloolean , ex user{nome:'tiago'} e um boolean verdadeiro pq tem algo dentro.

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setloadingAuth] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem('SistemaUser');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false)
      }
      setLoading(false)
    }
    loadStorage();
  }, [])

  async function signUp(email, password, nome) {
    setloadingAuth(true);
    firebase.auth().createUserWithEmailAndPassword(email, password).then(async (value) => {

      let uid = value.user.uid;
      await firebase.firestore().collection('users').doc(uid).set({
        nome: nome,
        avatarUrl: null,
      }).then(() => {
        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email,
          avatarUrl: null
        };
        setUser(data);
        storageUser(data);
        setloadingAuth(false);
        toast.success('Bem vindo a plataforma');
      }).catch((error) => {
        console.log(error);
        toast.error('Ops , algo deu errado ! ')
        setloadingAuth(false);
      })
    })
  }

  async function signIn(email, password) {
    setloadingAuth(true);
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        const userProfile = await firebase.firestore().collection('users').doc(uid).get();

        let data = {
          uid: value.user.uid,
          nome: userProfile.data().nome,
          email: value.user.email,
          avatarUrl: userProfile.data().avatarUrl
        }
        setloadingAuth(false);
        storageUser(data);
        setUser(data);
        toast.success('Bem vindo de volta');
      }).catch((error) => {
        setloadingAuth(false);
        switch (error.code) {
          case 'auth/too-many-requests':
            return toast.error('⛔ acesso a esta conta foi temporariamente desabilitado… definindo sua senha ou você pode tentar novamente mais tarde.', { autoClose: 8000, position: "bottom-center", pauseOnHover: true, draggable: true, });
          default:
            return null
        }


      })
  }

  function storageUser(data) {
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }
  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem('SistemaUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signOut, signIn, loadingAuth, setUser, storageUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;