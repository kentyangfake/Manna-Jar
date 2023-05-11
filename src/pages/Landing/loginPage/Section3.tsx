import NetworkGraph from '../../../components/NetworkGraph';
import { NoteType } from '../../../redux/types';

const demoNotesTitles = [
  '出人意外的平安',
  '撒迦利雅書',
  '傳道談話',
  '與神同行',
  '得人如魚',
  '聽命勝於獻祭',
  '用基督的口舌',
  '智慧的開端',
  '挑戰天性',
  '風雨中的避難所',
  '你可情願',
  '做鹽做光',
  '風雨生信心',
  '約伯記',
  '也不冷也不熱',
  '重建會幕',
  '洗禮的奧秘',
  '神殿中的青橄欖樹',
  '當你心懷不平',
  '愛的真諦',
];
let demoNotesList: NoteType[] = [];
demoNotesTitles.map((title, index) =>
  demoNotesList.push({
    id: index.toString(),
    title: title,
    content: '',
    category: 'sermon',
    link_notes: [],
    create_time: 1,
    edit_time: 1,
  })
);

const demoNotes: NoteType[] = demoNotesList;

const Section3 = () => {
  return (
    <>
      <div className="flex flex-col text-stone-700">
        <div className="flex flex-col items-center bg-gradient-to-t from-stone-400 to-stone-300 text-stone-700">
          <div className="sm:mb-5 sm:text-3xl mt-6 text-6xl font-serif font-bold mb-10">
            我的信仰,像滿天星星
          </div>
          <div className="sm:text-sm sm:text-center lg:px-8 text-xl">
            一覽無遺你的信仰知識，你可以探索，觀察，從過去的累積獲得靈感和能量。
          </div>
          <div className="sm:mt-10 graph-clip texture mt-20 h-[70vh] w-[70%] bg-stone-300 border border-stone-500">
            <NetworkGraph filtBy={'all'} userNotes={demoNotes} noEvent />
          </div>
        </div>
      </div>
      <div className="sm:min-h-[550px] min-h-[750px] flex flex-col items-center text-stone-700 bg-gradient-to-b from-stone-400 to-stone-500">
        <div className="sm:mt-[15vh] sm:text-lg lg:mt-[22vh] mt-[35vh] text-stone-100 text-4xl xl:text-3xl md:text-2xl font-serif font-bold tracking-widest text-center">
          我要將糧食從天降給你們。百姓可以出去，每天收每天的分。
        </div>
        <div className="sm:text-sm mt-10 text-stone-200 text-xl text-center">
          出埃及記 16:4
        </div>
        <div
          className={`flex flex-col justify-center items-center mt-auto mb-10 text-center text-xl pb-7 leading-loose text-stone-200 hover:bg-stone-400 h-32 w-60 rounded-[100%/100%] border border-stone-300`}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }
        >
          <div className="animate-bounce">↑</div>
          一起來寫筆記吧
        </div>
      </div>
    </>
  );
};

export default Section3;
