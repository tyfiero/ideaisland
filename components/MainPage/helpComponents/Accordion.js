// A simple React accordion component example
// https://justacoding.blog/react-accordion-component-example/

// const { useState } = React
import { useState } from "react";

import {
    FaChevronUp,
    FaChevronDown,
  } from "react-icons/fa";

FaChevronDown

const AccordionItem = ({
    children,
    title,
    subtitle,
    isActive,
    onItemClick,
  }) => {
    return (
      <div className={`accordionItem ${isActive ? "active" : ""}`}>
        <div className="accordionTitle" onClick={onItemClick}>
          <h3>
            {title}
            <span >{isActive ? <FaChevronUp className="accordion-icon"/> : <FaChevronDown className="accordion-icon"/>}</span>
          </h3>
      
          {!!subtitle && <p className="accordionSubtitle">{subtitle}</p>}
        </div>
        
        <div className="accordionContent">{children}</div>
      </div>
    );
  };
  
  // const CustomHeader = () => {
  // 	return <h1 className="customHeader">Types of plant</h1>
  // }
  
  // const CustomFooter = () => {
  // 	return <div className="customFooter">For more info, visit our main website</div>
  // }
  
//   const AccordionFull = () => {
   
//     return (
      
//     );
//   };

  
  
const HelpAccordion = ({
  items,
  header,
  footer,
  initialActiveItemIndex,
  closeOtherItemsOnClick,
}) => {
  const [activeItemIndexes, setActiveItemIndexes] = useState([
    initialActiveItemIndex || 0,
  ]);

  // Responsible for toggling active item indexes
  // Must also consider whether closeOtherItemsOnClick
  // was passed and react accordingly to that
  const handleItemClick = (index) => {
    if (closeOtherItemsOnClick) {
      setActiveItemIndexes(activeItemIndexes.includes(index) ? [] : [index]);
      return;
    }

    let newActiveItemIndexes = [...activeItemIndexes];
    if (newActiveItemIndexes.includes(index)) {
      newActiveItemIndexes = newActiveItemIndexes.filter(
        (item) => item !== index
      );
    } else {
      newActiveItemIndexes.push(index);
    }
    setActiveItemIndexes(newActiveItemIndexes);
  };

  return (
    <div className="accordion">
      {!!header && <div className="accordionHeader">{header}</div>}
      {items.map((item, index) => {
        return (
          <AccordionItem
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            isActive={activeItemIndexes.includes(index)}
            onItemClick={() => handleItemClick(index)}
          >
            {item.content}
          </AccordionItem>
        );
      })}
      {!!footer && <div className="accordionFooter">{footer}</div>}
    </div>
  );
};


export default HelpAccordion;