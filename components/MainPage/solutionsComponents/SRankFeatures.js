import React, { useState, useEffect } from "react";

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
} from "react-icons/fa";
import FeatureTable from "./CombinatorialComponents/FeatureTable";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    /* border: 1px solid black; */

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 0.5px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function SRankFeatures(props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const [tableContent, setTableContent] = useState([{
    col1: "BLANK",
    col2: "BLANK",
    col3: "BLANK",
    col4: "BLANK",
    col5: "BLANK",
    col6: "BLANK",
  }]);
// console.log(tableContent);
  useEffect(() => {
    console.log("UE RAN");
    if (props.form.form.Features) {
      console.log("MAP TIME");

      let mappedData = props.form.form.Features.map((featureData, index) => {
        return {
          col1: featureData.name,
          col2: featureData.importance,
          col3: featureData.feasibility,
          col4: featureData.cost,
          col5: featureData.version,
          col6: featureData.comments,
          // col2: (
          //   <span className="px-3 py-1 text-xs text-orange-600 bg-orange-200 rounded-full cursor-pointer md:hover:scale-110">
          //     {featureData.importance}
          //   </span>
          // ),
          // col3: (
          //   <span className="px-3 py-1 text-xs text-green-600 bg-green-200 rounded-full cursor-pointer md:hover:scale-110">
          //     {featureData.feasibility}
          //   </span>
          // ),
          // col4: (
          //   <span className="px-3 py-1 text-xs text-purple-600 bg-purple-200 rounded-full cursor-pointer md:hover:scale-110">
          //     {featureData.cost}
          //   </span>
          // ),
          // col5: (
          //   <span className="px-3 py-1 text-xs text-blue-600 bg-blue-200 rounded-full cursor-pointer md:hover:scale-110">
          //     {featureData.version}
          //   </span>
          // ),
          // col6: (
          //   <p className="px-3 py-1 m-0 text-xs cursor-auto ">
          //     {featureData.comments}
          //   </p>
          // ),
        };
      });
      // console.log(mappedData);
      setTableContent(mappedData);
      // console.log(tableContent);
    } else {
      console.log(":(");
    }
  }, [props.form.form.Features]);

  // console.log(props.form.form.Features);

  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };
  const updateButton = (e) => {
    props.update("productType", e.target.value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Feature",
        accessor: "col1",
      },
      {
        Header: "Importance",
        accessor: "col2",
      },
      {
        Header: "Feasibility",
        accessor: "col3",
      },
      {
        Header: "Cost to Build",
        accessor: "col4",
      },
      {
        Header: "Version",
        accessor: "col5",
      },
      {
        Header: "Comments",
        accessor: "col6",
      },
    ],
    []
  );

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
        <div className="w-full p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl container-style normal-box-soft">
          <div className="flex flex-col items-center justify-center problem-page fade-effect-quick">
            <div className="absolute top-5 right-5">
            <Popover
              isOpen={isPopoverOpen}
              containerStyle={{
                zIndex: 100,
                boxShadow: "5px 13px 28px 0px rgba(0,0,0,0.48)",
                backgroundColor: "white",
                borderRadius: "2em",
              }}
              onClickOutside={() => setIsPopoverOpen(false)}
              positions={["bottom", "left", "right"]} // preferred positions by priority
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
                    className="!opacity-100 bg-white w-[25em] rounded-xl p-3"
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
                <FaInfoCircle className="text-2xl cursor-pointer text-blues-300 md:hover:scale-110" />
              </div>
            </Popover>
          </div>
            <h1 className="heading-top">Feature Selection</h1>
            <div className="normal-box-soft">
              <h3 className="heading">
                Time to pick the features defined in the last step.
              </h3>
            </div>

            <div className="flex flex-col w-full">
              <Styles>
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

              {/* table start */}
              <div className="overflow-x-auto">
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
              </div>

              {/* <p>If neither, describe what you are looking to innovate:</p>
              <textarea
                // type="text"
                className="textarea-box h-[10em] whitespace-normal"
                name="what"
                placeholder="What are you building?"
                onChange={update}
              />
              <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p> */}
             
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="card__btn save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => props.goToStep(3)}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>
              <button
                className="card__btn_next save_button right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect"
                onClick={() => props.goToStep(5)}
              >
                Next
                <FaLongArrowAltRight className="ml-1 text-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SRankFeatures;
