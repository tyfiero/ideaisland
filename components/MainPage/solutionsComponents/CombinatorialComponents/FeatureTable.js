/* eslint-disable */

import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { useTable, useSortBy } from 'react-table'

// import makeData from './makeData'

function FeatureTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    sortFunc,
    
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
    <div className="w-full pl-3 overflow-x-auto bg-gray-100 rounded-xl dark:bg-slate-400/60">
        <div className="flex justify-center sm:overflow-visible md:overflow-hidden md:min-w-screen rounded-xl sm:w-full">
     <div className=" sm:w-[95%] md:w-full lg:w-[98%] ">
                <div className="my-2 !rounded-2xl flex">
      <table className="w-full bg-white table-auto dark:bg-slate-700/60 min-w-max" {...getTableProps()}>
        <thead >
          {headerGroups.map(headerGroup => (
            <tr className="text-sm leading-normal text-gray-600 uppercase bg-blues-100 " {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th className="px-2 py-3 text-left" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}

                  <span className='text-[18px]'>
                    {/* {console.log(column.isSorted)} */}
                    {column.isSorted
                      ? column.isSortedDesc
                        ?  '  ∨'
                        : '  ∧'
                      :  '  '}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              // {console.log(row)}

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <br />
      <p className="invisible">blank</p>
      {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
      </div>
      </div>
      </div>
      </div>





    </>
  )
                }
export default FeatureTable;
