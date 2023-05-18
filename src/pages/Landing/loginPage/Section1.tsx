import autoVerse from '../../../assets/autoVerse.mp4';

const Section1 = () => {
  return (
    <div className="sm:min-h-[10px] lg:flex-col min-h-[650px] border-b border-stone-500 flex justify-end">
      <div className="lg:border-b-2 border-stone-500  grow bg-gradient-to-r from-stone-400 to-stone-300">
        <div className="flex items-center h-full">
          <div className="flex-Col w-full text-stone-700 lg:py-10">
            <div className="sm:text-3xl lg:border-b-0 flex justify-center text-6xl font-serif font-bold pb-8 border-b border-stone-500">
              手速,不夠快？
            </div>
            <div className="sm:pt-0 flex justify-center pt-8">
              <p className="sm:w-full sm:text-sm sm:text-center w-96 text-xl">
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
      <div className="lg:w-full lg:py-10 lg:border-l-0 w-[45vw] flex flex-col justify-center items-center border-l text-stone-700 border-stone-500 bg-gradient-to-b from-stone-400 to-stone-300">
        <video
          className="w-[90%] rounded drop-shadow-lg border border-stone-500"
          playsInline
          autoPlay
          muted
          loop
        >
          <source src={autoVerse} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Section1;
