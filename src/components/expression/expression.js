import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import * as globals from "../../globals";
import styles from "./expression.css";
import SectionHeader from "../framework/sectionHeader"
import actions from "../../actions";

@connect((state) => {
  return {
    differential: state.differential
  }
})
class DiffExp extends React.Component {
  render() {
    if (!this.props.differential.diffExp) return null


    const topGenesForCellSet1 = this.props.differential.diffExp.data.celllist1;
    const topGenesForCellSet2 = this.props.differential.diffExp.data.celllist2;
    const rectSide = 10;
    const rightMargin = 0;

    return (
      <div>
      <p> Top genes expressed by cellset 1 </p>
      <p> Gene {"............"} Exp in set 1 {"............"} Exp in set 2 </p>
      {
        topGenesForCellSet1.topgenes.map((gene, i) => {
          return (
            <p key={gene}>
            {gene} {"...................... "}
            {Math.floor(topGenesForCellSet1.mean_expression_cellset1[i])} {" ................... "}
            {Math.floor(topGenesForCellSet1.mean_expression_cellset2[i])}
            </p>
          )
        })
      }
      <p> Top genes expressed by cellset 2 </p>
      <p> Gene {"............"} Exp in set 1 {"............"} Exp in set 2 </p>
      {
        topGenesForCellSet2.topgenes.map((gene, i) => {
          return (
            <p key={gene}>
              {gene} {"...................... "}
              {Math.floor(topGenesForCellSet2.mean_expression_cellset1[i])} {" ................... "}
              {Math.floor(topGenesForCellSet2.mean_expression_cellset2[i])}
            </p>
          )
        })
      }
      </div>
    )
  }
}


@connect((state) => {
  return {
    expression: state.expression.data,
    currentCellSelection: state.controls.currentCellSelection,
    differential: state.differential
  }
})
class Expression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  handleClick(gene) {
    return () => {
      this.props.dispatch({
        type: "color by expression",
        gene: gene,
      });
    }
  }
  set1() {
    const set = [];

    _.each(this.props.currentCellSelection, (cell) => {
      if (cell["__selected__"]) {
        set.push(cell.CellName)
      }
    })

    this.props.dispatch({
      type: "store current cell selection as differential set 1",
      data: set
    })
  }
  set2() {
    const set = [];

    _.each(this.props.currentCellSelection, (cell) => {
      if (cell["__selected__"]) {
        set.push(cell.CellName)
      }
    })

    this.props.dispatch({
      type: "store current cell selection as differential set 2",
      data: set
    })
  }
  computeDiffExp() {
    this.props.dispatch(
      actions.requestDifferentialExpression(
        this.props.differential.celllist1,
        this.props.differential.celllist2
      )
    )
  }
  render () {
    if (
      !this.props.expression ||
      !this.props.differential
    ) {
      return null
    }

    console.log('expression render sees', this.props.differential)
    return (
      <div style={{marginTop: 50}}>
        <SectionHeader text="Differential Expression"/>
        <div style={{marginBottom: 20}}>
          <button onClick={this.set1.bind(this)}>
            {
              this.props.differential.celllist1 ?
              this.props.differential.celllist1.length + " cells selected" :
              "Store current cell selection as 'set 1'"
            }
          </button>
          <button onClick={this.set2.bind(this)}>
            {
              this.props.differential.celllist2 ?
              this.props.differential.celllist2.length + " cells selected" :
              "Store current cell selection as 'set 2'"
            }
          </button>
          <button onClick={this.computeDiffExp.bind(this)}>
            Compute differential expression
          </button>
          Gene count:
          <input placeholder={"Default is 5"}/>
        </div>
        <DiffExp/>
        <SectionHeader text="Color by expression"/>
        {
          _.map(this.props.expression.genes, (gene) => {
            return (
              <button
                key={gene}
                onClick={this.handleClick(gene).bind(this)}
                style={{marginRight: 10}}>
                {gene}
              </button>
            )
          })
        }
      </div>
    )
  }
};

export default Expression;


// <svg>
//   <g transform="translate(200, 40)">
//     {
//       _.map(topGenesForCellSet1.topgenes, (gene, i) => {
//         return (
//           <g key={gene}>
//             <rect
//               width={rectSide}
//               height={rectSide}
//               x={i * (rectSide + rightMargin)}
//               fill={"rgb(255,0,0)"}
//               />
//           <g>
//         )
//       })
//     }
//   </g>
// </svg>