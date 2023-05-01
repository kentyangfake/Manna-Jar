import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, getDoc, doc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "manna-jar.firebaseapp.com",
  projectId: "manna-jar",
  storageBucket: "manna-jar.appspot.com",
  messagingSenderId: "806344207818",
  appId: "1:806344207818:web:e892e0e500e7748ed2f333",
  measurementId: "G-NB0SG7Q4HY"
};

const app = initializeApp(firebaseConfig);

export const firestore = {
  async addUser(id,name,email) {
    const db = getFirestore();
    await setDoc(doc(db, 'users', id),{
      name,
      email,
      notes:[{
      id:'admin-tutorial',
      category:'admin',
      link_notes: [],
      create_time: 1,
      edit_time: 1,
      title:'教學筆記',
      content:'<h2>自動輸入經文</h2><p><br></p><p>請以 "聖經簡寫"接著"卷":"節" 按下空格後,就會自動輸入經文了！</p><p>舉例:</p><p>羅 1:2-5 </p><p>[2]這福音是神從前藉眾先知在聖經上所應許的，[3]論到他兒子─我主耶穌基督。按肉體說，是從大衛後裔生的；[4]按聖善的靈說，因從死裡復活，以大能顯明是神的兒子。[5]我們從他受了恩惠並使徒的職分，在萬國之中叫人為他的名信服真道</p><p><br></p><h2>聖經簡寫列表-舊約</h2><ol><li>創世記:創</li><li>出埃及記:出</li><li>利未記:利</li><li>民數記:民</li><li>申命記:申</li><li>約書亞記:書</li><li>士師記:士</li><li>路得記:得</li><li>撒母耳記上:撒上</li><li>撒母耳記下:撒下</li><li>列王紀上:王上</li><li>列王紀下:王下</li><li>歷代志上:代上</li><li>歷代志下:代下</li><li>以斯拉記:拉</li><li>尼希米記:尼</li><li>以斯帖記:斯</li><li>約伯記:伯</li><li>詩篇:詩</li><li>箴言:箴</li><li>傳道書:傳</li><li>雅歌:歌</li><li>以賽亞書:賽</li><li>耶利米書:耶</li><li>耶利米哀歌:哀</li><li>以西結書:結</li><li>但以理書:但</li><li>何西阿書:何</li><li>約珥書:珥</li><li>阿摩司書:摩</li><li>俄巴底亞書:俄</li><li>約拿書:拿</li><li>彌迦書:彌</li><li>那鴻書:鴻</li><li>哈巴谷書:哈</li><li>西番雅書:番</li><li>哈該書:該</li><li>撒迦利亞書:亞</li><li>瑪拉基書:瑪</li></ol><p><br></p><p><br></p><h2>聖經簡寫列表-新約</h2><ol><li>馬太福音:太</li><li>馬可福音:可</li><li>路加福音:路</li><li>約翰福音;約</li><li>使徒行傳:徒</li><li>羅馬書:羅</li><li>哥林多前書:林前</li><li>哥林多後書:林後</li><li>加拉太書:加</li><li>以弗所書:弗</li><li>腓立比書:腓</li><li>歌羅西書:西</li><li>帖撒羅尼迦前書:帖前</li><li>帖撒羅尼迦後書:帖後</li><li>提摩太前書:提前</li><li>提摩太後書:提後</li><li>提多書:多</li><li>腓利門書:門</li><li>希伯來書:來</li><li>雅各書:雅</li><li>彼得前書:彼前</li><li>彼得後書:彼後</li><li>約翰一書:約壹</li><li>約翰二書:約貳</li><li>約翰三書:約叁</li><li>猶大書:猶</li><li>啟示錄:啟</li></ol>'}
      ],
    });
  },
  async getUser(id) {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, 'users', id));
    return docSnap.data();
  },
  async updateUser(id, data) {
    const db = getFirestore();
    await setDoc(doc(db, 'users', id), data);
  },
  async getShareNote(user,noteId) {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, 'users', user));
    const sharedBy = docSnap.data().name;
    const noteData = docSnap.data().notes.find(note => note.id === noteId);
    const sharedNote = {...noteData,edit_time:new Date().getTime(),sharedBy,category:'shared'}
    return sharedNote;
  }
};

export const auth = {
  async signUp(email, password) {
    const auth = getAuth();
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  },
  async login(email, password) {
    const auth = getAuth();
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  },
  async logout() {
    const auth = getAuth();
    await signOut(auth);
  },
};