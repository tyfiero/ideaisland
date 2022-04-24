import React, { useState, useEffect, useMemo } from "react";

import { Popover, ArrowContainer } from "react-tiny-popover";
import styled from "styled-components";

import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaEllipsisH,
  FaEye,
  FaPen,
  FaTrash,
  FaInfoCircle,
  FaUndoAlt,
  FaSort,
} from "react-icons/fa";
import FeatureTable from "./CombinatorialComponents/FeatureTable";
import ImportanceChip from "./rank/ImportanceChip";
import FeasibilityChip from "./rank/FeasibilityChip";
import CostChip from "./rank/CostChip";
import VersionChip from "./rank/VersionChip";
import CommentsTextArea from "./rank/CommentsTextArea";

import { useSelector, useDispatch } from "react-redux";
import { sFormAction } from "../../../redux/actions";
const Styles = styled.div`
  padding: 0rem;

  table {
    border-spacing: 0;
    /* border: 1px solid black; */

    tr {
      :last-child {
        td {
          /* border-bottom: 0; */
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.1rem;
      border-bottom: 1px solid black;
      border-right: 0.5px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function SRankFeatures(props) {
  const dispatch = useDispatch();
  const sFormRedux = useSelector((state) => state.sForm);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [sort, setSort] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [tableContent, setTableContent] = useState([
    {
      col1: "BLANK",
      col2: "BLANK",
      col3: "BLANK",
      col4: "BLANK",
      col5: "BLANK",
      col6: "BLANK",
    },
  ]);
  // console.log(tableContent.length === sFormRedux.features.length)

  // console.log(props.form.form.Features);
  // console.log("props.form.form.Features ^^^^");
  // console.log(props)
  const updateFromChip = (data) => {
    console.log(data);
    let pointerIndex = data[0];
    let impValue = data[1];
    let type = data[2];

    let pointer = sFormRedux.features[pointerIndex];

    // console.log(sFormRedux.features[pointerIndex]);
    let updatedObj;
    if (type === "importance") {
      updatedObj = {
        name: pointer.name,
        importance: impValue,
        feasibility: pointer.feasibility,
        cost: pointer.cost,
        version: pointer.version,
        comments: pointer.comments,
      };
    } else if (type === "feasibility") {
      updatedObj = {
        name: pointer.name,
        importance: pointer.importance,
        feasibility: impValue,
        cost: pointer.cost,
        version: pointer.version,
        comments: pointer.comments,
      };
    } else if (type === "cost") {
      updatedObj = {
        name: pointer.name,
        importance: pointer.importance,
        feasibility: pointer.feasibility,
        cost: impValue,
        version: pointer.version,
        comments: pointer.comments,
      };
    } else if (type === "version") {
      updatedObj = {
        name: pointer.name,
        importance: pointer.importance,
        feasibility: pointer.feasibility,
        cost: pointer.cost,
        version: impValue,
        comments: pointer.comments,
      };
    } else {
      updatedObj = {
        name: pointer.name,
        importance: pointer.importance,
        feasibility: pointer.feasibility,
        cost: pointer.cost,
        version: pointer.version,
        comments: impValue,
      };
    }

    let oldArray = sFormRedux.features;
    // console.log("^^old");

    // console.log(sFormRedux.features === oldArray)
    oldArray[pointerIndex] = updatedObj;
    // sFormRedux.features[pointerIndex] = updatedObj;
    dispatch(sFormAction(oldArray));
    setRefresh(!refresh);
    // console.log(sFormRedux.features[pointerIndex]);

    // console.log(oldArray);
    // console.log("^^new");
    // props.update("Features", );
    // console.log(updatedObj)
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps
    // console.log("shit changed");
    // setRerender(!rerender)
    if (tableContent.length !== sFormRedux.features?.length) {
      setRefresh(!refresh);
      // console.log("It actually changed")
    }
  });

  //   //function that sorts object of objects by key
  // function sortByKey(array, key) {

  //   return array.sort(function(a, b) {
  //     var x = a[key];
  //     var y = b[key];
  //     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  //   });
  // }
  useEffect(() => {
    console.log("UE RAN");
    // console.log(tableContent);
    // console.log("before map tableContent");

    if (sFormRedux.features) {
      console.log("MAP TIME");

      let mappedData = sFormRedux.features.map((featureData, index) => {
        return {
          col1: (
            <div className="text-left">
              <p className="mb-0 ml-5">{featureData.name}</p>
            </div>
          ),
          // col2: featureData.importance,
          // col3: featureData.feasibility,
          // col4: featureData.cost,
          // col5: featureData.version,
          // col6: featureData.comments,
          col2: (
            // <span className="px-3 py-1 text-xs text-orange-600 bg-orange-200 rounded-full cursor-pointer md:hover:scale-110">
            //   {featureData.importance}
            // </span>
            <ImportanceChip
              value={featureData.importance}
              updateFromChip={updateFromChip}
              givenFeature={index}
            />
          ),
          col3: (
            // <span className="px-3 py-1 text-xs text-green-600 bg-green-200 rounded-full cursor-pointer md:hover:scale-110">
            //   {featureData.feasibility}
            // </span>
            <FeasibilityChip
              value={featureData.feasibility}
              updateFromChip={updateFromChip}
              givenFeature={index}
            />
          ),
          col4: (
            // <span className="px-3 py-1 text-xs text-purple-600 bg-purple-200 rounded-full cursor-pointer md:hover:scale-110">
            //   {featureData.cost}
            // </span>
            <CostChip
              value={featureData.cost}
              updateFromChip={updateFromChip}
              givenFeature={index}
            />
          ),
          col5: (
            // <span className="px-3 py-1 text-xs text-blue-600 bg-blue-200 rounded-full cursor-pointer md:hover:scale-110">
            //   {featureData.version}
            // </span>
            <>
              {/* <p className="">{index}</p> */}
              <VersionChip
                value={featureData.version}
                updateFromChip={updateFromChip}
                givenFeature={index}
                key={index}
              />
            </>
          ),
          col6: (
            <div>
              {/* <textarea className="rounded-md" name="comment"  cols="15" rows="5" value={featureData.comments}> */}

              <CommentsTextArea
                text={featureData.comments}
                updateFromChip={updateFromChip}
                givenFeature={index}
              />
            </div>
          ),
        };
      });
      // console.log(mappedData);
      setTableContent(mappedData);
      // console.log(tableContent);
      // console.log("after map tableContent");
    } else {
      console.log(":(");
    }
  }, [sFormRedux, refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = React.useMemo(
    () => [
      {
        Header: "Feature",
        accessor: "col1",
        disableSortBy: true,
      },
      {
        Header: "Importance",
        accessor: "col2",
        // sortType: sortFunc,
      },
      {
        Header: "Feasibility",
        accessor: "col3",
        disableSortBy: true,
      },
      {
        Header: "Cost",
        accessor: "col4",
        disableSortBy: true,
      },
      {
        Header: "Version",
        accessor: "col5",
      },
      {
        Header: "Comments",
        accessor: "col6",
        disableSortBy: true,
      },
    ],
    []
  );

  columns.forEach((column) => {
    column.sortType = (a, b, columnId, desc) => {
      let itemA;
      let itemB;
      let aValue;
      let bValue;
      if (columnId === "col2") {
        itemA = a.values.col2.props.value;
        itemB = b.values.col2.props.value;

        // console.log(itemA)
        // console.log(itemB)
      } else if (columnId === "col5") {
        itemA = a.values.col5.props.children.props.value;
        itemB = b.values.col5.props.children.props.value;
      }
      if (itemA === "MVP" || itemA === "...") {
        aValue = 0;
      } else if (itemA === "V2" || itemA === "Could have") {
        aValue = 1;
      } else if (itemA === "V3+" || itemA === "Should have") {
        aValue = 2;
      } else if (itemA === "Back burner" || itemA === "Must have") {
        aValue = 3;
      } else {
        aValue = 4;
      }
      if (itemB === "MVP" || itemB === "...") {
        bValue = 0;
      } else if (itemB === "V2" || itemB === "Could have") {
        bValue = 1;
      } else if (itemB === "V3+" || itemB === "Should have") {
        bValue = 2;
      } else if (itemB === "Back burner" || itemB === "Must have") {
        bValue = 3;
      } else {
        bValue = 4;
      }

      // console.log(aValue + " " + bValue)

      if (aValue > bValue) return 1;
      if (bValue > aValue) return -1;
      return 0;
    };
  });

  const data = React.useMemo(() => tableContent, [tableContent]);
  // const data = React.useMemo(
  //   () => [
  //     {
  //       col1: props.form.form.Features?.name || "oops",
  //       col2: (
  //         <span className="px-3 py-1 text-xs text-orange-600 bg-orange-200 rounded-full cursor-pointer md:hover:scale-110">
  //           Should Have
  //         </span>
  //       ),
  //       col3: (
  //         <span className="px-3 py-1 text-xs text-green-600 bg-green-200 rounded-full cursor-pointer md:hover:scale-110">
  //           Easy
  //         </span>
  //       ),
  //       col4: (
  //         <span className="px-3 py-1 text-xs text-purple-600 bg-purple-200 rounded-full cursor-pointer md:hover:scale-110">
  //           Easy
  //         </span>
  //       ),
  //       col5: (
  //         <span className="px-3 py-1 text-xs text-blue-600 bg-blue-200 rounded-full cursor-pointer md:hover:scale-110">
  //           MVP
  //         </span>
  //       ),
  //       col6: (
  //         <p className="px-3 py-1 m-0 text-xs cursor-auto ">
  //           comments about the feature
  //         </p>
  //       ),
  //     },
  //   tableContent[0]
  //   ],
  //   [tableContent]
  // );

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick min-w-[50em] mr-12

  "
      >
        <div
          className="w-full p-10 space-y-8 normal-box-soft"
          onLoad={() => {
            console.log("table render");
            setRerender(!rerender);
          }}
        >
          <div className="relative flex flex-col items-center justify-center gap-3 p-2 problem-page fade-effect-quick">
            <div className="absolute -top-5 -left-5">
              <Popover
                isOpen={isPopoverOpen}
                containerStyle={{
                  zIndex: 100,
                  boxShadow: "5px 13px 28px 0px rgba(0,0,0,0.48)",
                  backgroundColor: "white",
                  borderRadius: "2em",
                }}
                onClickOutside={() => setIsPopoverOpen(false)}
                positions={["bottom", "left", "right"]}
                content={({ position, childRect, popoverRect }) => (
                  <ArrowContainer
                    position={position}
                    childRect={childRect}
                    popoverRect={popoverRect}
                    arrowColor={"white"}
                    arrowSize={10}
                    arrowStyle={{ opacity: 1, top: "-6px" }}
                    className="popover-arrow-container"
                    arrowClassName="popover-arrow"
                  >
                    <div
                      className="!opacity-100 bg-white w-[25em] nun rounded-xl p-3"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      This helps to frame what kinds of solutions would work for
                      your product.
                    </div>
                  </ArrowContainer>
                )}
              >
                <div
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className="w-5"
                >
                  <FaInfoCircle className="text-2xl cursor-pointer text-blues-300 dark:text-blues-100 md:hover:scale-110" />
                </div>
              </Popover>
            </div>
            <h1 className="text-3xl  text-t-bd dark:text-blues-100">
              Feature Selection
            </h1>

            <div className="flex items-center justify-between w-full">
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => props.goToStep(3)}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>
              <div className="normal-box-soft">
                <h3 className="heading">
                  Time to pick the features defined in the last step.
                </h3>
              </div>
              <div className="relative group">
                <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[5em] h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                  onClick={() => props.goToStep(5)}
                >
                  Next
                  <FaLongArrowAltRight className="ml-1 text-[24px]" />
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Styles>
                {/* <div className="flex gap-3 normal-box-soft right-10 ">
                <button
                  onClick={() => {
                    setSort(!sort);
                  }}
                  className={
                    "w-[4em] h-[2em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  bg-blues-200"
                  }
                >
                  Sort

                  <FaSort />
                  
                </button>
                <button
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                  className={
                    "w-[2em] h-[2em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  bg-t-bl"
                  }
                >
                  <FaUndoAlt />
                  
                </button>
                </div> */}
                <FeatureTable columns={columns} data={data} />
              </Styles>
              {/* table start */}
              {/* <div className="flex justify-center min-h-screen p-2 bg-white/50 rounded-xl">
	<div className="col-span-12">
		<div className="overflow-auto lg:overflow-visible ">
			<table className="table space-y-6 text-sm text-black border-separate ">
				<thead className="text-black bg-t-bl/50">
					<tr>
						<th className="p-3">Feature</th>
						<th className="p-3 text-left">Importance</th>
						<th className="p-3 text-left">Cost to Build</th>
						<th className="p-3 text-left">Importance</th>
            
						<th className="p-3 text-left">Feasability</th>

					</tr>
				</thead>
				<tbody>
					<tr className="bg-white">
						<td className="p-3">
							<div className="flex align-items-center">
								<div className="ml-3">
									<div className="">Appple</div>
								</div>
							</div>
						</td>
						<td className="p-3">
							Technology
						</td>
						<td className="p-3 font-bold">
							200.00$
						</td>
						<td className="p-3">
							<span className="px-2 bg-green-400 rounded-md text-gray-50">available</span>
						</td>
						<td className="p-3 ">
							<a href="#" className="ml-2 text-gray-400 hover:text-gray-100">
								{/* <i className="text-base material-icons-round">delete_outline</i> */}
              {/* <FaEllipsisH />
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>  */}

              {/*  other table start */}
              {/* <div className="overflow-x-auto">
                <div className="flex justify-center min-h-screen overflow-hidden font-sans bg-gray-100 min-w-screen rounded-xl">
                  <div className="w-full lg:w-5/6">
                    <div className="my-6 bg-white shadow-md !rounded-2xl">
                      <table className="w-full table-auto min-w-max">
                        <thead>
                          <tr className="text-sm leading-normal text-gray-600 uppercase bg-blues-100 ">
                            <th className="px-6 py-3 text-left">Feature</th>
                            <th className="px-6 py-3 text-left">Importance</th>
                            <th className="px-6 py-3 text-center">
                              Feasibility
                            </th>
                            <th className="px-6 py-3 text-center">
                              Cost to Build
                            </th>
                            <th className="px-6 py-3 text-center">Version</th>
                            <th className="px-6 py-3 text-center">Comments</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm font-light text-gray-600">
                          <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-6 py-3 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="mr-2"></div>
                                <span className="font-medium">
                                  Email Authentication
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-left">
                              <div className="flex items-center">
                                <span className="px-3 py-1 text-xs text-orange-600 bg-orange-200 rounded-full">
                                  Should Have
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div className="flex items-center justify-center">
                                <span className="px-3 py-1 text-xs text-green-600 bg-green-200 rounded-full">
                                  Easy
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <span className="px-3 py-1 text-xs text-purple-600 bg-purple-200 rounded-full">
                                Free
                              </span>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div className="flex justify-center item-center">
                                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-200 rounded-full">
                                  MVP
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div className="flex justify-center item-center">
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <FaEye />
                                </div>
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <FaPen />
                                </div>
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <FaTrash />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <p>If neither, describe what you are looking to innovate:</p>
              <textarea
                // type="text"
                className="textarea-box  textarea-tw   h-[10em] whitespace-normal"
                name="what"
                placeholder="What are you building?"
                onChange={update}
              />
              <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SRankFeatures;
