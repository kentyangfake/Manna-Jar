import autoVerse from '../../../assets/autoVerse.mp4';

const Section1 = () => {
  return (
    <div className="min-h-[650px] border-b border-stone-500 flex justify-end">
      <div className="grow bg-gradient-to-r from-stone-400 to-stone-300">
        <div className="flex items-center h-full">
          <div className="flex-Col w-full text-stone-700">
            <div className="flex justify-center text-6xl font-serif font-bold pb-8 border-b border-stone-500">
              手速,不夠快？
            </div>
            <div className="flex justify-center pt-8">
              <p className="w-96 text-xl">
                只要簡單輸入經卷索引，例如：
                <br />
                出埃及記16:4
                <br />
                按下空白鍵，經文就會自動出現！
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[45vw] flex flex-col justify-center items-center border-l text-stone-700 border-stone-500 bg-gradient-to-b from-stone-400 to-stone-300">
        <video
          className="rounded drop-shadow-lg border border-stone-500"
          playsInline
          autoPlay
          muted
          loop
          width="600px"
        >
          <source src={autoVerse} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Section1;
