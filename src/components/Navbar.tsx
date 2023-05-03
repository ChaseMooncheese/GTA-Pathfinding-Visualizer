import "./Navbar.css";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

export default function Navbar(props: {
  currAlgorithmRef: React.MutableRefObject<string>;
  currSpeedRef: React.MutableRefObject<string>;
  visualizeFunction: Function;
}) {
  const algorithms = ["Dijkstra's", "Breadth-First Search", "A* Search"];
  const speeds = ["Slow", "Normal", "Fast"];

  //Create state based on ref
  const [currAlgorithm, ___setCurrAlgorithm] = useState(
    props.currAlgorithmRef.current
  );
  const [currSpeed, ___setCurrSpeed] = useState(props.currSpeedRef.current);

  const setCurrentAlgorithm = (x: string) => {
    //Update both internal state and external ref
    ___setCurrAlgorithm(x);
    props.currAlgorithmRef.current = x;
  };

  const setCurrentSpeed = (x: string) => {
    //Update both internal state and external ref
    ___setCurrSpeed(x);
    props.currSpeedRef.current = x;
  };

  return (
    <nav className="navbar">
      <div className="nav-col">
        <a className="gta-pathfinding-visualizer-title">
          GTA V Pathfinding Visualizer
        </a>
      </div>

      <div className="nav-col">
        <button
          className="visualize-button"
          onClick={async () => {
            props.visualizeFunction();
          }}
        >
          Visualize!
        </button>
      </div>

      <div className="nav-col">
        <DropDownButton
          text="Algorithms"
          selections={algorithms}
          setSelection={setCurrentAlgorithm}
          currSelection={currAlgorithm}
        />
        <DropDownButton
          text="Speed"
          selections={speeds}
          setSelection={setCurrentSpeed}
          currSelection={currSpeed}
        />
      </div>
    </nav>
  );
}

function DropDownButton(props: {
  text: string;
  selections: string[];
  currSelection: string;
  setSelection: Function;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown-button"
      //onBlur={() => {
      //setOpen(false);
      //}}
    >
      <a
        className="dropdown-button-anchor"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {props.text}
        <AiFillCaretDown />
      </a>

      {open && (
        <DropDownMenu
          setSelection={props.setSelection}
          items={props.selections}
          currSelection={props.currSelection}
        />
      )}
    </div>
  );
}

function DropDownMenu(props: {
  items: string[];
  currSelection: string;
  setSelection: Function;
}) {
  const items = props.items.map((item, index) => {
    const isSelected = item === props.currSelection;
    return (
      <button
        className={
          "dropdown-item-button" +
          (isSelected ? " dropdown-button-selected" : "")
        }
        key={index}
        onClick={() => {
          props.setSelection(item);
        }}
      >
        {item + (isSelected ? " ✔️" : "")}
      </button>
    );
  });

  return <div className="dropdown-menu">{items}</div>;
}
