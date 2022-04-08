import React from "react";
import {
  FaBookOpen,
  FaImage,
  FaImages,
  FaMinus,
  FaPlus,
  FaRedo,
} from "react-icons/fa";
import axios from "axios";

function RandomPics() {
  const [images, setImages] = React.useState(true);
  const [words, setWords] = React.useState(false);
  const [wordList, setWordList] = React.useState([
    "astonished",
    "disbelieve",
    "media",
    "corporation",
    "beneficial",
    "software",
    "colorimetric",
    "innovation",
    "attitude",
    "face",
  ]);

  const [refresh, setRefresh] = React.useState(false);
  const [refreshWords, setRefreshWords] = React.useState(false);

  const [more, setMore] = React.useState(true);

  const [src, setSrc] = React.useState("https://picsum.photos/200/15");
  const [src2, setSrc2] = React.useState("https://picsum.photos/200/14");

  // console.log(wordList[0])
  //     React.useEffect(() => {

  //   getWords()

  //     }, [])

  React.useEffect(() => {
    if (refresh) {
      setSrc("https://picsum.photos/200/15");
    } else {
      setSrc("https://picsum.photos/201/15");
    }
  }, [refresh]);

   React.useEffect(() => {
  getWords()
  }, [refreshWords]);

  const getWords = async () => {
    var config = {
      method: "get",
      url: "https://random-words-api.herokuapp.com/w?n=10",
    };

    await axios(config)
      .then(function (response) {
        setWordList(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col w-full  p-2 !rounded-2xl normal-box-soft items-center">
      <div className="flex gap-2 my-2">
        <button
          onClick={() => {
            setWords(!words);
            getWords();
          }}
          className={
            "w-[16em] h-[2em] rounded-3xl  flex items-center justify-between px-3 text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
            (words
              ? " bg-green-400/70 shadow-lg shadow-green-300/60 ring-4 ring-green-600"
              : " bg-green-200 shadow-inner")
          }
        >
          <FaBookOpen
            className={
              "text-[18px] " + (words ? "text-white" : "text-green-600")
            }
          />
          <p
            className={
              "mr-1 mb-0 text-[14px] " +
              (words ? "text-white " : "text-green-600 ")
            }
          >
            Random Dictionary Words
          </p>
        </button>
        <button
          onClick={() => {
            setImages(!images);
          }}
          className={
            "w-[12em] h-[2em] rounded-3xl  flex items-center justify-between px-3 text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
            (images
              ? " bg-green-400/70 shadow-lg shadow-green-300/60 ring-4 ring-green-600"
              : " bg-green-200 shadow-inner")
          }
        >
          <FaImages
            className={
              "text-[18px] " + (images ? "text-white" : "text-green-600")
            }
          />

          <p
            className={
              "mr-1 mb-0 text-[14px] " +
              (images ? "text-white " : "text-green-600 ")
            }
          >
            Random Images
          </p>
        </button>
      </div>
      {words && (
        <>
          <div className="flex items-center justify-evenly normal-box w-[90%] my-3 min-w-[52em]">
            <button
              onClick={() => {
                setRefreshWords(!refreshWords);
              }}
              className=" w-[3em] h-[3em] rounded-3xl bg-green-400 flex items-center justify-center  gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
            >
              <FaRedo className="text-[20px]" />
            </button>

            {wordList.map((data, index) => (
              <ItemChip
                name={data}
                key={index}
                color=" bg-green-200 shadow-inner"
              />
            ))}
          </div>
        </>
      )}
      {images && (
        <>
          {" "}
          <div className="flex flex-wrap w-full gap-5 p-2 !rounded-2xl normal-box items-center justify-center">
            <img
              src={src + "1"}
              alt="logo"
              className="object-cover rounded-xl"
            />

            <img
              src={src + "2"}
              alt="logo"
              className="object-cover rounded-xl"
            />

            <img
              src={src + "0"}
              alt="logo"
              className="object-cover rounded-xl"
            />

            <img
              src={src + "3"}
              alt="logo"
              className="object-cover rounded-xl"
            />

            <img
              src={src + "4"}
              alt="random image"
              className="object-cover rounded-xl"
            />

            {more && (
              <>
                <img
                  src={src + "9"}
                  alt="random image"
                  className="object-cover rounded-xl"
                />
                <img
                  src={src + "8"}
                  alt="random image"
                  className="object-cover rounded-xl"
                />
                <img
                  src={src + "7"}
                  alt="random image"
                  className="object-cover rounded-xl"
                />
                <img
                  src={src + "6"}
                  alt="random image"
                  className="object-cover rounded-xl"
                />
                <img
                  src={src + "5"}
                  alt="random image"
                  className="object-cover rounded-xl"
                />
              </>
            )}
          </div>
          <div className="flex gap-3 text-green-600">
            <button
              onClick={() => {
                setRefresh(!refresh);
              }}
              className=" w-[10em] h-[2.5em] rounded-3xl bg-green-200 flex items-center justify-center  gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer mt-2"
            >
              <FaRedo className="text-[20px]" />
              New Images
            </button>
            <button
              onClick={() => {
                setMore(!more);
              }}
              className=" w-[10em] h-[2.5em] rounded-3xl bg-green-200  flex items-center justify-center  gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer mt-2"
            >
              {!more ? (
                <>
                  {" "}
                  <FaPlus className="text-[20px]" /> <p>Show More</p>
                </>
              ) : (
                <>
                  {" "}
                  <FaMinus className="text-[20px]" /> <p>Show Fewer</p>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RandomPics;

function ItemChip({ name, color }) {
  return (
    <div
      className={
        " flex gap-1 items-center rounded-full p-1    md:active:scale-95 whitespace-nowrap h-fit w-fit " +
        color
      }
    >
      <p className="m-0 capitalize text-md">{name}</p>
    </div>
  );
}
