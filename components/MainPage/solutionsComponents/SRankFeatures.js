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
import toast from "react-hot-toast";
const Styles = styled.div`
  padding: 0rem;

  table {
    border-spacing: 0;

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
  // console.log("RANK--------------------" + props.isActive)

  const dispatch = useDispatch();
  const sFormRedux = useSelector((state) => state.sForm);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [sort, setSort] = useState(false);
  // console.log(sFormRedux)

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

  useEffect(() => {
    if (props.reset) {
      setTableContent({
        col1: "BLANK",
        col2: "BLANK",
        col3: "BLANK",
        col4: "BLANK",
        col5: "BLANK",
        col6: "BLANK",
      });
    } else {
      if (sFormRedux.features?.length > 0) {
        // console.log("RANNNNNNNNNNNNNN")
        // setRefresh(!refresh)
      }
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(tableContent)
  useEffect(() => {
    if (sFormRedux.idea === null) {
      props.goToStep(1);
      toast.error("Please select an idea before continuing");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateFromChip = (data) => {
    // console.log(data);
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
    if (!props.changes) {
      props.setChanges(true);
    }
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
    if (tableContent.length !== sFormRedux.features?.length) {
      setRefresh(!refresh);
    }
  });

  useEffect(() => {
    if (sFormRedux.features) {
      // console.log("MAP TIME");

      let mappedData = sFormRedux.features.map((featureData, index) => {
        // console.log(featureData);
        return {
          col1: (
            <div className="text-left sm:max-w-[8em] sm:mx-2">
              <p className="mb-0 ml-5 sm:text-xs sm:ml-1">{featureData.name}</p>
            </div>
          ),

          col2: (
            <div className="sm:mx-3">
              <ImportanceChip
                value={featureData.importance}
                updateFromChip={updateFromChip}
                givenFeature={index}
              />
            </div>
          ),
          col3: (
            <div className="sm:mx-3">
              <FeasibilityChip
                value={featureData.feasibility}
                updateFromChip={updateFromChip}
                givenFeature={index}
              />
            </div>
          ),
          col4: (
            <div className="sm:mx-3">
              <CostChip
                value={featureData.cost}
                updateFromChip={updateFromChip}
                givenFeature={index}
              />
            </div>
          ),
          col5: (
            // <span className="px-3 py-1 text-xs text-blue-600 bg-blue-200 rounded-full cursor-pointer md:hover:scale-110">
            //   {featureData.version}
            // </span>
            <div className="sm:mx-3">
              {/* <p className="">{index}</p> */}
              <VersionChip
                value={featureData.version}
                updateFromChip={updateFromChip}
                givenFeature={index}
                key={index}
              />
            </div>
          ),
          col6: (
            <div className="sm:max-w-[10em] md:max-w-full">
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
  }, [sFormRedux, refresh, props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick md:min-w-[50em] md:mr-12

  "
      >
        <div
          className="w-full p-10 space-y-8 normal-box-soft"
          onLoad={() => {
            // console.log("table render");
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
                      Entrepreneurs tend to add too many features too early.
                      This tool aims to help you identify the most important
                      features that you should add to your product, and when.
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
            <h1 className="text-3xl text-t-bd dark:text-blues-100">
              Feature Selection
            </h1>
            <div className="normal-box-soft">
              <h3 className="heading">
                Time to pick the features defined in the last step.
              </h3>
            </div>

            <p className="md:hidden sm:block">
              {" "}
              {"<----- Scroll left and right to see full table ----->"}
            </p>
            <div className="flex flex-col sm:w-[122%] md:w-full">
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

              <div className="flex items-center justify-between w-full mt-2">
                <button
                  className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                  onClick={() => props.goToStep(2)}
                >
                  <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                  Back
                </button>

                <div className="relative group">
                  <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                  <button
                    className="w-[5em] h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                    onClick={() => props.goToStep(4)}
                  >
                    Next
                    <FaLongArrowAltRight className="ml-1 text-[24px]" />
                  </button>
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SRankFeatures;
