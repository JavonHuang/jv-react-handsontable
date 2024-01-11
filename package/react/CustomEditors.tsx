import { BaseEditorComponent, HotEditorProps } from "@handsontable/react";
import { type } from "os";
import React, { cloneElement } from "react";


export default class CustomEditors extends BaseEditorComponent {
  mainElementRef: React.RefObject<any>;
  containerStyle: React.CSSProperties;
  constructor(props:any) {
    super(props);
    this.mainElementRef = React.createRef();
    this.containerStyle = {
      display: 'none',
      position: 'absolute',
      left: 0,
      top: 0,
      background: '#fff',
      border: '1px solid #000',
      padding: '0px',
      zIndex: 999,
    };
    this.state = {
      value: null,
      children:null
    };
  }
  

  setValue=(value, callback)=> {
    this.setState((state, props) => {
      return { value: value };
    }, callback);
  }

  getValue = () => {
    return this.state.value.toString();
  }
  

  open() {
    this.mainElementRef.current.style.display = 'block';
    this.setState((state, props) => {
      return {
        children: cloneElement(this.props.children,this)
      };
    });
  }

  close() {
    this.mainElementRef.current.style.display = 'none';
  }

  prepare(row, col, prop, td, originalValue, cellProperties) {
    // We'll need to call the `prepare` method from
    // the `BaseEditorComponent` class, as it provides
    // the component with the information needed to use the editor
    // (hotInstance, row, col, prop, TD, originalValue, cellProperties)
    super.prepare(row, col, prop, td, originalValue, cellProperties);

    const tdPosition = td.getBoundingClientRect();

    // As the `prepare` method is triggered after selecting
    // any cell, we're updating the styles for the editor element,
    // so it shows up in the correct position.
    this.mainElementRef.current.style.left = tdPosition.left + window.pageXOffset + 'px';
    this.mainElementRef.current.style.top = tdPosition.top + window.pageYOffset + 'px';
    this.mainElementRef.current.style.width = tdPosition.width + 'px';
    this.mainElementRef.current.style.height = tdPosition.height +'px';
    this.mainElementRef.current.classList.add('CustomEditors');

  }

  setLowerCase() {
    this.setState(
      (state, props) => {
        return { value: this.state.value.toString().toLowerCase() };
      },
      () => {
        this.finishEditing();
      }
    );
  }

  setUpperCase() {
    this.setState(
      (state, props) => {
        return { value: this.state.value.toString().toUpperCase() };
      },
      () => {
        this.finishEditing();
      }
    );
  }

  stopMousedownPropagation(e) {
    e.stopPropagation();
  }

  render() {
    return (
        <div
          style={this.containerStyle}
          ref={this.mainElementRef}
          onMouseDown={this.stopMousedownPropagation}
          id="editorElement"
        >
        {this.state.children }
        </div>
    );
  }
}